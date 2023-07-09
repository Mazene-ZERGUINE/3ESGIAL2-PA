'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('publication-appreciation', {
			publication_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: true,
				references: {
					model: 'publication',
					key: 'publication_id',
				},
				onDelete: 'CASCADE',
			},
			utilisateur_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: true,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
				onDelete: 'CASCADE',
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('publication-appreciation');
	},
};
