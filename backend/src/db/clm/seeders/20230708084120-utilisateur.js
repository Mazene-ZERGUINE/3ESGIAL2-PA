'use strict';

const { hash } = require('argon2');
const { randomBytes } = require('crypto');

const HASHING_CONFIG = {
	parallelism: 1,
	memoryCost: 64000, // bytes
	timeCost: 3, // iterations
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'utilisateur',
			[
				{
					email: 'a@email.fr',
					mot_de_passe: await hash('a', { ...HASHING_CONFIG, salt: randomBytes(16) }),
					pseudonyme: 'a',
					nom: 'Noma',
					prenom: 'Prenoma',
					departement: '75',
					ville: 'paris',
					role: 'administrateur',
					statut: 'actif',
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('utilisateur', null, {});
	},
};
