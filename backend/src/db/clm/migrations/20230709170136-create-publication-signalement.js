'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('publication_signalement', {
			publication_signalement_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			publication_id: {
				type: Sequelize.INTEGER,
				// primaryKey: true,
				allowNull: true,
				references: {
					model: 'publication',
					key: 'publication_id',
				},
				onDelete: 'CASCADE',
			},
			utilisateur_id: {
				type: Sequelize.INTEGER,
				// primaryKey: true,
				allowNull: true,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
				onDelete: 'SET NULL',
			},
			statut: {
				type: Sequelize.ENUM('ouvert', 'en cours', 'ferme'),
			},
			description: {
				type: Sequelize.TEXT,
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
		await queryInterface.dropTable('publication_signalement');
	},
};
