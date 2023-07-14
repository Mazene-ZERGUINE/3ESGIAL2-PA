import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Utilisateur } from './utilisateur';
import { Publication } from './publication';

export class Commentaire extends Model {}

Commentaire.init(
	{
		commentaire_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		utilisateur_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
		},
		publication_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'publication',
				key: 'publication_id',
			},
		},
		commentaire: DataTypes.TEXT,
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
		modelName: 'commentaire',
		freezeTableName: true,
		timestamps: false,
	},
);

//#region 		publication & utilisateur
Commentaire.belongsTo(Utilisateur, {
	foreignKey: 'utilisateur_id',
	// as: 'commentaire_utilisateur',
});
Utilisateur.hasMany(Commentaire, {
	foreignKey: 'utilisateur_id',
	// as: 'utilisateur_commentaires',
	onDelete: 'SET NULL',
});

Commentaire.belongsTo(Publication, {
	foreignKey: 'publication_id',
	// as: 'commentaire_publication',
});
Publication.hasMany(Commentaire, {
	foreignKey: 'publication_id',
	// as: 'publication_commentaires',
	onDelete: 'CASCADE',
});
//#endregion	publication & utilisateur

//#region 		utilisateur & commentaire + commentaire & publication
// Commentaire.belongsToMany(Utilisateur, {
// 	through: PublicationAppreciation,
// 	foreignKey: 'commentaire_id',
// 	otherKey: 'utilisateur_id',
// });
//
// Utilisateur.belongsToMany(Commentaire, {
// 	through: Commentaire,
// 	foreignKey: 'utilisateur_id',
// 	otherKey: 'commentaire_id',
// });
//
// // =====
//
// Commentaire.belongsToMany(Publication, {
// 	through: PublicationAppreciation,
// 	foreignKey: 'commentaire_id',
// 	otherKey: 'publication_id',
// });
//
// Publication.belongsToMany(Commentaire, {
// 	through: Commentaire,
// 	foreignKey: 'publication_id',
// 	otherKey: 'commentaire_id',
// });
//#endregion	utilisateur & commentaire + commentaire & publication
