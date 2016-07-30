# koken-cli
Command and js client for Koken photo CMS

## Prerequisites

You need [Node and NPM](https://docs.npmjs.com/getting-started/installing-node).

## Use the CLI - command line interface

### Installation

In your terminal:

`npm install -g koken-cli`

### Upload

Let you upload a folder to a single private album in your koken instance.

#### Usage

`koken-cli upload YOUR_EMAIL PASSWORD BASE_KOKEN_URL FOLDER_CONTAINING_PHOTOS`

Parameters:
 - YOUR_EMAIL: the email you use for your administration account on Koken
 - PASSWORD: the password associated with the email on your Koken instance
 - BASE_KOKEN_URL: the root url of your koken instance. For example if your admin page is on `http://my-photos.me/koken/admin` then this parameter should be `http://my-photos.me/koken`
 - FOLDER_CONTAINING_PHOTOS: folder that contains the photos you want to upload.

#### Example

`koken-cli upload me@email.com myPassword39+ http://photos.artist.me allMyPhotos/2015`

### Export albums metadata

Let you export all the albums metadata recursively from a given root album. This is meant
to provide a way to export the structure that you have set up in koken and reuse that to
generate a separated website.

#### Usage

`koken-cli getAlbum YOUR_EMAIL PASSWORD BASE_KOKEN_URL ALBUM_ID`

Parameters:
 - YOUR_EMAIL: the email you use for your administration account on Koken
 - PASSWORD: the password associated with the email on your Koken instance
 - BASE_KOKEN_URL: the root url of your koken instance. For example if your admin page is on `http://my-photos.me/koken/admin` then this parameter should be `http://my-photos.me/koken`
 - ALBUM_ID: Id of the root of the albums metadata to export. The ID can found in the properties panel of the album you want to export.

#### Example

`koken-cli getAlbum me@email.com myPassword39+ http://photos.artist.me 1`

## The JS client

Promise based JS client. See `bin/koken-cli.js` to have an example of how it works.
