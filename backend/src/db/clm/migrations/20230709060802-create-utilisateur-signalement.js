'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('utilisateur-signalement', {
			signalement_personne_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			description: {
				type: Sequelize.TEXT,
			},
			status: {
				type: Sequelize.STRING,
			},
			utilisateur_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: true,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('utilisateur-signalement');
	},
};
