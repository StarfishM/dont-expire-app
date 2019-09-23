export default function reducer(state = {}, action) {
  if (action.type === "ADD_TO_PANTRY") {
    console.log("ADD_TO_PANTRY", action);
    state = {
      ...state,
      pantry_items: action.data,
      success: action.success
    };
  }
  if (action.type === "ADD_TO_SHOPPING_LIST") {
    console.log("ADD_TO_SHOPPING_LIST", action);
    state = {
      ...state,
      shopping_items: action.data,
      success: action.success
    };
  }
  return state;
}
