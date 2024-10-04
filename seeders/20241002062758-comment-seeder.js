'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comments', [
      {
        content: 'This is a comment on the first post.',
        postId: 1, // Sesuaikan dengan id post yang ada
        userId: 2, // Sesuaikan dengan id user yang ada
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'This is a comment on the second post.',
        postId: 2, // Sesuaikan dengan id post yang ada
        userId: 1, // Sesuaikan dengan id user yang ada
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
