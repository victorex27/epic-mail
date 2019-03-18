import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';
import db from '../src/db';



use(chaiHttp);


async function runScript(name, owner) {
  const text = 'DELETE from groups WHERE name=$1 and owner_id=$2';
  const values = [name, owner];

  try {
    return await db.query(text, values);
  } catch (error) {
    return error;
  }
}


describe('POST /api/v2/groups', () => {
  describe('Create and own a group with valid details', () => {
    const group = {
      name: 'epic group', role: 'admin', ownerId: 1,
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

    after(async () => {
      const res = runScript(group.name, group.ownerId);

      
    });
    before(async () => {
      const res = runScript(group.name, group.ownerId);

      
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
