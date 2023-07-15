'use strict';

const publications = [];
for (let i = 1; i <= 21; i++) {
	publications.push({
		titre: `Titre ${i}`,
		description: 'lorem ipsum dolor sit amet, consectetur',
		statut: 'actif',
		utilisateur_id: i + 1, // because 'admin' has ID 1
		categorie_id: Math.floor(Math.random() * 6) + 1,
		created_at: `2023-06-01 00:00:${i >= 10 ? i : `0${i}`}`,
	});
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('publication', publications, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('publication', null, {});
	},
};
