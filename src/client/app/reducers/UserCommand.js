const userCommand = (state = {}, action) {
  switch (action.type) {
    case 'INPUT_COMMAND':
      return Object.assign(
        {},
        state,
        { command: action.command }
      );
    default: 
      return state;
  }
}

export default userCommand;