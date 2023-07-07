'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('reputation', {
			evaluateur_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: true,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
				onDelete: 'CASCADE',
			},
			evalue_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: true,
				references: {
					model: 'utilisateur',
					key: 'utilisateur_id',
				},
				onDelete: 'CASCADE',
			},
			note: {
				type: Sequelize.INTEGER,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('reputation');
	},
};
