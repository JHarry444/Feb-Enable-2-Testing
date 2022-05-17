const { before, describe, it } = require('mocha');
const chai = require('chai');

const { expect } = chai;
const chaiHttp = require('chai-http');
const server = require('../app');
const { kitten } = require('../db');

chai.use(chaiHttp);

describe('CRUD testing', () => {
  before(async () => {
    await kitten.sync({ force: true }); // force it to recreate the table
    await kitten.create({
      name: 'Puss',
      age: 12,
      breed: 'Scottish shorthair',
      cuteness: 9,
    });
  });

  it('should GET a kitten', (done) => {
    chai.request(server).get('/kitten/get/1').end((err, res) => {
      // eslint-disable-next-line no-unused-expressions
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        id: 1,
        name: 'Puss',
        age: 12,
        breed: 'Scottish shorthair',
        cuteness: 9,
      });
      return done();
    });
  });

  it('should POST a kitten', (done) => {
    chai.request(server).post('/kitten/create').send({
      name: 'Jess',
      age: 68,
      breed: 'Black and WHite',
      cuteness: 10,
    }).end((err, res) => {
      // eslint-disable-next-line no-unused-expressions
      expect(err).to.be.null;
      expect(res.status).to.equal(201);
      expect(res.body).to.include({
        id: 2,
        name: 'Jess',
        age: 68,
        breed: 'Black and WHite',
        cuteness: 10,
      });
      return done();
    });
  });
});
