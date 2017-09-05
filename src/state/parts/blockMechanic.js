const initialState = {
  unusedBlockPoints: 0,
  leftBlockPoints: 1,
  frontBlockPoints: 1,
  rightBlockPoints: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state
      }
  }
}