import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Publication } from './publication';

export class Image extends Model {}

Image.init(
	{
		image_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		libelle: DataTypes.STRING,
		lien: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		publication_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'publication',
				key: 'publication_id',
			},
		},
	},
	{
		sequelize,
		modelName: 'image',
		freezeTableName: true,
		timestamps: false,
	},
);

//#region 		image & publication
Publication.hasMany(Image, { foreignKey: 'publication_id', onDelete: 'CASCADE' });
Image.belongsTo(Publication, { foreignKey: 'publication_id' });
//#endregion	image & publication
