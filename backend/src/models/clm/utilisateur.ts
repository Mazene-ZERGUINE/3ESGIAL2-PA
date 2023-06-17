import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';

export class Utilisateur extends Model {}

Utilisateur.init(
	{
		utilisateur_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		mot_de_passe: DataTypes.STRING,
		pseudonyme: {
			type: DataTypes.STRING,
			unique: true,
		},
		nom: DataTypes.STRING,
		prenom: DataTypes.STRING,
		departement: DataTypes.STRING,
		ville: DataTypes.STRING,
		role: DataTypes.ENUM('administrateur', 'utilisateur'),
		statut: DataTypes.ENUM('actif', 'banni', 'inactif'),
	},
	{
		sequelize,
		modelName: 'utilisateur',
		freezeTableName: true,
		timestamps: false,
	},
);
