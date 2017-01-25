'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Purchase = mongoose.model('Purchase');

/**
 * Globals
 */
var user,
  purchase;

/**
 * Unit tests
 */
describe('Purchase Model Unit Tests:', function () {
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
      purchase = new Purchase({
        docno: 'Purchase Docno',
        client: 'cyber',
        buyer: 'nong',
        pursector: 'pursector',
        remark: ['remark1','remark2'],
        webbam:{
          datesub:Date.now(),
          onweb:Date.now(),
          refno:'no',
          url:'url'
        },
        ncc:{
          nccdate:Date.now(),
          nccno:'011'
        },
        items: [{
          productcode: 'N100',
          product: 'book',
          qty: 1,
          unitprice: 1,
          amount: 100,
          totalamount: 100
        }, {
          productcode: 'N100',
          product: 'pen',
          qty: 1,
          unitprice: 1,
          amount: 200,
          totalamount: 200
        }],
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return purchase.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without docno', function (done) {
      purchase.docno = '';

      return purchase.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without buyer', function (done) {
      purchase.buyer = '';

      return purchase.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without productcode', function (done) {
      purchase.items[0].productcode = '';

      return purchase.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without pursector', function (done) {
      purchase.pursector = '';

      return purchase.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without client', function (done) {
      purchase.client = null;

      return purchase.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Purchase.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});
