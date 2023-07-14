'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('utilisateur_signalement', {
			utilisateur_signalement_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			signaleur_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
				onDelete: 'SET NULL',
			},
			signale_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
				onDelete: 'CASCADE',
			},
			description: {
				type: Sequelize.TEXT,
			},
			statut: {
				type: Sequelize.ENUM('ouvert', 'en cours', 'ferme'),
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
		await queryInterface.dropTable('utilisateur_signalement');
	},
};
