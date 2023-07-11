DROP TABLE IF EXISTS client_user;

CREATE TABLE client_user (
	id SERIAL PRIMARY KEY,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE,
	UNIQUE (email),
	role VARCHAR NOT
);

SELECT * FROM client_user;
