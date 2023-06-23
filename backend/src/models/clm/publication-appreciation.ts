import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';

export class PublicationAppreciation extends Model {}

PublicationAppreciation.init(
	{
		publication_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		utilisateur_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
	},
	{
		sequelize,
		modelName: 'publication-appreciation',
		freezeTableName: true,
		timestamps: false,
	},
);
