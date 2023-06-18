'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('categorie', {
			categorie_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			libelle: {
				type: Sequelize.STRING,
				unique: true,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('categorie');
	},
};
