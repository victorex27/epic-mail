import { expect } from 'chai';
import User from '../src/models/user';


describe('User', () => {
  describe('create()', () => {
    it('should return a new User Object', (done) => {
      const data = {
        email: 'aobx@gmail.com',
        firstName: 'Amaobi',
        lastName: 'Obikobe',
        password: 'paswword',
      };

      const user = User.create(data);

      expect(user).to.have.property('id').to.be.an('number');
      expect(user).to.have.property('email').to.be.a('string');
      expect(user).to.have.property('password').to.be.a('string');
      expect(user).to.have.property('firstName').to.be.a('string');
      expect(user).to.have.property('lastName').to.be.a('string');


      done();
    });
  });
  describe('create()', () => {
    it('should return One or more fields are empty', (done) => {
      const data = {
        email: '', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword',
      };
      const user = User.create(data);

      expect(user).to.have.property('error').to.be.a('string').equal('One or more fields are empty');
      done();
    });
  });
  describe('', () => {
    it('should return User already exists', (done) => {
      const data = {
        email: 'aobikobe@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword',
      };
      const user = User.create(data);
      expect(user).to.have.property('error').to.be.a('string').equal('User already exists');
      done();
    });
  });
  describe('findOne(\'aobikobe@gmail.com\')', () => {
    it('should return an array of the given user', (done) => {
      const email = 'aobikobe@gmail.com';
      const user = User.findOne(email);
      expect(user).to.have.property('id').to.be.an('number');
      expect(user).to.have.property('email').to.be.a('string');
      expect(user).to.have.property('password').to.be.a('string');
      expect(user).to.have.property('firstName').to.be.a('string');
      expect(user).to.have.property('lastName').to.be.a('string');
      done();
    });
  });
  describe('findOne(\'amanda@gmail.com\')', () => {
    it('should return User already exists', (done) => {
      const email = 'amanda@gmail.com';
      const user = User.findOne(email);
      expect(user).to.have.property('error').to.be.a('string').equal('User does not exists');
      done();
    });
  });
  describe('findOne()', () => {
    it('should return Invalid parameter', (done) => {
      const user = User.findOne();
      expect(user).to.have.property('error').to.be.a('string').equal('One or more fields are empty');
      done();
    });
  });
});
