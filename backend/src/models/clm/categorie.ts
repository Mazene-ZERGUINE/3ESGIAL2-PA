import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Publication } from './publication';

export class Categorie extends Model {}

Categorie.init(
	{
		categorie_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		libelle: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		sequelize,
		modelName: 'categorie',
		freezeTableName: true,
		timestamps: false,
	},
);

//#region 		categorie & publication
Categorie.hasMany(Publication, { foreignKey: 'categorie_id', onDelete: 'SET NULL' });
Publication.belongsTo(Categorie, { foreignKey: 'categorie_id' });
//#endregion	categorie & publication
