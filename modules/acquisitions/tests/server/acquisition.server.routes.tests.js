'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Acquisition = mongoose.model('Acquisition'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  acquisition;

/**
 * Acquisition routes tests
 */
describe('Acquisition CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Acquisition
    user.save(function () {
      acquisition = {
        buyer: 'buyer',
        seller: 'seller',
        nta: {
          // เกณฑ์มูลค่าสินทรัพย์ที่มีตัวตนสุทธิ
          obtaining: 1,
          ptyvalue: 1,
          ptvcomapany: 1
        },
        forecast: {
          //  เกณฑ์กำไรสุทธ
          entryacq: 1,
          net: 1,
          totalnet: 1,
        },
        ttvconsider: {
          // เกณฑ์มูลค่ารวมของสิ่งตอบแทน
          valueofaset: 1,
          issuedost: 1
        },
        maximum:1,
      };

      done();
    });
  });

  it('should be able to save a Acquisition if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Acquisition
        agent.post('/api/acquisitions')
          .send(acquisition)
          .expect(200)
          .end(function (acquisitionSaveErr, acquisitionSaveRes) {
            // Handle Acquisition save error
            if (acquisitionSaveErr) {
              return done(acquisitionSaveErr);
            }

            // Get a list of Acquisitions
            agent.get('/api/acquisitions')
              .end(function (acquisitionsGetErr, acquisitionsGetRes) {
                // Handle Acquisitions save error
                if (acquisitionsGetErr) {
                  return done(acquisitionsGetErr);
                }

                // Get Acquisitions list
                var acquisitions = acquisitionsGetRes.body;

                // Set assertions
                (acquisitions[0].user._id).should.equal(userId);
                (acquisitions[0].buyer).should.match('buyer');
                (acquisitions[0].maximum).should.equal(1);
                

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Acquisition if not logged in', function (done) {
    agent.post('/api/acquisitions')
      .send(acquisition)
      .expect(403)
      .end(function (acquisitionSaveErr, acquisitionSaveRes) {
        // Call the assertion callback
        done(acquisitionSaveErr);
      });
  });

  it('should not be able to save an Acquisition if no maximum is provided', function (done) {
    // Invalidate name field
    acquisition.maximum = null;

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Acquisition
        agent.post('/api/acquisitions')
          .send(acquisition)
          .expect(400)
          .end(function (acquisitionSaveErr, acquisitionSaveRes) {
            // Set message assertion
            (acquisitionSaveRes.body.message).should.match('Please fill Acquisition maximum');

            // Handle Acquisition save error
            done(acquisitionSaveErr);
          });
      });
  });

  it('should be able to update an Acquisition if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Acquisition
        agent.post('/api/acquisitions')
          .send(acquisition)
          .expect(200)
          .end(function (acquisitionSaveErr, acquisitionSaveRes) {
            // Handle Acquisition save error
            if (acquisitionSaveErr) {
              return done(acquisitionSaveErr);
            }

            // Update Acquisition buyer
            acquisition.buyer = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Acquisition
            agent.put('/api/acquisitions/' + acquisitionSaveRes.body._id)
              .send(acquisition)
              .expect(200)
              .end(function (acquisitionUpdateErr, acquisitionUpdateRes) {
                // Handle Acquisition update error
                if (acquisitionUpdateErr) {
                  return done(acquisitionUpdateErr);
                }

                // Set assertions
                (acquisitionUpdateRes.body._id).should.equal(acquisitionSaveRes.body._id);
                (acquisitionUpdateRes.body.buyer).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Acquisitions if not signed in', function (done) {
    // Create new Acquisition model instance
    var acquisitionObj = new Acquisition(acquisition);

    // Save the acquisition
    acquisitionObj.save(function () {
      // Request Acquisitions
      request(app).get('/api/acquisitions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Acquisition if not signed in', function (done) {
    // Create new Acquisition model instance
    var acquisitionObj = new Acquisition(acquisition);

    // Save the Acquisition
    acquisitionObj.save(function () {
      request(app).get('/api/acquisitions/' + acquisitionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('buyer', acquisition.buyer);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Acquisition with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/acquisitions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Acquisition is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Acquisition which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Acquisition
    request(app).get('/api/acquisitions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Acquisition with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Acquisition if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Acquisition
        agent.post('/api/acquisitions')
          .send(acquisition)
          .expect(200)
          .end(function (acquisitionSaveErr, acquisitionSaveRes) {
            // Handle Acquisition save error
            if (acquisitionSaveErr) {
              return done(acquisitionSaveErr);
            }

            // Delete an existing Acquisition
            agent.delete('/api/acquisitions/' + acquisitionSaveRes.body._id)
              .send(acquisition)
              .expect(200)
              .end(function (acquisitionDeleteErr, acquisitionDeleteRes) {
                // Handle acquisition error error
                if (acquisitionDeleteErr) {
                  return done(acquisitionDeleteErr);
                }

                // Set assertions
                (acquisitionDeleteRes.body._id).should.equal(acquisitionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Acquisition if not signed in', function (done) {
    // Set Acquisition user
    acquisition.user = user;

    // Create new Acquisition model instance
    var acquisitionObj = new Acquisition(acquisition);

    // Save the Acquisition
    acquisitionObj.save(function () {
      // Try deleting Acquisition
      request(app).delete('/api/acquisitions/' + acquisitionObj._id)
        .expect(403)
        .end(function (acquisitionDeleteErr, acquisitionDeleteRes) {
          // Set message assertion
          (acquisitionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Acquisition error error
          done(acquisitionDeleteErr);
        });

    });
  });

  it('should be able to get a single Acquisition that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Acquisition
          agent.post('/api/acquisitions')
            .send(acquisition)
            .expect(200)
            .end(function (acquisitionSaveErr, acquisitionSaveRes) {
              // Handle Acquisition save error
              if (acquisitionSaveErr) {
                return done(acquisitionSaveErr);
              }

              // Set assertions on new Acquisition
              (acquisitionSaveRes.body.buyer).should.equal(acquisition.buyer);
              should.exist(acquisitionSaveRes.body.user);
              should.equal(acquisitionSaveRes.body.user._id, orphanId);

              // force the Acquisition to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Acquisition
                    agent.get('/api/acquisitions/' + acquisitionSaveRes.body._id)
                      .expect(200)
                      .end(function (acquisitionInfoErr, acquisitionInfoRes) {
                        // Handle Acquisition error
                        if (acquisitionInfoErr) {
                          return done(acquisitionInfoErr);
                        }

                        // Set assertions
                        (acquisitionInfoRes.body._id).should.equal(acquisitionSaveRes.body._id);
                        (acquisitionInfoRes.body.buyer).should.equal(acquisition.buyer);
                        should.equal(acquisitionInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Acquisition.remove().exec(done);
    });
  });
});
