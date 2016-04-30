#! /usr/bin/env node

var fs = require('fs');
var Promise = require('bluebird');
var parseArgs = require('minimist');
var KokenClient = require('../lib/client.js');

var config = readConfig(process.argv);
var client = KokenClient(config);

client.login().then(function() {
  Promise.fromNode(fs.readdir.bind(null, config.folder))
         .map(client.uploadImage)
})

function readConfig(argv) {
  var SUPPORTED_COMMANDS = ['upload'];
  var args = parseArgs(argv.slice(2));

  var command = args._[0];

  if(SUPPORTED_COMMANDS.indexOf(command) === -1)
    throw new Error('Command not supported. Supported commands are: ' + SUPPORTED_COMMANDS.join(', '));

  var email = args._[1];
  var password = args._[2];

  if(email === undefined || password === undefined) throw new Error('Email and password to the admin must be provided.');

  var baseURL = args._[3];

  if(baseURL === undefined) throw new Error('Base url for your koken instance must be provided.');

  var folder = args._[4];

  if(folder === undefined) throw new Error('Folder containing the images not provided');

  return {
    command: command,
    email: email,
    password: password,
    baseURL: baseURL,
    apiURL : baseURL + '/api.php?',
    folder: folder
  };
}
