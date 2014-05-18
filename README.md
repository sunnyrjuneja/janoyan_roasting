This repo is the code for http://jrccoffee.com

required:
nodejs && npm

note: if updating the coffees you need to run `node bin/build.js`

This repo uses [s3_website](https://github.com/laurilehmijoki/s3_website)
to deploy to s3.

deploy:
```
gulp make
s3_website push --site dist
```
