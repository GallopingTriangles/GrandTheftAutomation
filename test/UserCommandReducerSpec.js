import { expect } from 'chai';
import userCommand from '../src/client/app/reducers/UserCommand.js';
import createCommand from '../src/client/app/actions/UserCommandAction.js';

describe('userCommand reducer function', function() {

  describe('userCommand', () => {

    it('should return an object', function() {
      var action = {
        type: 'INPUT_COMMAND',
        command: 'Hello, World!'
      };
      var result = userCommand({}, action);
      expect(result).to.be.an('object');
    });

    it('should return an initial state object if state is undefined', function() {
      var action = {
        type: 'INPUT_COMMAND',
        command: 'Hello, World!'
      };
      var result = userCommand(undefined, action);
      expect(result).to.be.an('object');
    })

    it('should have a command property', function() {
      var action = {
        type: 'INPUT_COMMAND',
        command: 'Hello, World!'
      };
      var result = userCommand(undefined, action);
      expect(result.command).to.not.be.undefined;
    })

    it('should not mutate the original state', function() {
      var state = { command: 'Sup foo' };
      var action = {
        type: 'INPUT_COMMAND',
        command: 'Hello, World!'
      }
      var result = userCommand(state, action);
      expect(state).to.not.equal(result);
      expect(state).to.deep.equal({ command: 'Sup foo' });
    });
  })

  describe('adding a command', () => {

    it('should handle "INPUT_COMMAND" actions', () => {
      var action = createCommand('New command');
      var result = userCommand(undefined, action);
      expect(result).to.deep.equal({ command: 'New command' });
    })

    it('should return original state for invalid action types', () => {
      var action = { type: 'INCREMENT', value: 0 };
      var state = { command: 'Hello, World!' };
      var result = userCommand(state, action);
      expect(result).to.deep.equal(state);
    })
  })

})