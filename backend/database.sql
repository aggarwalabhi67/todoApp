CREATE DATABASE todoDB;

 CREATE TABLE TODO (
     todo_id SERIAL PRIMARY KEY,
     title VARCHAR(100) NOT NULL, 
     todo_priority INTEGER NOT NULL,
     todo_date DATE NOT NULL, 
     status BOOLEAN DEFAULT 'N'
     );