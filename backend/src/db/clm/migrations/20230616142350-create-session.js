'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('session', {
			session_id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			token: {
				type: Sequelize.TEXT,
			},
			utilisateur_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
				onDelete: 'CASCADE',
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('session');
	},
};
