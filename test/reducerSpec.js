import { expect } from 'chai';
import reducer from '../src/client/app/reducers/reducer';

describe('reducer function', function() {

  it('should be a function', function() {
    expect(reducer).to.be.a('function');
  });

})