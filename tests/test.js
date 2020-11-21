const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../examples/index');

chai.use(chaiHttp);
chai.should();

describe("Before middleware", () => {
  describe("GET /", () => {
    it("should have 418 status", (done) => {
      chai.request(app).get('/').end((err, res) => {
        res.should.have.status(418);
        done();
      });
    });
  });
  describe("GET /404", () => {
    it("should have 200 status", (done) => {
      chai.request(app).get('/404').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
