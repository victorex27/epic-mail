import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';


use(chaiHttp);

describe('POST /groups', () => {
  describe('Create and own a group with valid details', () => {
    it('should return a object', (done) => {
      const group = {
        name: 'epic group', role: 'admin', owner: 12233,
      };
      chai.request(server)
        .post('/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data').to.be.a('object');
          done();
        });
    });
  });

  describe('Create and own a group with  an id that already exists', () => {
    it('should return a object', (done) => {
      const group = {
        name: 'epic group', role: 'admin', owner: 12233,
      };
      chai.request(server)
        .post('/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('User id already exists');
          done();
        });
    });
  });

  describe('Create and own a group with  a user id of wrong data type', () => {
    it('should return a object', (done) => {
      const group = {
        name: 'epic group', role: 'admin', owner: 'p',
      };
      chai.request(server)
        .post('/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid User id');
          done();
        });
    });
  });

  describe('Create and own a group with  an empty role', () => {
    it('should return a object', (done) => {
      const group = {
        name: 'epic group', role: '', owner: 12233,
      };
      chai.request(server)
        .post('/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Role value is empty');
          done();
        });
    });
  });

  describe('Create and own a group with  an invalid role', () => {
    it('should return a object', (done) => {
      const group = {
        name: 'epic group', role: 'adminoppp', owner: 12233,
      };
      chai.request(server)
        .post('/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Invalid role');
          done();
        });
    });
  });

  describe('Create and own a group with  an empty role', () => {
    it('should return a object', (done) => {
      const group = {
        name: '', role: 'admin', owner: 12233,
      };
      chai.request(server)
        .post('/groups')
        .send(group)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('Group name can not be empty');
          done();
        });
    });
  });
});
