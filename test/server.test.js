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

describe('POST /api/v1/messages', () => {
  describe('When a user tries to send a message with a valid account', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'aob@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      chai.request(server)
        .post('/api/v1/messages')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
  describe('When a user tries to send a message with an invalid account', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'xyz1@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      chai.request(server)
        .post('/api/v1/messages')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages', () => {
  describe('When a user tries to retrieve a message with a valid account', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        email: 'aobikobe@gmail.com',
      };

      chai.request(server)
        .get('/api/v1/messages')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
  describe('When a user tries to retrieve a message with an invalid account', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        email: '123@gmail.com',
      };
      chai.request(server)
        .get('/api/v1/messages')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/sent', () => {
  describe('When a user tries to retrieve a sent message with a valid account', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        email: 'aobikobe@gmail.com',
      };

      chai.request(server)
        .get('/api/v1/messages/sent')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
  describe('When a user tries to retrieve a sent message with an invalid account', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        email: '123@gmail.com',
      };
      chai.request(server)
        .get('/api/v1/messages/sent')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/unread', () => {
  describe('When a user tries to retrieve an unread message with a valid account', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        email: 'aobikobe@gmail.com',
      };

      chai.request(server)
        .get('/api/v1/messages/unread')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
  describe('When a user tries to retrieve an unread message with an invalid account', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        email: '123@gmail.com',
      };
      chai.request(server)
        .get('/api/v1/messages/unread')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/:id', () => {
  describe('When a user tries to retrieve a valid message id', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        id: 1,
      };

      chai.request(server)
        .get('/api/v1/messages/2')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
  describe('When a user tries to retrieve an invalid message', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        id: '',
      };
      chai.request(server)
        .get('/api/v1/messages/90')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});

describe('DELETE /api/v1/messages/:id', () => {
  describe('When a user tries to delete a valid message id', () => {
    it('should return an object with the status and data', (done) => {
      const data = {
        id: 1,
      };

      chai.request(server)
        .delete('/api/v1/messages/2')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
  describe('When a user tries to delete an invalid message', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        id: '',
      };
      chai.request(server)
        .delete('/api/v1/messages/90')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});


describe('GET /api/v1/home', () => {
  describe('When a user tries to access an unspecified resource', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        id: '',
      };
      chai.request(server)
        .get('/api/v1/victor')
        .send(data)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(404);
          expect(res.body).to.have.property('error').to.be.a('string').equal('resource not found');
          done();
        });
    });
  });
});
