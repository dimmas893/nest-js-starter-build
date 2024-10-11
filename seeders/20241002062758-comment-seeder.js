'use strict';
const { faker } = require('@faker-js/faker');
const cliProgress = require('cli-progress');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ambil semua post dan semua user yang sudah di-generate sebelumnya
    const posts = await queryInterface.sequelize.query(
      `SELECT id FROM posts;`, 
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users;`, 
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    let comments = [];
    const totalIterations = posts.length * users.length * 2; // Setiap user berkomentar 2 kali di setiap postingan
    let processedCount = 0;

    // Buat progress bar baru
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    progressBar.start(totalIterations, 0); // Mulai progress bar

    posts.forEach(post => {
      users.forEach(user => {
        // Buat 2 comments untuk setiap user di setiap post
        for (let i = 0; i < 2; i++) {
          comments.push({
            content: faker.person.fullName(), // Menggunakan faker untuk generate comment content
            postId: post.id, // Setiap comment akan terkait dengan post
            userId: user.id, // Setiap comment akan terkait dengan user
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          processedCount++;
          progressBar.update(processedCount); // Update progress bar dengan jumlah yang tepat
        }
      });
    });

    // Masukkan data comments ke dalam tabel comments
    await queryInterface.bulkInsert('comments', comments, {});

    // Selesai seeding, tutup progress bar
    progressBar.update(totalIterations); // Pastikan progress bar mencapai 100%
    progressBar.stop();
  },

  down: async (queryInterface, Sequelize) => {
    // Hapus semua data dari tabel comments
    await queryInterface.bulkDelete('comments', null, {});
  },
};
