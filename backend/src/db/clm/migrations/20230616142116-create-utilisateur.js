'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('utilisateur', {
			utilisateur_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			email: {
				type: Sequelize.STRING,
				unique: true,
			},
			mot_de_passe: {
				type: Sequelize.STRING,
			},
			pseudonyme: {
				type: Sequelize.STRING,
				unique: true,
			},
			nom: {
				type: Sequelize.STRING,
			},
			prenom: {
				type: Sequelize.STRING,
			},
			departement: {
				type: Sequelize.STRING,
			},
			ville: {
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.ENUM('administrateur', 'utilisateur'),
			},
			statut: {
				type: Sequelize.ENUM('actif', 'banni', 'inactif'),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('utilisateur');
	},
};
