import { DataTypes, Model } from 'sequelize';
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
		modelName: 'utilisateur_signalement',
		freezeTableName: true,
		timestamps: false,
	},
);

//#region
UtilisateurSignalement.belongsTo(Utilisateur, {
	foreignKey: 'signaleur_id',
	// as: 'signaleur',
});
Utilisateur.hasMany(UtilisateurSignalement, {
	foreignKey: 'signaleur_id',
	// as: 'signalements',
	onDelete: 'SET NULL',
});

UtilisateurSignalement.belongsTo(Utilisateur, {
	foreignKey: 'signale_id',
	// as: 'signale',
});
Utilisateur.hasMany(UtilisateurSignalement, {
	foreignKey: 'signale_id',
	// as: 'signalements_recus',
	onDelete: 'CASCADE',
});

// Utilisateur.belongsToMany(Utilisateur, {
// 	through: UtilisateurSignalement,
// 	as:"signaleur_utilisateur",
// 	foreignKey: "signaleur_id",
// 	otherKey:"signale_id",
// 	onDelete:"SET NULL"
// })
//
// Utilisateur.belongsToMany(Utilisateur, {
// 	through: UtilisateurSignalement,
// 	as:"signale_utilisateur",
// 	foreignKey: "signale_id",
// 	otherKey:"signaleur_id",
// 	onDelete:"CASCADE"
// })

// Utilisateur.belongsToMany(Utilisateur, { as: 'utilisateur_signalement', through: 'UtilisateurSignalement' })

//#endregion
