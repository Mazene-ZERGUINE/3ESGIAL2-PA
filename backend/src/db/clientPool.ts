const Pool = require('pg').Pool;

const dbConnexion: any = new Pool({
	user: 'psql',
	host: 'localhost',
	database: 'java_client',
	password: 'test',
	port: 5432,
});

module.exports = dbConnexion;
