import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/server';


chai.use(chaiHttp);


describe('POST /auth/signup', () => {
  describe('When new User', () => {
    it('it should return 201 for successful registration', (done) => {
      const request = {
        email: 'aobikobe@gmail.com', firstName: 'Amaobi', lastName: 'Obikobe', password: 'paswword',
      };
      const response = {};

      const res = server.signUp(request, response);

      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('firstname');
      done();
    });
  });

  describe('When an already existing email address is used ', () => {
    it('it should return status: 409 ', (done) => {
      const request = {
        email: 'victorex27', firstName: 'Amanda', lastName: 'Aduchie', password: 'password',
      };
      const response = {};

      const res = route.signUp(request, response);

      res.should.have.status(201);
      res.body.should.be.a('string');
      done();
    });
  });
});
