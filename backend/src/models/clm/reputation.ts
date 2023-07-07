import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';

export class Reputation extends Model {}

Reputation.init(
	{
		evaluateur_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
		},
		evalue_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: true,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
		},
		note: DataTypes.INTEGER,
	},
	{
		sequelize,
		modelName: 'reputation',
		freezeTableName: true,
		timestamps: false,
	},
);
