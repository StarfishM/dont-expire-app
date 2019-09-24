export default function reducer(state = { standard_items: [] }, action) {
  // console.log("GET_USER_ITEMS", action);
  // console.log("GET_USER_ITEMS action.type", action.type);
  if (action.type === "GET_USER_ITEMS") {
    state = {
      ...state,
      items: action.data
    };
  }
  if (
    action.type === "ADD_TO_PANTRY" ||
    action.type === "ADD_TO_SHOPPING_LIST"
  ) {
    state = {
      ...state,
      items: [...state.items, action.data]
    };
  }

  if (action.type === "DELETE_ITEM_FROM_ITEMS") {
    state = {
      ...state,
      items: state.items.filter(item => {
        if (item.id !== action.id) {
          return {
            ...item
          };
        }
      })
    };
  }

  if (action.type === "GET_STANDARD_ITEMS") {
    state = {
      ...state,
      standard_items: [...state.standard_items, ...action.standardItems]
    };
  }

  return state;
}
