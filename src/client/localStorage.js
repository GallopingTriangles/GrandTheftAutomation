export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    console.log('Loaded state: ', serializedState);
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    console.log('State saved');
  } catch (err) {
    console.log('Cannot save state: ', err);
  }
}