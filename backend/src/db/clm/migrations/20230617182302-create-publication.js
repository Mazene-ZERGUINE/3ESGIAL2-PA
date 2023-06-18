'use strict';
const { DataTypes } = require('sequelize');
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
				type: Sequelize.ENUM('actif', 'inactif'),
			},
			utilisateur_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
			},
			categorie_id: {
				type: DataTypes.INTEGER,
				references: {
					model: 'categorie',
					key: 'categorie_id',
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
		await queryInterface.dropTable('publication');
	},
};
