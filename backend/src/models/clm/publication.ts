import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Utilisateur } from './utilisateur';
import { PublicationAppreciation } from './publication-appreciation';
import { PublicationFavori } from './publication_favori';

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
			allowNull: true,
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
Utilisateur.hasMany(Publication, { foreignKey: 'utilisateur_id', onDelete: 'CASCADE' });
//#endregion	publication & utilisateur

//#region 		publication & publication-appreciation & utilisateur
Publication.belongsToMany(Utilisateur, {
	through: PublicationAppreciation,
	foreignKey: 'publication_id',
	otherKey: 'utilisateur_id',
	onDelete: 'CASCADE',
});

Utilisateur.belongsToMany(Publication, {
	through: PublicationAppreciation,
	foreignKey: 'utilisateur_id',
	otherKey: 'publication_id',
	onDelete: 'CASCADE',
});
//#endregion	publication & publication-appreciation & utilisateur

//#region 		publication & publication_favori & utilisateur
Publication.belongsToMany(Utilisateur, {
	through: PublicationFavori,
	foreignKey: 'publication_id',
	otherKey: 'utilisateur_id',
	onDelete: 'CASCADE',
});

Utilisateur.belongsToMany(Publication, {
	through: PublicationFavori,
	foreignKey: 'utilisateur_id',
	otherKey: 'publication_id',
	onDelete: 'CASCADE',
});
//#endregion	publication & publication_favori & utilisateur

//#region publication & PublicationFavori
// Publication.belongsToMany(PublicationFavori, {
// 	through: 'publication_favori',
// 	foreignKey: 'publication_id',
// 	otherKey: 'utilisateur_id',
// 	onDelete: 'CASCADE',
// });
//
// PublicationFavori.belongsToMany(Publication, {
// 	through: 'publication_favori',
// 	foreignKey: 'utilisateur_id',
// 	otherKey: 'publication_id',
// 	onDelete: 'NO ACTION',
// });

Publication.hasMany(PublicationFavori, { foreignKey: 'utilisateur_id', onDelete: 'CASCADE' });
PublicationFavori.belongsTo(Publication, { foreignKey: 'publication_id', onDelete: 'NO ACTION' });
//#endregion
