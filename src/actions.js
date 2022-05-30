import axios from "./axios";

export function addToPantry(item_id, expiry_date) {
  return axios
    .post(`/add-to-pantry/${item_id}`, { expiry_date })
    .then(({ data }) => {
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
    return {
      type: "GET_EXPIRY_ITEMS",
      expiryItems: data
    };
  });
}

export function addAllItemsFromShoppingToPantry(shoppingItemsArr) {
  console.log("2", shoppingItemsArr);
  return axios
    .post("/add-all-to-pantry", { shoppingItemsArr })
    .then(({ data }) => {
      console.log("3");
      return {
        type: "ADD_ALL_ITEMS_TO_PANTRY"
      };
    });
}

export function deleteAllFromShoppingList() {
  console.log("running deleteAllFromShoppingList");
  return axios.post("/delete-all-shopping").then(({ data }) => {
    console.log("****ACTION DATA deleteAllFromShoppingList", data);
    return {
      type: "DELETE_ALL_FROM_SHOPPING",
      data
    };
  });
}

export function deleteAllFromPantryList() {
  console.log("running deleteAllFromPantryList");
  return axios.post("/delete-all-pantry").then(({ data }) => {
    console.log("****ACTION deleteAllFromPantryList DATA", data);
    return {
      type: "DELETE_ALL_FROM_PANTRY",
      data
    };
  });
}
