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

select categories.name, sum from categories right join(select categoryid,sum(cost) from items,categories group by categoryid) as test on categoryid = categories.id;
