import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Utilisateur } from './utilisateur';
import { Publication } from './publication';

export class PublicationSignalement extends Model {}

PublicationSignalement.init(
	{
		publication_signalement_id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		publication_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			references: {
				model: 'publication',
				key: 'publication_id',
			},
			onDelete: 'CASCADE',
		},
		utilisateur_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
			onDelete: 'SET NULL',
		},
		statut: DataTypes.ENUM('ouvert', 'en cours', 'ferme'),
		description: DataTypes.TEXT,
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
		modelName: 'publication_signalement',
		freezeTableName: true,
		timestamps: false,
	},
);

//#region
Utilisateur.belongsToMany(Publication, {
	through: PublicationSignalement,
	foreignKey: 'utilisateur_id',
	otherKey: 'publication_id',
	onDelete: 'SET NULL',
});

Publication.belongsToMany(Utilisateur, {
	through: PublicationSignalement,
	foreignKey: 'publication_id',
	otherKey: 'utilisateur_id',
	onDelete: 'CASCADE',
});
//#endregion
