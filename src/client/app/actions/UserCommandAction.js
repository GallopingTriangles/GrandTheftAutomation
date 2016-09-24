const createCommand = command => {
  return {
    type: 'INPUT_COMMAND',
    command
  };
}

export default createCommand;