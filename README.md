# koken-cli
Command and js client for Koken photo CMS

## Prerequisites

You need [Node and NPM](https://docs.npmjs.com/getting-started/installing-node).

## Use the CLI - command line interface

### Installation

In your terminal:

`npm install -g koken-cli`

### Usage

`koken-cli CMD YOUR_EMAIL PASSWORD BASE_KOKEN_URL FOLDER_CONTAINING_PHOTOS`

Parameters:
 - CMD : command to apply on your koken instance. For now, just `upload` is supported as a command.
 - YOUR_EMAIL: the email you use for your administration account on Koken
 - PASSWORD: the password associated with the email on your Koken instance
 - BASE_KOKEN_URL: the root url of your koken instance. For example if your admin page is on `http://my-photos.me/koken/admin` then this parameter should be `http://my-photos.me/koken`
 - FOLDER_CONTAINING_PHOTOS: folder that contains the photos you want to upload.

### Example of batch upload of photos

`koken-cli upload me@email.com myPassword39+ http://photos.artist.me allMyPhotos/2015`

## The JS client

Promise based JS client. See `bin/koken-cli.js` to have an example of how it works.
