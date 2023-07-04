import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/clm/db_connection';
import { Utilisateur } from './utilisateur';

export class Session extends Model {}

Session.init(
	{
		session_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		token: DataTypes.TEXT,
		utilisateur_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'utilisateur',
				key: 'utilisateur_id',
			},
		},
	},
	{
		sequelize,
		modelName: 'session',
		freezeTableName: true,
		timestamps: false,
	},
);

//#region 		session & utilisateur
Session.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Utilisateur.hasMany(Session, { foreignKey: 'utilisateur_id', onDelete: 'CASCADE' });
//#endregion 	session & utilisateur
