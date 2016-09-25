import { expect } from 'chai';
import userCommand from '../src/client/app/reducers/UserCommand.js';
import createCommand from '../src/client/app/actions/UserCommandAction.js';

describe('userCommand reducer function', function() {

  describe('userCommand', () => {

    it('should return an object', function() {
      var action = {
        type: 'INPUT_COMMAND',
        level: 0,
        command: 'Hello, World!'
      };
      var result = userCommand({}, action);
      expect(result).to.be.an('object');
    });

    it('should return an initial state object if state is undefined', function() {
      var action = {
        type: 'INPUT_COMMAND',
        level: 0,
        command: 'Hello, World!'
      };
      var result = userCommand(undefined, action);
      expect(result).to.be.an('object');
    })

    it('should have a property corresponding to the level', function() {
      var action = {
        type: 'INPUT_COMMAND',
        level: 0,
        command: 'Hello, World!'
      };
      var result = userCommand(undefined, action);
      expect(result[action.level]).to.not.be.undefined;
    })

    it('should create new properties corresponding to different levels', function() {
      var action_1 = {
        type: 'INPUT_COMMAND',
        level: 0,
        command: 'Hello, World!'
      };
      var action_2 = {
        type: 'INPUT_COMMAND',
        level: 1,
        command: 'Initializing level 1'
      };
      var firstState = userCommand(undefined, action_1);
      var secondState = userCommand(firstState, action_2);
      expect(secondState).to.have.property(0);
      expect(secondState).to.have.property(1);
    })

    it('should not mutate the original state', function() {
      var state = { 1: ['Sup foo'] };
      var action = {
        type: 'INPUT_COMMAND',
        level: 0,
        command: 'Hello, World!'
      }
      var result = userCommand(state, action);
      expect(state).to.not.equal(result);
      expect(state).to.deep.equal({ 1: ['Sup foo'] });
    });

    it('should store multiple commands', function() {
      var action_1 = {
        type: 'INPUT_COMMAND',
        level: 0,
        command: 'Hello, World!'
      };
      var action_2 = {
        type: 'INPUT_COMMAND',
        level: 0,
        command: 'Coding is fun!'
      };
      var firstState = userCommand(undefined, action_1);
      expect(firstState[0]).to.have.lengthOf(1);
      var secondState = userCommand(firstState, action_2);
      expect(secondState[0]).to.have.lengthOf(2);
      expect(secondState[0]).to.deep.equal(['Hello, World!', 'Coding is fun!']);
    })

  })

  describe('adding a command', () => {

    it('should handle "INPUT_COMMAND" actions', () => {
      var action = createCommand(0, 'New command');
      var result = userCommand(undefined, action);
      expect(result).to.deep.equal({ 0: ['New command'] });
    })

    it('should return original state for invalid action types', () => {
      var action = { type: 'INCREMENT', value: 0 };
      var state = { 0: ['Hello, World!'] };
      var result = userCommand(state, action);
      expect(result).to.deep.equal(state);
    })

    it('should contain a growing array of user commands', () => {
      var action = {
        type: 'INPUT_COMMAND',
        level: 4,
        command: 'Here is a command'
      }
      var result;
      for (var i = 0; i < 3; i++) {
        result = userCommand(result, action);
      };
      expect(result[4]).to.have.lengthOf(3);
    })
  })

})