import { expect } from 'chai';
import level from '../src/client/app/reducers/Level';

describe('Level switch reducer', () => {

  it('should default to level 0 for invalid actions', () => {
    var action = {
      type: 'INPUT_COMMAND',
      level: 1
    }
    var result = level(undefined, action);
    expect(result).to.equal(0);
  })

  it('should accept an action with type "SWITCH_LEVEL"', () => {
    var action = {
      type: "SWITCH_LEVEL",
      level: 1
    }
    var result = level(undefined, action);
    expect(result).to.be.a('number');
  })

  it('should change the level corresponding to the action', () => {
    var action = {
      type: 'SWITCH_LEVEL',
      level: 1
    }
    var result = level(undefined, action);
    expect(result).to.equal(1);
  })

  it('should change the level in response to multiple actions', () => {
    var result;
    var action_1 = {
      type: 'SWITCH_LEVEL',
      level: 1
    };
    var action_2 = {
      type: 'SWITCH_LEVEL',
      level: 2
    }
    result = level(result, action_1);
    expect(result).to.equal(1);
    result = level(result, action_2);
    expect(result).to.equal(2);
  });

})