'use strict';
const { faker } = require('@faker-js/faker'); // Import faker versi baru

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Array untuk menyimpan data
    let users = [];

    // Loop untuk membuat 1000 data
    for (let i = 0; i < 1000; i++) {
      users.push({
        name: faker.person.fullName(), // Menghasilkan nama acak
        email: faker.internet.email(), // Menghasilkan email acak
        password: faker.internet.password(), // Gantilah dengan hash password yang benar
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Melakukan bulk insert untuk data user
    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
