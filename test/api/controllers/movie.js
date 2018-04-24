var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function () {
    describe('hello_world', function () {
        describe('GET /movie', function () {
            it('should return a list of all movies', function (done) {
                request(server)
                    .get('/movie')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        res.body.should.not.eql('');
                        done();
                    });
            });
        });
    });
});