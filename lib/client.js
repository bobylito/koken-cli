var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var request = require('request');

module.exports = function makeKokenClient(config){
  var commonHeaders = {
    'X-Koken-Auth':'cookie',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': config.baseURL + '/admin/'
  }

  var r = request.defaults({jar: true, headers: commonHeaders});

  return {
    login: login.bind(null, r, config),
    uploadImage: uploadImage.bind(null, r, config),
    getAlbum: getAlbum.bind(null, r, config)
  };
};

function login(r, config) {
  return new Promise(function(resolve, reject) {
    r.post(config.apiURL + '/sessions', {
      form: {'email': config.email, 'password': config.password},
    }, function(err, response, body){
      if(err) reject(err);
      else if(body !== '') reject(body);
      resolve();
    });
  });
}

function uploadImage(r, config, fileName) {
  var filePath = path.join(config.folder, fileName);

  if(!fs.statSync(filePath).isFile()) {
    console.log('Ignoring anything that is not a file: ', filePath);
    return Promise.resolve();
  }

  if(fileName[0] === '.') {
    console.log('Ignoring files starting with .', fileName);
    return Promise.resolve();
  }


  return new Promise(function(resolve, reject) {
    console.log('Uploading file: ', fileName, filePath);
    r.post({
      url: config.apiURL + '/content',
      formData: {
        file: fs.createReadStream(filePath),
        visibility: 'private',
        name: fileName
      }
    }, function(err, response, body) {
      if(err) reject(err);
      else resolve(body);
    });
  }).then(
    function() { console.log('Succesfully uploaded: ', fileName);},
    function(err) { console.error('Failed to upload: ', fileName, err); throw(err); }
  );
}

function getAlbum(r, config, id) {
  return new Promise(function(resolve, reject) {
    r.get({
      url: config.apiURL + '/albums/' + id + '/content/limit:10000'
    }, function(err, response, body) {
      if(err) reject(err);
      else resolve(JSON.parse(body));
    });
  }).then(function(body) {
    if(!body.albums) return body;
    var subFolders = body.albums.map(function(album) {
      return getAlbum(r, config, album.id);
    });
    return Promise.all(subFolders).then(function(all) {
      body.albumsContent = all;
      return body;
    });
  });
}
