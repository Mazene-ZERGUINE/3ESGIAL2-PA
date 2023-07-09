CREATE DATABASE java_client  ;

DROP TABLE categories;

CREATE TABLE categories  (
	id SERIAL PRIMARY KEY  ,
	title VARCHAR(255),
	desciption TEXT
) ;



