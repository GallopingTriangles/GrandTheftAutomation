import { expect } from 'chai';
import { createStore } from 'redux';
import reducer from '../src/client/app/reducers/reducer';
import changeLevel from '../src/client/app/actions/changeLevel';
import changeUser from '../src/client/app/actions/changeUser';
import setCode from '../src/client/app/actions/setCode';

describe('Reducer function', function() {

  var store;
  beforeEach(() => {
    store = createStore(reducer);
  })

  it('should be a function', function() {
    expect(reducer).to.be.a('function');
  });

  it('should generate a store with user, level, currentCode', () =>{
    var store = createStore(reducer);

    expect(store.getState()).to.be.an('object');

    expect(store.getState()).to.have.property('user')
      .that.is.a('string');

    expect(store.getState()).to.have.property('level')
      .that.is.a('number');

    expect(store.getState()).to.have.property('currentCode')
      .that.is.a('string');
  });

  describe('Store state', () => {
    
    var store;
    beforeEach(() => {
      store = createStore(reducer);
    })


    it('should be an object', () => {
      expect(store.getState()).to.be.an('object');
    })

    it('should be updated by "CHANGE_LEVEL" actions', () => {
      var action_1 = changeLevel(4);
      var action_2 = changeLevel(2);
      expect(store.getState().level).to.equal(0); // default level

      store.dispatch(action_1);
      var result_1 = store.getState();
      expect(result_1.level).to.equal(4);

      store.dispatch(action_2);
      var result_2 = store.getState();
      expect(result_2.level).to.equal(2);

      expect(result_1).to.not.deep.equal(result_2);
    });

    it('should be updated by "CHANGE_USER" actions', () => {
      var action_1 = changeUser('Bob');
      var action_2 = changeUser('Tom');
      expect(store.getState().user).to.equal(''); // default user

      store.dispatch(action_1);
      var result_1 = store.getState();
      expect(result_1.user).to.equal('Bob');

      store.dispatch(action_2);
      var result_2 = store.getState();
      expect(result_2.user).to.equal('Tom');

      expect(result_1).to.not.deep.equal(result_2);
    });

    it('should be updated by "SET_CODE" actions', () => {
      var action_1 = setCode('Hello World');
      var action_2 = setCode('Goodbye Cruel World');
      expect(store.getState().currentCode).to.equal(''); // default currentCode

      store.dispatch(action_1);
      var result_1 = store.getState();
      expect(result_1.currentCode).to.equal('Hello World');

      store.dispatch(action_2);
      var result_2 = store.getState();
      expect(result_2.currentCode).to.equal('Goodbye Cruel World');

      expect(result_1).to.not.deep.equal(result_2);
    })



    it('should not be affected by invalid actions', () => {
      var result = store.getState();
      store.dispatch({ type: 'DUMMY_ACTION' });
      expect(result).to.equal(store.getState());
    })

    it('should not be mutated by valid actions', () => {
      var result = store.getState();
      store.dispatch(setCode('Hello World'));
      expect(result).to.not.equal(store.getState());
      expect(result.user).to.not.equal('Hello World');
      expect(result.user).to.equal('');
    })

  })

})