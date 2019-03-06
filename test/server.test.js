import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';


use(chaiHttp);


describe('POST /api/v1/auth/signup', () => {
  describe('When a new User Signs Up', () => {
    it('should return an object with the status and data', (done) => {
      const user = {
        email: 'victorex27@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
  describe('When a new User Signs Up', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: '', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});


describe('POST /api/v1/auth/login', () => {
  describe('When a user tries to login with an existing account', () => {
    it('should return an object with the status and data', (done) => {
      const user = {
        email: 'aobikobe@gmail.com', password: 'password',
      };

      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
  describe('When user tries to login with an incorrect account', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'aouiuoiu@gmail.com', password: 'paswword',
      };

      chai.request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});
