DROP TABLE IF EXISTS client_user;

CREATE TABLE client_user (
	id SERIAL PRIMARY KEY,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	firstName VARCHAR NOT NULL,
	lastName VARCHAR NOT NULL,
	created_at DATE NOT NULL,
	updated_at DATE
);

INSERT INTO client_user (
  email,
  password,
  firstName,
  lastName,
  created_at,
  updated_at
) VALUES (
  'q1@email.fr',
  'password1',
  'firstName1',
  'lastName1',
  current_timestamp,
  NULL
);

INSERT INTO client_user (
  email,
  password,
  firstName,
  lastName,
  created_at,
  updated_at
) VALUES (
  'q2@email.fr',
  'password2',
  'firstName2',
  'lastName2',
  current_timestamp,
  NULL
);

SELECT * FROM client_user;
