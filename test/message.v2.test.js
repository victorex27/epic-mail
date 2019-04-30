import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import server from '../src/server';

use(chaiHttp);
const userCredentials = {
  email: 'aobikobe@gmail.com',
  password: 'password',
};

/*
function pause(time) {
  return new Promise((resolve) => { setTimeout(resolve, time); });
}
*/
const authenticatedUser = request.agent(server);
let token;

before((done) => {
  const time = 5000;

  setTimeout(

    () => {
      authenticatedUser
        .post('/api/v2/auth/login')
        .send(userCredentials)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          // token = { access_token: res.body.data.token };

          token = `Bearer ${res.body.data.token}`;
          done();
        //  expect('Location', '/home');
        });
    }, time,
  );
});


describe('POST /api/v2/messages', () => {
  describe('When a user tries to send a mail to a valid account', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        to: 'amandaaduchie@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };


      chai.request(server)
        .post('/api/v2/messages').set('Authorization', token)
        // .query(token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data').to.be.a('object');
          done();
        });
    });
  });

  describe('When a user tries to send a message to an account that does not exist', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        to: 'aobikotybe@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      chai.request(server)
        .post('/api/v2/messages').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });

  describe('When a user tries to an empty account field', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        to: '',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      chai.request(server)
        .post('/api/v2/messages').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
  describe('When a user tries to send a message to an invalid account', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        to: 'xyz1@gmai',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      chai.request(server)
        .post('/api/v2/messages').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
  describe('When a user tries to send a message with no subject', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        to: 'amandaaduchie@gmail.com',
        subject: '',
        message: 'How do you do',
      };

      chai.request(server)
        .post('/api/v2/messages').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('subject is required');
          done();
        });
    });
  });
  describe('When a user tries to send a message with no content', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        to: 'amandaaduchie@gmail.com',
        subject: 'How do you do',
        message: '',
      };

      chai.request(server)
        .post('/api/v2/messages').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('message is required');
          done();
        });
    });
  });
  describe('When a user tries to send a message to self', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        to: 'aobikobe@gmail.com',
        subject: 'How do you do',
        message: 'jkhhkhkh',
      };

      chai.request(server)
        .post('/api/v2/messages').set('Authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});
