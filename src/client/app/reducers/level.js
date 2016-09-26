const level = (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_LEVEL':
      return action.level;
    default:
      return state;
  }
}

export default level