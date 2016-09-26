import { expect } from 'chai';
import createCommand from '../src/client/app/actions/UserCommandAction';

describe('userCommandActionCreator', () => {

  describe('createCommand', () => {

    var text;
    beforeEach(() => {
      text = 'Sample text'
    });

    it('should be a function', () => {
      expect(createCommand).to.be.a('function');
    });

    it('should return an object', () => {
      expect(createCommand(0, text)).to.be.a('object');
    });

    it('should return an object with an "INPUT_COMMAND" type', () => {
      var action = createCommand(text);
      expect(action.type).to.equal('INPUT_COMMAND');
    });

    it('should return an object with a "command" property', () => {
      var action = createCommand(0, text);
      expect(action.command).to.equal('Sample text');
    });

    it('should return an object with a numeric property for the level', () => {
      var action = createCommand(0, text);
      expect(action.level).to.equal(0);
    })
    
  });

})