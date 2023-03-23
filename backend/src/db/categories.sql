CREATE DATABASE java_client  ;

DROP TABLE categories;

CREATE TABLE categories  (
	id SERIAL PRIMARY KEY  ,
	title VARCHAR(255),
	desciption TEXT
) ;

INSERT INTO categories (title , desciption) VALUES ('api' , 'nodeJS api for java client') ;
INSERT INTO categories (title , desciption) VALUES ('front office' , 'angular app') ;
INSERT INTO categories (title , desciption) VALUES ('back office' , 'aangular app') ;
INSERT INTO categories (title , desciption) VALUES ('java' , 'javafx is shit') ;
INSERT INTO categories (title , desciption) VALUES ('langage' , '???') ;

SELECT * FROM categories;
