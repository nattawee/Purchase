'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Acquisition = mongoose.model('Acquisition');

/**
 * Globals
 */
var user,
  acquisition;

/**
 * Unit tests
 */
describe('Acquisition Model Unit Tests:', function () {
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
      acquisition = new Acquisition({
        buyer: 'buyer',
        seller: 'seller',
        nta: {
          // เกณฑ์มูลค่าสินทรัพย์ที่มีตัวตนสุทธิ
          obtaining: 'pt',
          ptyvalue: 'ptv',
          ptvcomapany: 'ptvc'
        },
        forecast: {
          //  เกณฑ์กำไรสุทธ
          entryacq: 'enacq',
          net: 'net',
          totalnet: 'ttnet',
        },
        ttvconsider: {
          // เกณฑ์มูลค่ารวมของสิ่งตอบแทน
          valueofaset: '',
          issuedost:''
        },
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return acquisition.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    // it('should be able to show an error when try to save without name', function (done) {
    //   acquisition.name = '';

    //   return acquisition.save(function (err) {
    //     should.exist(err);
    //     done();
    //   });
    // });
  });

  afterEach(function (done) {
    Acquisition.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
