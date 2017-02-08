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
describe('Aquisition Model Unit Tests:', function () {
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
      aquisition = new Aquisition({
        from1: {
          nta: {
            assetssum: 1,
            assetsintangible: 1,
            debtssum: 1,
            shareholder: 1,
            ntasum: 1

          },
          acqodis: 1,
          ntalisted: 1
        },
        from2: {
          netoperating: 1,
          ratio: 1,
          netcompany: 1
        },
        from3: {
          amount: 1,
          assetscompany: 1
        },
        from4: {
          sharespay: 1,
          sharespaycompany: 1
        },

        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return aquisition.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from1 nta assetssum', function (done) {
      aquisition.from1.nta.assetssum = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from1 nta assetsintangible', function (done) {
      aquisition.from1.nta.assetsintangible = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from1 nta debtssum', function (done) {
      aquisition.from1.nta.debtssum = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from1 nta ntasum', function (done) {
      aquisition.from1.nta.ntasum = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from1 acqodis', function (done) {
      aquisition.from1.acqodis = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from1 ntalisted', function (done) {
      aquisition.from1.ntalisted = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from2 netoperating', function (done) {
      aquisition.from2.netoperating = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from2 ratio', function (done) {
      aquisition.from2.ratio = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from2 netcompany', function (done) {
      aquisition.from2.netcompany = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from3 amount', function (done) {
      aquisition.from3.amount = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from3 assetscompany', function (done) {
      aquisition.from3.assetscompany = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from4 sharespay', function (done) {
      aquisition.from4.sharespay = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without from4 sharespaycompany', function (done) {
      aquisition.from4.sharespaycompany = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      aquisition.from1 = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function (done) {
      aquisition.from1 = '';

      return aquisition.save(function (err) {
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function (done) {
    Aquisition.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
