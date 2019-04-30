const enums = '';
export const userTable = `CREATE TABLE IF NOT EXISTS  users 
(id serial PRIMARY KEY,
    email VARCHAR(40) UNIQUE, 
    password VARCHAR(128), 
    first_name VARCHAR(40), 
    last_name VARCHAR(40),
     mobile int ); `;
export const messageTable = `
CREATE TYPE message_status as ENUM('draft','sent','read');
CREATE TABLE IF NOT EXISTS messages
( id serial PRIMARY KEY, 
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT, 
    subject VARCHAR(40) NOT NULL, 
    message VARCHAR(40) NOT NULL , 
    status message_status, 
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    group_id BIGINT DEFAULT 0,
    CONSTRAINT ms_sender  FOREIGN KEY (sender_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    CONSTRAINT ms_receiver FOREIGN KEY (receiver_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE RESTRICT );`;
export const groupTable = `CREATE TABLE IF NOT EXISTS groups 
(id serial PRIMARY KEY, name VARCHAR(40) NOT NULL, role VARCHAR(40) NOT NULL, owner_id BIGINT , FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE);`;
export const groupMemberTable = `CREATE TABLE IF NOT EXISTS group_members
(id serial PRIMARY KEY , group_id BIGINT, user_id BIGINT,FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE RESTRICT ON UPDATE CASCADE,FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE);`;
export const replyTable = 'CREATE TABLE IF NOT EXISTS reply;';
