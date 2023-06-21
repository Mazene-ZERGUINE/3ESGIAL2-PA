'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('image', {
			image_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			libelle: {
				type: Sequelize.STRING,
			},
			lien: {
				type: Sequelize.STRING,
			},
			publication_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'publication',
					key: 'publication_id',
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('image');
	},
};
