export default function reducer(
  state = { items: [], standard_items: [] },
  action
) {
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
      items: [...state.items, action.data],
      standard_items: state.standard_items.map(item => {
        if (item.id === action.item_id) {
          return { ...item, reviewed: true };
        } else {
          return {
            ...item
          };
        }
      })
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
      standard_items: action.standardItems.map(item => {
        return { ...item, reviewed: false };
      })
    };
  }

  if (action.type === "REMOVE_FROM_STANDARD_ITEMS") {
    console.log("removeFromStandardItems is running in reducer");
    state = {
      items: [...state.items],
      standard_items: state.standard_items.map(item => {
        console.log("state.standard_items", state.standard_items);
        if (item.id === action.item_id) {
          return { ...item, reviewed: true };
        } else {
          return {
            ...item
          };
        }
      })
    };
  }
  return state;
}
