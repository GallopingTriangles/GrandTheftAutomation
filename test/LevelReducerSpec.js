import { expect } from 'chai';
import level from '../src/client/app/reducers/Level';
import changeLevel from '../src/client/app/actions/changeLevel';

describe('Level change reducer', () => {

  it('should default to level 0 for invalid actions', () => {
    var action = {
      type: 'INPUT_COMMAND',
      level: 1
    }
    var result = level(undefined, action);
    expect(result).to.equal(0);
  })

  it('should accept an action with type "CHANGE_LEVEL"', () => {
    var action = {
      type: "CHANGE_LEVEL",
      level: 1
    }
    var result = level(undefined, action);
    expect(result).to.be.a('number');
  })

  it('should change the level corresponding to the action', () => {
    var action = {
      type: 'CHANGE_LEVEL',
      level: 1
    }
    var result = level(undefined, action);
    expect(result).to.equal(1);
  })

  it('should change the level in response to multiple actions', () => {
    var result;
    var action_1 = {
      type: 'CHANGE_LEVEL',
      level: 1
    };
    var action_2 = {
      type: 'CHANGE_LEVEL',
      level: 2
    }
    result = level(result, action_1);
    expect(result).to.equal(1);
    result = level(result, action_2);
    expect(result).to.equal(2);
  });

  describe('Level change reducer and changeLevel action creator', () => {

    it('should change level appropriately with the created action', () => {
      var action = changeLevel(1);
      var result = level(undefined, action);
      expect(result).to.equal(1);
    });

    it('should change levels appropriately with multiple actions', () => {
      var result;
      var action_1 = changeLevel(1);
      var action_2 = changeLevel(2);
      result = level(result, action_1);
      expect(result).to.equal(1);
      result = level(result, action_2);
      expect(result).to.equal(2);
    })
  })

})