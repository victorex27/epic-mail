import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import db from '../src/db';


use(chaiHttp);


async function deleteTable(table) {
  const text = `DELETE FROM ${table}`;
  const values = [];
  await db.query(text, values);
}

async function resetAutoIncrement(table) {
  const text = `ALTER SEQUENCE  ${table}_id_seq RESTART WITH 1`;
  const values = [];
  await db.query(text, values);
}

async function createUser(email) {
  const text = 'INSERT INTO users (email,password,first_name,last_name,mobile) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
  const values = [email, 'password', 'amaobi', 'obikobe', '0803297'];
  await db.query(text, values);
}
async function createMessages(sender, receiver, status) {
  const text = 'INSERT INTO messages (sender_id, receiver_id, subject, message, status) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
  const values = [sender, receiver, 'subject', 'obikobe', status];
  await db.query(text, values);
}

describe('POST /api/v2/auth/signup', () => {
  before((done) => {
    try {
      createUser('aobikobe@gmail.com');
      createUser('mikenit90@gmail.com');
      createUser('fifty1pilots@gmail.com');
      createUser('reachy@gmail.com');
      createUser('awarawa@gmail.com');
      createUser('ihiagwa@gmail.com');
      createUser('nkereuwem@gmail.com');
      createUser('mustapha@gmail.com');
      createUser('segun@gmail.com');
    } catch (error) {
      // console.log(error);
    }
    done();
  });
  after(() => {
    try {
      deleteTable('group_members');
      deleteTable('groups');
      deleteTable('messages');
      deleteTable('users');


      resetAutoIncrement('messages');
      resetAutoIncrement('users');
    } catch (error) {
      // console.log(error);
    }
  });
  describe('When a new User Signs Up with an acceptable detail', async () => {
    it('should return an object with the status and data', (done) => {
      const user = {
        email: 'emenike@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'password',
      };

      chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data').to.be.a('object');
          done();
        });
    });
  });

  describe('When a new User Signs Up with an Email account that already exists', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword',
      };

      chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('User account already exists');
          done();
        });
    });
  });
  describe('When a new User Signs Up with an invalid email type', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'amaobi', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword',
      };

      chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid Email Format');
          done();
        });
    });
  });

  describe('When a new User Signs Up with a password less than 6 char', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'pasww',
      };

      chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Password must be between 6 characters to 40 characters');
          done();
        });
    });
  });

  describe('When a new User Signs Up with no password ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: '',
      };

      chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Password must be between 6 characters to 40 characters');
          done();
        });
    });
  });
  describe('When a new User Signs Up with no firstname ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', firstName: '', lastName: 'Obikobe', password: 'password',
      };

      chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('firstName is required');
          done();
        });
    });
  });
  describe('When a new User Signs Up with no lastname ', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', firstName: 'Amaobi', lastName: '', password: 'password',
      };

      chai.request(server)
        .post('/api/v2/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('lastName is required');
          done();
        });
    });
  });
});
