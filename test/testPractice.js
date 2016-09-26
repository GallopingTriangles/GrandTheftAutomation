import { assert, expect } from 'chai';

var assert = chai.assert;
var expect = chai.expect;


describe('Array', function() {

  it('should start empty', function() {
    var arr = [];
    assert.equal(arr.length, 0, 'Array length was not 0');
  });
  
});