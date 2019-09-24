import axios from "./axios";

export function addToPantry(item_id) {
  return axios.post(`/add-to-pantry/${item_id}`).then(({ data }) => {
    return {
      type: "ADD_TO_PANTRY",
      data: data.data
    };
  });
}

export function addToShoppingList(item_id) {
  return axios.post(`/add-to-list/${item_id}`).then(({ data }) => {
    return {
      type: "ADD_TO_SHOPPING_LIST",
      data: data.data
    };
  });
}

export function getUserItems() {
  return axios.get("/useritems").then(({ data }) => {
    return {
      type: "GET_USER_ITEMS",
      data: data.data
    };
  });
}

export function deleteFromItems(id) {
  return axios.post(`/delete-item/${id}`).then(({ data }) => {
    return {
      type: "DELETE_ITEM_FROM_ITEMS",
      id
    };
  });
}

export function getInitialStandardProducts() {
  return axios.get(`/get-standard-products`).then(({ data }) => {
    return {
      type: "GET_STANDARD_ITEMS",
      standardItems: data.data
    };
  });
}
