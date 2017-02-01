'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Safekeep = mongoose.model('Safekeep');

/**
 * Globals
 */
var user,
  safekeep;

/**
 * Unit tests
 */
describe('Safekeep Model Unit Tests:', function () {
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
      safekeep = new Safekeep({
        resourceno: 'test',
        certno: 'test',
        name: 'Safekeep name',
        local: {
          subdis: 'test',
          dis: 'test',
          provin: 'test'
        },
        jobdes: 'test',
        howtohire: 'test',
        pursector: 'test',
        estimate: {
          amountest: 1,
          dateest: Date.now(),
          approvest: 'test'
        },
        webbam: {
          datesub: Date.now(),
          onweb: Date.now(),
          refno: 'test',
          url: 'test'
        },
        adjust: {
          amountadj: 1,
          dateadj: 'test',
          approvadj: 'test'
        },
        participant: 1,
        contrac: 'test',
        operator: 'test',
        ncc: {
          nccdate: Date.now(),
          nccno: 'test',
        },
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return safekeep.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without resourceno', function (done) {
      safekeep.resourceno = '';

      return safekeep.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      safekeep.name = '';

      return safekeep.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without certno', function (done) {
      safekeep.certno = '';

      return safekeep.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });
  afterEach(function (done) {
    Safekeep.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});