'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('publication-appreciation', {
			publication_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
			utilisateur_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('publication-appreciation');
	},
};
