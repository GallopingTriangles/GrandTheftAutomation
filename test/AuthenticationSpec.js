var chai = require('chai');
var expect = chai.expect;
var axios = require('axios');

describe('Authorization Testing', function() {

  before(function(done) {
    axios.post('/signup', {
      username: 'testExists',
      password: 'testExists',
      email: 'email'
    }).then(function(response) {
      done();
    }).catch(function(err) {
      done();
    })
  })
  
  describe('Establish Identity', function(done) {

    it('should not allow a user to be created, if user already exists', function() {
      axios.post('/signup', {
        username: 'testExists',
        password: 'testExists',
        email: 'email'
      }).then(function(response) {
        expect(response.message).to.equal('Username does not exist.');
        done();
      })
    })

    it('should sign up and create a new user, if username does not exist', function(done) {
      axios.post('/signup', {
        username: 'testUser',
        password: 'testPass',
        email: 'email'
      }).then(function(response) {
        expect(response.status).to.equal(201);
        done();
      })
    })

  })

  describe('Verify Identity', function(done) {

    it('should deny access if username does not exist', function() {
      axios.post('/login', {
        username: 'fakeUser',
        password: 'fakePass'
      }).then(function(response) {
        expect(response.message).to.equal('Username does not exist.');
        done();
      })
    })

    it('should deny access if password does not match password stored on database', function(done) {
      axios.post('/login', {
        username: 'testExists',
        password: 'wrongPass',
        email: 'email'
      }).then(function() {
        expect(response.message).to.equal('Incorrect password.');
        done();
      })
    })

    it('should login user if username and password are correct', function(done) {
      axios.post('/login', {
        username: 'testExists',
        password: 'testExists',
        email: 'email'
      }).then(function(response) {
        expect(response.message).to.equal('User is now logged in with session id.');
        done();
      })
    })

    it('should destroy session when user logs out', function(done) {
      axios.get('/logout')
        .then(function(response) {
          expect(response.message).to.equal('Session destroyed.');
          done();
        })
    })

  })

  describe('Authenticate Identity', function() {

    before(function(done) {
      axios.post('/login', {
        username: 'testExists',
        password: 'testExists'
      }).then(function(response) {
        done();
      }).catch(function(err) {
        done();
      })
    })

    it('should allow access to game when user is logged in', function(done) {
      axios.get('/game')
        .then(function(response) {
          // console.log(response);
          expect(response).to.equal('something random');
          done();
        })
        // .catch(function(err) {
        //   expect(err).to.equal('poop');
        // })
    })

    // after(function(done) {
    //   axios.get('/logout')
    //     .then(function(response) {
    //       done();
    //     })
    //     .catch(function(err) {
    //       done();
    //     })
    // })

    // it('should allow access to game when user is logged in', function() {
    //   axios.get('/game')
    //     .then(function(response) {
    //       expect(typeof response).to.equal('Array')
    //     })
    // })

  })
})