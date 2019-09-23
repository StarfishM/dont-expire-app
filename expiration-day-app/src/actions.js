import axios from "./axios";

export function addToPantry(item_id) {
  return axios.post(`/add-to-pantry/${item_id}`).then(({ data }) => {
    console.log("POST addToPantry", data);
    return {
      type: "ADD_TO_PANTRY",
      data
    };
  });
}

export function addToShoppingList(item_id) {
  return axios.post(`/add-to-list/${item_id}`).then(({ data }) => {
    console.log("POST addtoShoppingList", data);
    return {
      type: "ADD_TO_SHOPPING_LIST",
      data
    };
  });
}
