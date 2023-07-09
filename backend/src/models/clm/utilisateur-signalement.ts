import { DataTypes, Model,  } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Utilisateur } from './utilisateur';

export class UtilisateurSignalement extends Model {}

UtilisateurSignalement.init(
	{
		utilisateur_signalement_id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		signaleur_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
		},
		signale_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
		},
		description: DataTypes.TEXT,
		statut: DataTypes.ENUM('ouvert', 'en cours', 'ferme'),
		created_at: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updated_at: {
			allowNull: true,
			type: DataTypes.DATE,
		},
	},
	{
		sequelize,
		modelName: 'utilisateur-signalement',
		freezeTableName: true,
		timestamps: false,
	},
);

//#region 		publication & utilisateur
UtilisateurSignalement.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Utilisateur.hasMany(UtilisateurSignalement, { foreignKey: 'utilisateur_id' });
