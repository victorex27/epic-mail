export const userSeed = `
     INSERT INTO users (email,password,first_name,last_name,mobile) VALUES 
     ('aobikobe@gmail.com','$2a$10$st4YuszAhOFt55vHMZN5vu.ZLm62XnJ3lc9SeB2293OEfUZDSVeAe','amaobi','obikobe','08766'),
     ('amandaaduchie@gmail.com','$2a$10$st4YuszAhOFt55vHMZN5vu.ZLm62XnJ3lc9SeB2293OEfUZDSVeAe','amanda','obikobe','087669');
    `;


export const messageSeed = `
    INSERT INTO messages (sender_id,receiver_id,subject,message,status) VALUES 
    ( (SELECT id from users WHERE email = 'aobikobe@gmail.com'), (SELECT id from users WHERE email = 'amandaaduchie@gmail.com'),'Urgent Reply Immediately','testing if it works', 'sent' ),
    ( (SELECT id from users WHERE email = 'amandaaduchie@gmail.com'), (SELECT id from users WHERE email = 'aobikobe@gmail.com'),'(Reply): Urgent Reply Immediately','Already sent it. Thanks for the reminder', 'sent' );
   `;

