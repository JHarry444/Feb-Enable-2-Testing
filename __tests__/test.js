const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('Basic JS tests', () => {
  it('should equal 2', () => {
    expect(1 + 1).to.equal(2);
  });

  it.skip('should not equal 2', () => {
    expect(1 + 2).to.equal(2);
  });
});
