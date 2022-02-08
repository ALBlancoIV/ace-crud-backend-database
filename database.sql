CREATE DATABASE ace_crud_exam_database;

--\c into ace_crud_exam_database

CREATE TABLE item_table (
    id SERIAL PRIMARY KEY,
    item VARCHAR(255),
    rate DECIMAL,
    quantity DECIMAL
);


    
