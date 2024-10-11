'use strict';
const { faker } = require('@faker-js/faker'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users;`, 
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    let profiles = [];

    users.forEach(user => {
      profiles.push({
        bio: faker.lorem.sentence(), 
        avatarUrl: faker.image.avatar(), 
        userId: user.id, 
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert('profiles', profiles, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data dari tabel profiles
    await queryInterface.bulkDelete('profiles', null, {});
  },
};
