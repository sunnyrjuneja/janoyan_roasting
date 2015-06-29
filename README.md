# JRC Coffee

## History

This application was made many years ago to help a friend setup an ecommerce
site, give Jessica Willis a design project, and for me to learn more Node and
Angular. It was hosted on S3 and read a static file for the product
listings. It used SnipCart for the shopping cart.

Since then, it's become a maintenance nightmare and I've converted it to a
Rails application so I don't have to update the products manually. Eventually,
I'll completely remove Angular and SnipCart.

There is one model and three controllers. There are no tests. If you need to
update the front end, check the public folder. Most of the logic lives in
`public/js/shop.js`.

## Requirements

- Ruby 2.2.2
- Rails 4.2.2
- Some basic knowledge of Angular.

## Deployment

Hosted on Heroku.
