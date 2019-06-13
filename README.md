# Grozeries-Server
Real-World Project through Codaisseur. Node / Express / Sequelize back-end.

VERSION 1.0 (BÈTA) - Server side of Grozeries platform
The Development Team "Grozeries" of Class 25 welcomes you: may your coding adventure be a good one!

## Contents

This is the server side of the Grozeries platform,
it is made in Sequelize and Express.
It contains multiple routes and models for orders, orderlines, product, shops and users.
The app also uses Sequelize migration so when you change up the models you dont have to delete your whole database.

## Authors

* **Kevin Zijlmans** - [KevinZijlmans](https://github.com/KevinZijlmans)
* **Vivian da Graca** - [vdagraca](https://github.com/vdagraca)
* **Robert Langereis** - [robertlangereis](https://github.com/robertlangereis)

See also the list of [contributors](https://github.com/AlbertSmit/Grozeries-Server/graphs/contributors) who participated in this project. 

Installation:
- git clone
- npm install
- nodemon .

Backend is deployed to heroku: 
https://grozeries.herokuapp.com/

When adding or changing columns to tables use migrations.
For documentation see:
http://docs.sequelizejs.com/manual/migrations.html
To migrate datatables to heroku use:

heroku run sequelize db:migrate --env production --app grozeries

To do:
- algorithm of price of products in grams
- algorithm that adjusts the stock is in the branch:feat/adjuststock but not yet merged because it doesn't work properly yet.
