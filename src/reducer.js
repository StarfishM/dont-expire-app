export default function reducer(
  state = { items: [], standard_items: [], expiryItems: [] },
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
    console.log("action in ADD_TO_PANTRY:", action);
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
      }),
      expiryItems: state.expiryItems.filter(item => {
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

  if (action.type === "GET_EXPIRY_ITEMS") {
    console.log("getExpiryItems is running in reducer", action);
    state = {
      ...state,
      expiryItems: action.expiryItems.data,
      first: action.expiryItems.first
    };
  }
  if (action.type === "ADD_ALL_ITEMS_TO_PANTRY") {
    console.log("4");
    state = {
      ...state,
      items: state.items.map(item =>
        item.on_shopping_list
          ? { ...item, on_shopping_list: false }
          : { ...item }
      )
    };
  }

  if (action.type === "DELETE_ALL_FROM_SHOPPING") {
    state = {
      ...state,
      items: state.items.filter(item => !item.on_shopping_list)
    };
  }
  if (action.type === "DELETE_ALL_FROM_PANTRY") {
    console.log("DELETE ALL FROM PANTRY IN REDUCER RUNNING");

    state = {
      ...state,
      items: state.items.filter(item => item.on_shopping_list)
    };
  }

  return state;
}
