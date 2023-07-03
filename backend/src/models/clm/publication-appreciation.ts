import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';

export class PublicationAppreciation extends Model {}

PublicationAppreciation.init(
	{
		publication_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			references: {
				model: 'publication',
				key: 'publication_id',
			},
		},
		utilisateur_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
		},
	},
	{
		sequelize,
		modelName: 'publication-appreciation',
		freezeTableName: true,
		timestamps: false,
	},
);
