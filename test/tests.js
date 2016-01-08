var unitsFromString = require('../src/index');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

describe('argument checking', function() {
  it('should return undefined if no arguments are supplied', function() {
    expect(unitsFromString()).to.equal(undefined);
  });
  it('should return an error if argument isnt a string', function() {
    (function() {
      unitsFromString({});
    }).should.throw(Error);
  });
  it('should return empty array if no results are found', function() {
    var results = unitsFromString('might be some units here, who knows?');
    expect(results).to.be.empty;
  });
});

describe('unit types', function() {
  it('should match absolute units', function() {
    var results = unitsFromString('-1000px foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('-1000px');
    expect(results[0].unit).to.equal('px');
    expect(results[0].type).to.equal('absolute');
  });

  it('should match percent units', function() {
    var results = unitsFromString('100.5% foo bar');
    console.log(results)
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('100.5%');
    expect(results[0].unit).to.equal('%');
    expect(results[0].type).to.equal('percentage');
  });

  it('should match viewport units', function() {
    var results = unitsFromString('100vh foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('100vh');
    expect(results[0].unit).to.equal('vh');
    expect(results[0].type).to.equal('viewport');
  });

  it('should match relative units', function() {
    var results = unitsFromString('100rem foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('100rem');
    expect(results[0].unit).to.equal('rem');
    expect(results[0].type).to.equal('relative');
  });

  it('should match unitless value', function() {
    var results = unitsFromString('100 foo bar');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(1);
    expect(results[0].match).to.equal('100');
    expect(results[0].unit).to.equal(null);
    expect(results[0].type).to.equal('unitless');
  });
});

describe('match multiple unit types', function() {
  it('should match absolute units, percentage units and unitless', function() {
    var results = unitsFromString('1000.25px foo 100% bar 200');
    expect(results).to.not.equal(undefined);
    expect(results).to.have.length(3);
    // absolute
    expect(results[0].match).to.equal('1000.25px');
    expect(results[0].unit).to.equal('px');
    expect(results[0].type).to.equal('absolute');
    expect(results[0].index).to.equal(0);
    // percentage
    expect(results[1].match).to.equal('100%');
    expect(results[1].unit).to.equal('%');
    expect(results[1].type).to.equal('percentage');
    expect(results[1].index).to.equal(14);
    // unitless
    expect(results[2].match).to.equal('200');
    expect(results[2].unit).to.equal(null);
    expect(results[2].type).to.equal('unitless');
    expect(results[2].index).to.equal(23);
  });
});
