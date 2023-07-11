'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('publication', {
			publication_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			titre: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT,
			},
			statut: {
				type: Sequelize.ENUM('actif', 'banni', 'inactif'),
			},
			utilisateur_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
				onDelete: 'CASCADE',
			},
			categorie_id: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: 'categorie',
					key: 'categorie_id',
				},
				onDelete: 'SET NULL',
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
		await queryInterface.dropTable('publication');
	},
};
