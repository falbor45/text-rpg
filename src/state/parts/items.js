const initialState = {
  data: null,
  fetching: false,
  error: null,
  createdItem: {},
  itemPending: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'items/FETCH__BEGIN':
      return {
        ...state,
        fetching: true
      }
    case 'items/FETCH__SUCCESS':
      return {
        ...state,
        fetching: false,
        data: action.data
      }
    case 'items/FETCH__FAILURE':
      return {
        ...state,
        fetching: false,
        error: action.error
      }
    case 'items/ITEM_PENDING':
      return {
        ...state,
        itemPending: state.itemPending === false,
        createdItem: state.itemPending === true ? {} : state.itemPending
      }
    case 'items/CREATE_ITEM':
      return {
        ...state,
        createdItem: action.item
      }
    default:
      return {
        ...state
      }
  }
}