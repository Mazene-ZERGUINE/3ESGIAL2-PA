CREATE DATABASE java_client  ;

DROP TABLE categories;

CREATE TABLE categories  (
	id SERIAL PRIMARY KEY  ,
	title VARCHAR(255),
	disciption TEXT
) ;

INSERT INTO categories (title , disciption) VALUES ('api' , 'nodeJS api for java client') ;
INSERT INTO categories (title , disciption) VALUES ('front office' , 'angular app') ;
INSERT INTO categories (title , disciption) VALUES ('back office' , 'aangular app') ;
INSERT INTO categories (title , disciption) VALUES ('java' , 'javafx is shit') ;
INSERT INTO categories (title , disciption) VALUES ('langage' , '???') ;

SELECT * FROM categories;
