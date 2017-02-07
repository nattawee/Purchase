'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Aquisition = mongoose.model('Aquisition');

/**
 * Globals
 */
var user,
  aquisition;

/**
 * Unit tests
 */
describe('Aquisition Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      aquisition = new Aquisition({
        name: 'Aquisition Name',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return aquisition.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      aquisition.name = '';

      return aquisition.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Aquisition.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
