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
		const users = [];
		for (let i = 1; i <= 21; i++) {
			users.push({
				email: `user${i}@email.fr`,
				mot_de_passe: await hash('u', { ...HASHING_CONFIG, salt: randomBytes(16) }),
				pseudonyme: `user${i}`,
				nom: 'Nomu',
				prenom: 'Prenomu',
				departement: '75',
				ville: 'Paris',
				role: 'utilisateur',
				statut: 'actif',
			});
		}

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
					ville: 'Paris',
					role: 'administrateur',
					statut: 'actif',
				},
				...users,
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('utilisateur', null, {});
	},
};
