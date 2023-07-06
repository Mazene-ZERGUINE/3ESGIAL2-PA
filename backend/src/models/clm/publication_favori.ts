import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';

export class PublicationFavori extends Model {}

PublicationFavori.init(
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
		modelName: 'publication_favori',
		freezeTableName: true,
		timestamps: false,
	},
);
