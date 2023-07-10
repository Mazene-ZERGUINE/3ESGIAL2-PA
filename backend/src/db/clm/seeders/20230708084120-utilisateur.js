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
					email: 'admin@email.fr',
					mot_de_passe: await hash('a', { ...HASHING_CONFIG, salt: randomBytes(16) }),
					pseudonyme: 'admin',
					nom: 'Noma',
					prenom: 'Prenoma',
					departement: '75',
					ville: 'paris',
					role: 'administrateur',
					statut: 'actif',
				},
				{
					email: 'user@email.fr',
					mot_de_passe: await hash('u', { ...HASHING_CONFIG, salt: randomBytes(16) }),
					pseudonyme: 'user',
					nom: 'Nomu',
					prenom: 'Prenomu',
					departement: '75',
					ville: 'paris',
					role: 'utilisateur',
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
