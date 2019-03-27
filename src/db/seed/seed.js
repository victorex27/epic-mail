
export const userTable = `CREATE TABLE IF NOT EXISTS  users 
(id serial PRIMARY KEY,
    email VARCHAR(40) UNIQUE, 
    password VARCHAR(128), 
    first_name VARCHAR(40), 
    last_name VARCHAR(40),
     mobile int ); 
     INSERT INTO users (email,password,first_name,last_name,mobile) VALUES 
     ('aobikobe@gmail.com','$2a$10$st4YuszAhOFt55vHMZN5vu.ZLm62XnJ3lc9SeB2293OEfUZDSVeAe','amaobi','obikobe','08766');
    `;
export const messageTable = `CREATE TABLE IF NOT EXISTS  messages
( id serial PRIMARY KEY,subject VARCHAR(40) NOT NULL, message VARCHAR(40) NOT NULL, FOREIGN KEY (parent_message_id ) REFERENCES messages(id) ON DELETE RESTRICT ON UPDATE CASCADE, type ENUM('0','1') , status ENUM('draft','sent','read'), date TIMESTAMP);`;
export const groupTable = `CREATE TABLE IF NOT EXISTS groups 
(id serial PRIMARY KEY, name VARCHAR(40) NOT NULL, role VARCHAR(40) NOT NULL, owner_id BIGINT , FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE);`;
export const groupMemberTable = `CREATE TABLE IF NOT EXISTS group_members
(id serial PRIMARY KEY , group_id BIGINT, user_id BIGINT,FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE RESTRICT ON UPDATE CASCADE,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE);`;
export const replyTable = `CREATE TABLE IF NOT EXISTS reply;`;

