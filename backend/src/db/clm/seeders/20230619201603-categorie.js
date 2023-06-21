'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'categorie',
			[
				{
					libelle: 'Multimédia',
				},
				{
					libelle: 'Mode',
				},
				{
					libelle: 'Maison',
				},
				{
					libelle: 'Loisirs',
				},
				{
					libelle: 'Véhicule',
				},
				{
					libelle: 'Autre',
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('categorie', null, {});
	},
};
