import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Utilisateur } from './utilisateur';
import { Publication } from './publication';
import { PublicationAppreciation } from './publication-appreciation';

export class Commentaire extends Model {}

Commentaire.init(
	{
		Commentaire_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		commentaire: DataTypes.STRING,
		utilisateur_id: {
			type: DataTypes.INTEGER,
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
Commentaire.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Utilisateur.hasMany(Commentaire, { foreignKey: 'utilisateur_id' });

Commentaire.belongsTo(Publication, { foreignKey: 'publication_id' });
Publication.hasMany(Commentaire, { foreignKey: 'publication_id' });
//#endregion	publication & utilisateur

//#region 		publication & utilisateur
Commentaire.belongsToMany(Utilisateur, {
	through: PublicationAppreciation,
	foreignKey: 'Commentaire_id',
	otherKey: 'utilisateur_id',
});

Utilisateur.belongsToMany(Commentaire, {
	through: PublicationAppreciation,
	foreignKey: 'utilisateur_id',
	otherKey: 'Commentaire_id',
});

// =====

Commentaire.belongsToMany(Publication, {
	through: PublicationAppreciation,
	foreignKey: 'Commentaire_id',
	otherKey: 'publication_id',
});

Publication.belongsToMany(Commentaire, {
	through: PublicationAppreciation,
	foreignKey: 'publication_id',
	otherKey: 'Commentaire_id',
});
//#endregion	publication & utilisateur
