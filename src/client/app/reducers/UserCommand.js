const addCommand = (state = [], action) => {
  switch (action.type) {
    case 'INPUT_COMMAND':
      if (action.command) {
        return [action.command, ...state];
      } else {
        return state;
      }
    default: 
      return state;
  }
}

const userCommand = (state = {}, action) => {
  switch (action.type) {
    case 'INPUT_COMMAND':
      return Object.assign(
        {},
        state,
        { [action.level]: addCommand(state[action.level], action) }
      );
    default: 
      return state;
  }
}

export default userCommand;