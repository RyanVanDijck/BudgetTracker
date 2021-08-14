CREATE TABLE items(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100), 
    cost REAL,
    categoryId INT
); 

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) 
);

INSERT INTO categories(name) values ('Bills');
