import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';


use(chaiHttp);


describe('POST /api/v1/auth/signup', () => {
  describe('When a new User Signs Up with an acceptable detail', () => {
    it('should return an object with the status and data', (done) => {
      const user = {
        email: 'emenike@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'password',
      };

      chai.request(server)
        .post('/api/v1/auth/signup')
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
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('User already exists');
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
        .post('/api/v1/auth/signup')
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
        .post('/api/v1/auth/signup')
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
        .post('/api/v1/auth/signup')
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
        .post('/api/v1/auth/signup')
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
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string').equals('lastName is required');
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
          expect(res.body).to.have.property('data').to.be.a('object');
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
  describe('When user tries to login with an  empty fields', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: '', password: 'paswword',
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
  describe('When user tries to login with an invalid email address', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'amaobi', password: 'paswword',
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
  describe('When user tries to login with an invalid password', () => {
    it('should return an object with the status and error', (done) => {
      const user = {
        email: 'amaobi', password: 'pasw',
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
  describe('When a user tries to send a message with an account that does not exist', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        from: 'aobikobtye@gmail.com',
        to: 'aobikobe@gmail.com',
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
  describe('When a user tries to send a message to an account that does not exist', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'aobikotybe@gmail.com',
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
  describe('When a user tries to send a message from an invalid account', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        from: 'amaobi',
        to: 'aobikobe@gmail.com',
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
  describe('When a user tries to send a message to an invalid account', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'xyz1@gmai',
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
  describe('When a user tries to send a message with no subject', () => {
    it('should return an object with the status and error', (done) => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'aob@gmail.com',
        subject: '',
        message: 'How do you do',
      };

      chai.request(server)
        .post('/api/v1/messages')
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
        from: 'aobikobe@gmail.com',
        to: 'aob@gmail.com',
        subject: 'How do you do',
        message: '',
      };

      chai.request(server)
        .post('/api/v1/messages')
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
        from: 'aob@gmail.com',
        to: 'aob@gmail.com',
        subject: 'How do you do',
        message: 'jkhhkhkh',
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
      chai.request(server)
        .get('/api/v1/messages')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/sent', () => {
  describe('When a user tries to retrieve a sent message with a valid account', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v1/messages/sent')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/unread', () => {
  describe('When a user tries to retrieve an unread message with a valid account', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v1/messages/unread')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('array');
          done();
        });
    });
  });
});

describe('GET /api/v1/messages/:id', () => {
  describe('When a user tries to retrieve a valid message id', () => {
    it('should return an object with the status and data', (done) => {
      chai.request(server)
        .get('/api/v1/messages/2')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('object');
          done();
        });
    });
  });
  describe('When a user tries to retrieve a message that does not exists', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/messages/90')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
  describe('When a user tries to retrieve a message that has an invalid id', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/messages/amaobi')
        .send()
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
      chai.request(server)
        .delete('/api/v1/messages/1')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(200);
          expect(res.body).to.have.property('data').to.be.a('object');
          done();
        });
    });
  });
  describe('When a user tries to delete a message that does not exist', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .delete('/api/v1/messages/90')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
  describe('When a user tries to delete an invalid message', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .delete('/api/v1/messages/amaobi')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error').to.be.a('string');
          done();
        });
    });
  });
});

describe('GET /api-docs', () => {
  describe('When a user tries to access an unspecified resource', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api-docs')
        .send()
        .end((err, res) => {
          expect(res).to.have.property('status').equal(200);
          done();
        });
    });
  });
});


describe('GET /api/v1/victor', () => {
  describe('When a user tries to access an unspecified resource', () => {
    it('should return an object with the status and error', (done) => {
      chai.request(server)
        .get('/api/v1/victor')
        .send()
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal(404);
          expect(res.body).to.have.property('error').to.be.a('string').equal('resource not found');
          done();
        });
    });
  });
});
