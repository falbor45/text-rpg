const initialState = {
  unusedBlockPoints: 0,
  leftBlockPoints: 1,
  frontBlockPoints: 1,
  rightBlockPoints: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'blockMechanic/CHANGE_LEFT_BLOCK':
      if (action.what === 'add') {
        if (state.unusedBlockPoints >= 1 && state.leftBlockPoints !== 3) {
          return {
            ...state,
            leftBlockPoints: state.leftBlockPoints + 1,
            unusedBlockPoints: state.unusedBlockPoints - 1
          }
        }
        if (state.unusedBlockPoints === 0) {
          return {
            ...state
          }
        }
      }
      if (action.what === 'substract') {
        if (state.leftBlockPoints !== 0) {
          return {
            ...state,
            leftBlockPoints: state.leftBlockPoints - 1,
            unusedBlockPoints: state.unusedBlockPoints + 1
          }
        }
        if (state.leftBlockPoints === 0) {
          return {
            ...state
          }
        }
      }
      return {
        ...state
      }
      case 'blockMechanic/CHANGE_FRONT_BLOCK':
        if (action.what === 'add') {
          if (state.unusedBlockPoints >= 1 && state.frontBlockPoints !== 3) {
            return {
              ...state,
              frontBlockPoints: state.frontBlockPoints + 1,
              unusedBlockPoints: state.unusedBlockPoints - 1
            }
          }
          if (state.unusedBlockPoints === 0) {
            return {
              ...state
            }
          }
        }
        if (action.what === 'substract') {
          if (state.frontBlockPoints !== 0) {
            return {
              ...state,
              frontBlockPoints: state.frontBlockPoints - 1,
              unusedBlockPoints: state.unusedBlockPoints + 1
            }
          }
          if (state.frontBlockPoints === 0) {
            return {
              ...state
            }
          }
        }
        return {
          ...state
        }
      case 'blockMechanic/CHANGE_RIGHT_BLOCK':
        if (action.what === 'add') {
          if (state.unusedBlockPoints >= 1 && state.rightBlockPoints !== 3) {
            return {
              ...state,
              rightBlockPoints: state.rightBlockPoints + 1,
              unusedBlockPoints: state.unusedBlockPoints - 1
            }
          }
          if (state.unusedBlockPoints === 0) {
            return {
              ...state
            }
          }
        }
        if (action.what === 'substract') {
          if (state.rightBlockPoints !== 0) {
            return {
              ...state,
              rightBlockPoints: state.rightBlockPoints - 1,
              unusedBlockPoints: state.unusedBlockPoints + 1
            }
          }
          if (state.rightBlockPoints === 0) {
            return {
              ...state
            }
          }
        }
        return {
          ...state
        }
    default:
      return {
        ...state
      }
  }
}