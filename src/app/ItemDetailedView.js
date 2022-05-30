import React, { useState, useEffect } from "react";
import axios from "../axios";
import styled from "styled-components";
import { getUserItems, getExpiryItems } from "../actions";
import { useDispatch } from "react-redux";
import { Button, ListItem } from "../StandardStyles";

const ProductDetailForm = styled.div`
  width: 450px;
  height: 450px;
  display: flex;
  flex-direction: column;
`;
const FormDetailRow = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  justify-content: space-between;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  overflow-y: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DetailContainer = styled.div`
  padding: 2%;
  height: 30vh;
  width: 45vw;
  background-color: whitesmoke;
  z-index: 3;
  cursor: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

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
    amount: itemInFocus.amount,
    purchaseDate: date,
    expiryDate: expiryDate
  });

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
      dispatch(getExpiryItems());
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
    <Overlay>
      <DetailContainer onClick={e => e.stopPropagation()}>
        <ProductDetailForm>
          <h4>Add more info to {itemInFocus.name}</h4>
          <FormDetailRow>
            <label htmlFor="amount">amount</label>
            <input
              onChange={handleChange}
              type="text"
              name="amount"
              defaultValue={updateItem.amount}
              value={updateItem.amount}
              required="required"
              style={{ width: "130px" }}
            />
          </FormDetailRow>
          {!onShoppingList && (
            <div>
              <FormDetailRow>
                <label htmlFor="purchaseDate">Select day of purchase</label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="purchaseDate"
                  defaultValue={date}
                  value={updateItem.purchaseDate}
                  style={{ width: "130px" }}
                />
              </FormDetailRow>
              <FormDetailRow>
                <label htmlFor="expiryDate">Enter expiry date</label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="expiryDate"
                  defaultValue={expiryDate}
                  value={updateItem.expiryDate}
                  style={{ width: "130px" }}
                />
              </FormDetailRow>
            </div>
          )}
          <FormDetailRow>
            <Button onClick={e => updateUserItemTbl(e)}>
              update item info
            </Button>
            <Button primary onClick={e => cancel(e)}>
              cancel
            </Button>
          </FormDetailRow>
        </ProductDetailForm>
      </DetailContainer>
    </Overlay>
  );
}
