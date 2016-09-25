const addCommand = (state = [], action) => {
  switch (action.type) {
    case 'INPUT_COMMAND':
      return [...state, action.command];
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