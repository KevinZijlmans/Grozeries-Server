'use strict';

    module.exports = {
     up: (queryInterface, Sequelize) => {
    
       return queryInterface.bulkInsert('Users', [{
         first_name: 'John',
         last_name: 'graca',
         email: 'john@gmail.com',
         password: 'hoi',
         street_name: 'Ceintuurbaan',
         house_number: '10',
         zipcode: '1090BT',
         city: 'amsterdam',
         phonenumber: '03499',
         user_type: 'customer',
         createdAt: new Date(),
         updatedAt: new Date()
       }], {});
     },
    
     down: (queryInterface, Sequelize) => {
    
       return queryInterface.bulkDelete('Users', null, {});
     }
    };
