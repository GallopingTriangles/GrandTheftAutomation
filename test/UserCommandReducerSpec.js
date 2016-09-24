import chai from 'chai';
import userCommand from '../src/client/app/reducers/UserCommand.js';
var expect = chai.expect;

describe('userCommand reducer function', function() {

  it('should return an object', function() {
    var action = {
      type: 'INPUT_COMMAND',
      command: 'Hello, World!'
    };
    var result = userCommand(undefined, action);
    expect(result).to.be.an('object');
  });

  it('should have a command property', function() {
    var action = {
      type: 'INPUT_COMMAND',
      command: 'Hello, World!'
    };
    var result = userCommand(undefined, action);
    expect(result.command)
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
  })
})