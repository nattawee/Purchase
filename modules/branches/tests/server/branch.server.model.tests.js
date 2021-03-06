'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Branch = mongoose.model('Branch');

/**
 * Globals
 */
var user,
  branch,
  branch2;

/**
 * Unit tests
 */
describe('Branch Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      branch = new Branch({
        name: 'Branch Name',
        user: user
      });

      branch2 = new Branch({
        name: 'Branch Name',
        user: user
      });
      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return branch.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      branch.name = '';

      return branch.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save dupplicate name', function (done) {

      return branch.save(function (err) {
        should.not.exist(err);
        branch2.save(function (err) {
          should.exist(err);
          done();
        });

      });
    });
  });

  afterEach(function (done) {
    Branch.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
