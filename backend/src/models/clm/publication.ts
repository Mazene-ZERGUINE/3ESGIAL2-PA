import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Utilisateur } from './utilisateur';
import { PublicationAppreciation } from './publication-appreciation';

export class Publication extends Model {}

Publication.init(
	{
		publication_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		titre: DataTypes.STRING,
		description: DataTypes.TEXT,
		statut: DataTypes.ENUM('actif', 'inactif'),
		utilisateur_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
		},
		categorie_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'categorie',
				key: 'categorie_id',
			},
		},
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
		modelName: 'publication',
		freezeTableName: true,
		timestamps: false,
	},
);

//#region 		publication & utilisateur
Publication.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Utilisateur.hasMany(Publication, { foreignKey: 'utilisateur_id' });
//#endregion	publication & utilisateur

//#region 		publication & utilisateur
Publication.belongsToMany(Utilisateur, {
	through: PublicationAppreciation,
	foreignKey: 'publication_id',
	otherKey: 'utilisateur_id',
});

Utilisateur.belongsToMany(Publication, {
	through: PublicationAppreciation,
	foreignKey: 'utilisateur_id',
	otherKey: 'publication_id',
});
//#endregion	publication & utilisateur
