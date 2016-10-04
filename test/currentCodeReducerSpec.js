import { expect } from 'chai';
import currentCode from '../src/client/app/reducers/currentCode';

describe('currentCode reducer', () => {

  describe('currentCode', () => {

    it('should be a function', () => {
      expect(currentCode).to.be.a('function');
    })

    it('should accept SET_CODE actions and return a string', () => {
      var action = {
        type: 'SET_CODE',
        code: 'Hello World!'
      };
      var result = currentCode(null, action);
      expect(result).to.be.a('string');
    })

  })

})