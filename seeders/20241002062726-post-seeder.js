'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ambil semua user yang sudah di-generate sebelumnya
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users;`, 
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    let posts = [];

    // Loop melalui setiap user untuk membuat beberapa post
    users.forEach(user => {
      // Buat 3 post untuk setiap user
      for (let i = 0; i < 3; i++) {
        posts.push({
          title: faker.lorem.sentence(), // Menggunakan faker untuk generate title
          content: faker.lorem.paragraphs(2), // Menggunakan faker untuk generate content
          userId: user.id, // Setiap post akan terkait dengan user
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    // Masukkan data posts ke dalam tabel posts
    await queryInterface.bulkInsert('posts', posts, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data dari tabel posts
    await queryInterface.bulkDelete('posts', null, {});
  },
};
