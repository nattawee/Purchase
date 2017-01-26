'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Construction = mongoose.model('Construction'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  construction;

/**
 * Construction routes tests
 */
describe('Construction CRUD tests', function () {

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

    // Save a user to the test db and create new Construction
    user.save(function () {
      construction = {
        resourceno: 'test',
        certno: 'test',
        name: 'test',
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
        contrac: '',
        operator: '',
        ncc: {
          nccdate: Date.now(),
          nccno: '',
        }
      };

      done();
    });
  });

  it('should be able to save a Construction if logged in', function (done) {
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

        // Save a new Construction
        agent.post('/api/constructions')
          .send(construction)
          .expect(200)
          .end(function (constructionSaveErr, constructionSaveRes) {
            // Handle Construction save error
            if (constructionSaveErr) {
              return done(constructionSaveErr);
            }

            // Get a list of Constructions
            agent.get('/api/constructions')
              .end(function (constructionsGetErr, constructionsGetRes) {
                // Handle Constructions save error
                if (constructionsGetErr) {
                  return done(constructionsGetErr);
                }

                // Get Constructions list
                var constructions = constructionsGetRes.body;

                // Set assertions
                (constructions[0].user._id).should.equal(userId);
                (constructions[0].name).should.match('test');
                (constructions[0].resourceno).should.match('test');
                (constructions[0].certno).should.match('test');                

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Construction if not logged in', function (done) {
    agent.post('/api/constructions')
      .send(construction)
      .expect(403)
      .end(function (constructionSaveErr, constructionSaveRes) {
        // Call the assertion callback
        done(constructionSaveErr);
      });
  });

  it('should not be able to save an Construction if no name is provided', function (done) {
    // Invalidate name field
    construction.name = '';

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

        // Save a new Construction
        agent.post('/api/constructions')
          .send(construction)
          .expect(400)
          .end(function (constructionSaveErr, constructionSaveRes) {
            // Set message assertion
            (constructionSaveRes.body.message).should.match('Please fill name');

            // Handle Construction save error
            done(constructionSaveErr);
          });
      });
  });

  it('should not be able to save an Construction if no resourceno is provided', function (done) {
    // Invalidate name field
    construction.resourceno = '';

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

        // Save a new Construction
        agent.post('/api/constructions')
          .send(construction)
          .expect(400)
          .end(function (constructionSaveErr, constructionSaveRes) {
            // Set message assertion
            (constructionSaveRes.body.message).should.match('Please fill resourceno');

            // Handle Construction save error
            done(constructionSaveErr);
          });
      });
  });

  it('should be able to update an Construction if signed in', function (done) {
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

        // Save a new Construction
        agent.post('/api/constructions')
          .send(construction)
          .expect(200)
          .end(function (constructionSaveErr, constructionSaveRes) {
            // Handle Construction save error
            if (constructionSaveErr) {
              return done(constructionSaveErr);
            }

            // Update Construction name
            construction.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Construction
            agent.put('/api/constructions/' + constructionSaveRes.body._id)
              .send(construction)
              .expect(200)
              .end(function (constructionUpdateErr, constructionUpdateRes) {
                // Handle Construction update error
                if (constructionUpdateErr) {
                  return done(constructionUpdateErr);
                }

                // Set assertions
                (constructionUpdateRes.body._id).should.equal(constructionSaveRes.body._id);
                (constructionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Constructions if not signed in', function (done) {
    // Create new Construction model instance
    var constructionObj = new Construction(construction);

    // Save the construction
    constructionObj.save(function () {
      // Request Constructions
      request(app).get('/api/constructions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Construction if not signed in', function (done) {
    // Create new Construction model instance
    var constructionObj = new Construction(construction);

    // Save the Construction
    constructionObj.save(function () {
      request(app).get('/api/constructions/' + constructionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', construction.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Construction with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/constructions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Construction is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Construction which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Construction
    request(app).get('/api/constructions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Construction with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Construction if signed in', function (done) {
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

        // Save a new Construction
        agent.post('/api/constructions')
          .send(construction)
          .expect(200)
          .end(function (constructionSaveErr, constructionSaveRes) {
            // Handle Construction save error
            if (constructionSaveErr) {
              return done(constructionSaveErr);
            }

            // Delete an existing Construction
            agent.delete('/api/constructions/' + constructionSaveRes.body._id)
              .send(construction)
              .expect(200)
              .end(function (constructionDeleteErr, constructionDeleteRes) {
                // Handle construction error error
                if (constructionDeleteErr) {
                  return done(constructionDeleteErr);
                }

                // Set assertions
                (constructionDeleteRes.body._id).should.equal(constructionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Construction if not signed in', function (done) {
    // Set Construction user
    construction.user = user;

    // Create new Construction model instance
    var constructionObj = new Construction(construction);

    // Save the Construction
    constructionObj.save(function () {
      // Try deleting Construction
      request(app).delete('/api/constructions/' + constructionObj._id)
        .expect(403)
        .end(function (constructionDeleteErr, constructionDeleteRes) {
          // Set message assertion
          (constructionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Construction error error
          done(constructionDeleteErr);
        });

    });
  });

  it('should be able to get a single Construction that has an orphaned user reference', function (done) {
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

          // Save a new Construction
          agent.post('/api/constructions')
            .send(construction)
            .expect(200)
            .end(function (constructionSaveErr, constructionSaveRes) {
              // Handle Construction save error
              if (constructionSaveErr) {
                return done(constructionSaveErr);
              }

              // Set assertions on new Construction
              (constructionSaveRes.body.name).should.equal(construction.name);
              should.exist(constructionSaveRes.body.user);
              should.equal(constructionSaveRes.body.user._id, orphanId);

              // force the Construction to have an orphaned user reference
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

                    // Get the Construction
                    agent.get('/api/constructions/' + constructionSaveRes.body._id)
                      .expect(200)
                      .end(function (constructionInfoErr, constructionInfoRes) {
                        // Handle Construction error
                        if (constructionInfoErr) {
                          return done(constructionInfoErr);
                        }

                        // Set assertions
                        (constructionInfoRes.body._id).should.equal(constructionSaveRes.body._id);
                        (constructionInfoRes.body.name).should.equal(construction.name);
                        should.equal(constructionInfoRes.body.user, undefined);

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
      Construction.remove().exec(done);
    });
  });
});
