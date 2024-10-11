'use strict';
const { faker } = require('@faker-js/faker'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [];

    for (let i = 0; i < 1000; i++) {
      users.push({
        name: faker.person.fullName(),
        email: faker.internet.email()+ i,
        password: faker.internet.password(), 
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
