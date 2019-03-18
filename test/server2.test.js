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
  const text = 'INSERT INTO users (email,password,first_name,last_name,mobile) VALUES ($1,$2,$3,$4,$5);';
  const values = [email, 'password', 'amaobi', 'obikobe', '0803297'];

  try {
    return await db.query(text, values);
  } catch (error) {
    return error;
  }
}

before(async () => {
  createUser('mikenit50@gmail.com');
  createUser('aobikobe@gmail.com');
});

after(async () => {
  deleteTable('users');
  deleteTable('groups');  
});
describe('POST /api/v2/groups', () => {
  describe('Create and own a group with valid details', () => {
    const group = {
      name: 'epic group', role: 'admin', ownerId: 3,
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
    it('should return a object', (done) => {
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
    it('should return a object', (done) => {
      const group = {
        name: 'epic group', role: 'admin', ownerId: 90,
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
    it('should return a object', (done) => {
      const group = {
        name: 'epic group', role: '', ownerId: 1,
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
    it('should return a object', (done) => {
      const group = {
        name: 'epic group', role: 'adminoppp', ownerId: 1,
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
    it('should return a object', (done) => {
      const group = {
        name: '', role: 'admin', ownerId: 1,
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
    it('should return a object', (done) => {
      const group = {
        name: 'lfcfanpage', role: 'admin', ownerId: 1,
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
