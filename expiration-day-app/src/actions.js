import axios from "./axios";

export function addToPantry(item_id, expiry_date) {
  console.log("add to pantry action", item_id, expiry_date);
  return axios
    .post(`/add-to-pantry/${item_id}`, { expiry_date })
    .then(({ data }) => {
      console.log("DAta in add to pantry action", data);
      return {
        type: "ADD_TO_PANTRY",
        data: data.data,
        item_id
      };
    });
}

export function addToShoppingList(item_id) {
  return axios.post(`/add-to-list/${item_id}`).then(({ data }) => {
    return {
      type: "ADD_TO_SHOPPING_LIST",
      data: data.data,
      item_id
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

export function removeFromStandardItems(item_id) {
  return {
    type: "REMOVE_FROM_STANDARD_ITEMS",
    item_id
  };
}

export function getExpiryItems() {
  return axios.get("/get-expiry-items").then(({ data }) => {
    console.log("****ACTION DATA", data);
    return {
      type: "GET_EXPIRY_ITEMS",
      expiryItems: data
    };
  });
}
