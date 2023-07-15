'use strict';

const commentaires = [];
let value;
for (let i = 1; i <= 21; i++) {
	for (let j = 1; j <= 21; j++) {
		value = j >= 10 ? j : `0${j}`;

		commentaires.push({
			utilisateur_id: i + 1, // because 'admin' has ID 1
			publication_id: i,
			commentaire: `Super #${value}`,
			created_at: `2023-06-${value} 09:45:00`,
		});
	}
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('commentaire', commentaires, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('commentaire', null, {});
	},
};
