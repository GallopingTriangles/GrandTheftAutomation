const createCommand = command => {
  return {
    type: 'ADD_COMMAND',
    command
  };
}

export default createCommand;