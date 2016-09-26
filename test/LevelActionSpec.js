import { expect } from 'chai';
import changeLevel from '../src/client/app/actions/changeLevel';

describe('Action creator for level change', () => {

  it('should return an action object with type "CHANGE_LEVEL"', () => {
    var action = changeLevel(0);
    expect(action).to.be.a('object');
    expect(action.type).to.equal('CHANGE_LEVEL');
  });

  it('should contain a level property', () => {
    var action = changeLevel(0);
    expect(action.level).to.equal(0);
  });

})