'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('profiles', [
      {
        bio: 'This is John Doe\'s profile.',
        avatarUrl: 'https://example.com/avatar/john.jpg',
        userId: 1, // Sesuaikan dengan id user yang ada
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        bio: 'This is Jane Doe\'s profile.',
        avatarUrl: 'https://example.com/avatar/jane.jpg',
        userId: 2, // Sesuaikan dengan id user yang ada
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('profiles', null, {});
  },
};
