import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import db from '../src/db';


use(chaiHttp);


async function deleteTable(table) {
  const text = `TRUNCATE TABLE ${table}`;
  const values = [];

  try {
    return await db.query(text, values);
  } catch (error) {
    return error;
  }
}

async function createUser(email) {
  const text = 'INSERT INTO users (email,password,first_name,last_name,mobile) VALUES ($1,$2,$3,$4,$5) RETURNING *;';
  const values = [email, 'password', 'amaobi', 'obikobe', '0803297'];

  try {
    const { rows } = await db.query(text, values);
    return rows[0];
  } catch (error) {
    return error;
  }
}
let newUser;
let wrongUser;
let newGroupName;


describe('POST /api/v2/groups', () => {
  describe('Create and own a group with valid details', async () => {
    const rows = await createUser('aobikobe@gmail.com');
    newUser = rows.id + 3;
    wrongUser = rows.id + 10;
    newGroupName = rows.name;
    // console.log(newUser);
    const group = {
      name: 'epic group', role: 'admin', ownerId: newUser,
    };

    it('should return a object', (done) => {
      chai.request(server)
        .post('/api/v2/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data').to.be.a('object');
          done();
        });
    });
  });


  describe('Create and own a group with  a user id of wrong data type', () => {
    it('should return Invalid User id', (done) => {
      const group = {
        name: 'epic group', role: 'admin', ownerId: 'p',
      };
      chai.request(server)
        .post('/api/v2/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid User id');
          done();
        });
    });
  });

  describe('Create and own a group with  a user id that does not exists', () => {
    it('should return an error message', (done) => {
      const group = {
        name: 'epic group', role: 'admin', ownerId: wrongUser,
      };
      chai.request(server)
        .post('/api/v2/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });


  describe('Create and own a group with  an empty role', () => {
    it('should return Role can not be empty', (done) => {
      const group = {
        name: 'epic group', role: '', ownerId: newUser + 1,
      };
      chai.request(server)
        .post('/api/v2/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Role can not be empty');
          done();
        });
    });
  });

  describe('Create and own a group with  an invalid role', () => {
    it('should return an error message', (done) => {
      const group = {
        name: 'epic group', role: 'adminoppp', ownerId: newUser + 1,
      };
      chai.request(server)
        .post('/api/v2/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });

  describe('Create and own a group with  an empty name', () => {
    it('should return Group name can not be empty', (done) => {
      const group = {
        name: '', role: 'admin', ownerId: newUser + 1,
      };
      chai.request(server)
        .post('/api/v2/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Group name can not be empty');
          done();
        });
    });
  });

  describe('Create and own a group with  a name the User has been created previously', () => {
    it('should return an error message', (done) => {
      const group = {
        name: newGroupName, role: 'admin', ownerId: newUser + 1,
      };
      chai.request(server)
        .post('/api/v2/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api/v2/groups', () => {
  describe('When a user tries to retrieve all groups', () => {
    it('it should return an object of status and data array', (done) => {
      chai.request(server)
        .get('/api/v2/groups')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
});


after(async () => {
  await deleteTable('users');
  await deleteTable('groups');
});
