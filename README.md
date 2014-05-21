This repo is the code for http://jrccoffee.com

required:
nodejs && npm

How to contribue to this repo:

Fork this repo

Clone new repo

Run `npm start` to start http-server

Make changes

Run `gulp make`

Commit && Send PR


note: if updating the coffees you need to run `node bin/build.js` before `gulp make`.

This repo uses [s3_website](https://github.com/laurilehmijoki/s3_website)
to deploy to s3.

deploy:
```
s3_website push --site dist
```
