'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Safekeep = mongoose.model('Safekeep'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  safekeep;

/**
 * Safekeep routes tests
 */
describe('Safekeep CRUD tests', function () {

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

    // Save a user to the test db and create new Safekeep
    user.save(function () {
      safekeep = {
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
        }
      };

      done();
    });
  });

  it('should be able to save a Safekeep if logged in', function (done) {
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

        // Save a new Safekeep
        agent.post('/api/safekeeps')
          .send(safekeep)
          .expect(200)
          .end(function (safekeepSaveErr, safekeepSaveRes) {
            // Handle Safekeep save error
            if (safekeepSaveErr) {
              return done(safekeepSaveErr);
            }

            // Get a list of Safekeeps
            agent.get('/api/safekeeps')
              .end(function (safekeepsGetErr, safekeepsGetRes) {
                // Handle Safekeeps save error
                if (safekeepsGetErr) {
                  return done(safekeepsGetErr);
                }

                // Get Safekeeps list
                var safekeeps = safekeepsGetRes.body;

                // Set assertions
                (safekeeps[0].user._id).should.equal(userId);
                (safekeeps[0].name).should.match('Safekeep name');
                (safekeeps[0].resourceno).should.match('test');
                (safekeeps[0].certno).should.match('test');   
                

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Safekeep if not logged in', function (done) {
    agent.post('/api/safekeeps')
      .send(safekeep)
      .expect(403)
      .end(function (safekeepSaveErr, safekeepSaveRes) {
        // Call the assertion callback
        done(safekeepSaveErr);
      });
  });

  it('should not be able to save an Safekeep if no name is provided', function (done) {
    // Invalidate name field
    safekeep.name = '';

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

        // Save a new Safekeep
        agent.post('/api/safekeeps')
          .send(safekeep)
          .expect(400)
          .end(function (safekeepSaveErr, safekeepSaveRes) {
            // Set message assertion
            (safekeepSaveRes.body.message).should.match('Please fill Safekeep name');

            // Handle Safekeep save error
            done(safekeepSaveErr);
          });
      });
  });

  it('should be able to update an Safekeep if signed in', function (done) {
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

        // Save a new Safekeep
        agent.post('/api/safekeeps')
          .send(safekeep)
          .expect(200)
          .end(function (safekeepSaveErr, safekeepSaveRes) {
            // Handle Safekeep save error
            if (safekeepSaveErr) {
              return done(safekeepSaveErr);
            }

            // Update Safekeep name
            safekeep.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Safekeep
            agent.put('/api/safekeeps/' + safekeepSaveRes.body._id)
              .send(safekeep)
              .expect(200)
              .end(function (safekeepUpdateErr, safekeepUpdateRes) {
                // Handle Safekeep update error
                if (safekeepUpdateErr) {
                  return done(safekeepUpdateErr);
                }

                // Set assertions
                (safekeepUpdateRes.body._id).should.equal(safekeepSaveRes.body._id);
                (safekeepUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Safekeeps if not signed in', function (done) {
    // Create new Safekeep model instance
    var safekeepObj = new Safekeep(safekeep);

    // Save the safekeep
    safekeepObj.save(function () {
      // Request Safekeeps
      request(app).get('/api/safekeeps')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Safekeep if not signed in', function (done) {
    // Create new Safekeep model instance
    var safekeepObj = new Safekeep(safekeep);

    // Save the Safekeep
    safekeepObj.save(function () {
      request(app).get('/api/safekeeps/' + safekeepObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', safekeep.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Safekeep with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/safekeeps/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Safekeep is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Safekeep which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Safekeep
    request(app).get('/api/safekeeps/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Safekeep with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Safekeep if signed in', function (done) {
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

        // Save a new Safekeep
        agent.post('/api/safekeeps')
          .send(safekeep)
          .expect(200)
          .end(function (safekeepSaveErr, safekeepSaveRes) {
            // Handle Safekeep save error
            if (safekeepSaveErr) {
              return done(safekeepSaveErr);
            }

            // Delete an existing Safekeep
            agent.delete('/api/safekeeps/' + safekeepSaveRes.body._id)
              .send(safekeep)
              .expect(200)
              .end(function (safekeepDeleteErr, safekeepDeleteRes) {
                // Handle safekeep error error
                if (safekeepDeleteErr) {
                  return done(safekeepDeleteErr);
                }

                // Set assertions
                (safekeepDeleteRes.body._id).should.equal(safekeepSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Safekeep if not signed in', function (done) {
    // Set Safekeep user
    safekeep.user = user;

    // Create new Safekeep model instance
    var safekeepObj = new Safekeep(safekeep);

    // Save the Safekeep
    safekeepObj.save(function () {
      // Try deleting Safekeep
      request(app).delete('/api/safekeeps/' + safekeepObj._id)
        .expect(403)
        .end(function (safekeepDeleteErr, safekeepDeleteRes) {
          // Set message assertion
          (safekeepDeleteRes.body.message).should.match('User is not authorized');

          // Handle Safekeep error error
          done(safekeepDeleteErr);
        });

    });
  });

  it('should be able to get a single Safekeep that has an orphaned user reference', function (done) {
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

          // Save a new Safekeep
          agent.post('/api/safekeeps')
            .send(safekeep)
            .expect(200)
            .end(function (safekeepSaveErr, safekeepSaveRes) {
              // Handle Safekeep save error
              if (safekeepSaveErr) {
                return done(safekeepSaveErr);
              }

              // Set assertions on new Safekeep
              (safekeepSaveRes.body.name).should.equal(safekeep.name);
              should.exist(safekeepSaveRes.body.user);
              should.equal(safekeepSaveRes.body.user._id, orphanId);

              // force the Safekeep to have an orphaned user reference
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

                    // Get the Safekeep
                    agent.get('/api/safekeeps/' + safekeepSaveRes.body._id)
                      .expect(200)
                      .end(function (safekeepInfoErr, safekeepInfoRes) {
                        // Handle Safekeep error
                        if (safekeepInfoErr) {
                          return done(safekeepInfoErr);
                        }

                        // Set assertions
                        (safekeepInfoRes.body._id).should.equal(safekeepSaveRes.body._id);
                        (safekeepInfoRes.body.name).should.equal(safekeep.name);
                        should.equal(safekeepInfoRes.body.user, undefined);

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
      Safekeep.remove().exec(done);
    });
  });
});
