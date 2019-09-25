import React, { useState, useEffect } from "react";
import axios from "../axios";
import styled from "styled-components";
import { getUserItems } from "../actions";
import { useDispatch } from "react-redux";

export default function ItemDetailedView({
  itemInFocus,
  addItemInfo,
  onShoppingList
}) {
  const dispatch = useDispatch();
  let curr = new Date();
  let expires = new Date();
  curr.setDate(curr.getDate());
  expires.setDate(curr.getDate() + itemInFocus.expiry_date);
  let date = curr.toISOString().substr(0, 10);
  let expiryDate = expires.toISOString().substr(0, 10);
  const [updateItem, setUpdateItem] = useState({
    account_id: itemInFocus.account_id,
    product_id: itemInFocus.product_id,
    id: itemInFocus.id,
    amount: "",
    purchaseDate: date,
    expiryDate: expiryDate
  });
  const ProductDetailForm = styled.div`
    width: 50vw;
    height: 40vh;
    background: lightgreen;
    display: flex;
    flex-direction: column;
  `;
  const AmountContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    background: pink;
  `;
  const handleChange = e => {
    console.log("e in handleChange", e);
    setUpdateItem({
      ...updateItem,
      [e.target.name]: e.target.value
    });
    console.log("updateItem", updateItem);
  };
  const updateUserItemTbl = e => {
    e.preventDefault();
    console.log("user want to update db info", updateItem);
    axios.post("/update-userpantry", updateItem).then(resp => {
      addItemInfo(itemInFocus);
      dispatch(getUserItems());
    });
  };

  const cancel = e => {
    e.preventDefault();
    addItemInfo(itemInFocus);
  };
  useEffect(() => {
    setUpdateItem({
      ...updateItem
    });
  }, []);

  console.log("itemInFocus", itemInFocus);
  return (
    <ProductDetailForm>
      <h4>Add more info to {itemInFocus.name}</h4>
      <AmountContainer>
        <label htmlFor="amount">amount</label>
        <input
          onChange={handleChange}
          type="text"
          name="amount"
          value={updateItem.amount}
          required="required"
        />
      </AmountContainer>
      {!onShoppingList && (
        <div>
          <label htmlFor="purchaseDate">Select day of purchase</label>
          <input
            onChange={handleChange}
            type="date"
            name="purchaseDate"
            defaultValue={date}
            value={updateItem.purchaseDate}
          />
          <label htmlFor="expiryDate">
            Please refine or leave as is, if you want to use default expiry
            value
          </label>
          <input
            onChange={handleChange}
            type="date"
            name="expiryDate"
            defaultValue={expiryDate}
            value={updateItem.expiryDate}
          />
        </div>
      )}

      <button onClick={e => updateUserItemTbl(e)}>update item info</button>
      <button onClick={e => cancel(e)}>cancel</button>
    </ProductDetailForm>
  );
}
// value={updateItem.purchaseDate}
// value={updateItem.expiryDate}
// <label htmlFor="qty">grams</label>
// <input
//   onClick={handleChange}
//   type="radio"
//   id="g"
//   name="qty"
//   value={updateItem.qty}
// />
// <label htmlFor="l">liters</label>
// <input
//   onClick={handleChange}
//   type="radio"
//   id="l"
//   name="qty"
//   value={updateItem.qty}
// />
// <label htmlFor="qty">quantity</label>
// <input
//   onClick={handleChange}
//   type="radio"
//   id="qty"
//   name="qty"
//   value={updateItem.qty}
// />
// value={updateItem.purchaseDate}
// value={updateItem.expiryDate}
