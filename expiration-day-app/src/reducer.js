export default function reducer(state = {}, action) {
  console.log("GET_USER_ITEMS", action);
  console.log("GET_USER_ITEMS action.type", action.type);
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
    console.log("ADD_TO_PANTRY", action);
    state = {
      ...state,
      items: [...state.items, action.data]
    };
  }

  if (action.type === "DELETE_ITEMS_FROM_ITEMS") {
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

  return state;
}
