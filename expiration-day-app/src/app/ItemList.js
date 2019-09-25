import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromItems,
  getUserItems,
  addAllItemsFromShoppingToPantry,
  deleteFromShoppingList,
  deleteFromPantryList
} from "../actions";
import ItemDetailedView from "./ItemDetailedView";
// import axios from "../axios";
import styled from "styled-components";

export const MainContent = styled.div`
  grid-area: "main";
  width: 50vw;
  height: 90vh;
  z-index: 2;
  position: absolute;
  border: 2px solid red;
  background: lightyellow;
  right: 0px;
  top: 15vh;
`;
export const ListItem = styled.div`
  display: flex;
  padding-right: 10px;
`;

export default function ItemList({ img_url, disp_function, onShoppingList }) {
  const [listItemsShow, setListItemsShow] = useState();
  const [itemDetailShow, setItemDetailShow] = useState();
  const [itemInFocus, setItemInFocus] = useState();
  // const [shoppingList, setShoppingList] = useState();

  const dispatch = useDispatch();
  const getListItems = () => {
    if (!listItemsShow) {
      setListItemsShow(true);
      dispatch(getUserItems());
    } else if (listItemsShow === true) {
      setListItemsShow(false);
    } else {
      setListItemsShow(true);
      dispatch(getUserItems());
      // dispatch(viewingRequests());
    }
  };
  const addItemInfo = item => {
    if (!itemDetailShow) {
      setItemDetailShow(true);
      setItemInFocus(item);
    } else if (itemDetailShow === true) {
      setItemDetailShow(false);
      setItemInFocus({});
    } else {
      setItemDetailShow(true);
      setItemInFocus(item);
    }
  };
  const NavbarItem = styled.img`
    width: 45px;
    height: 45px;
    grid-area: "nav";
  `;

  const Icon = styled.img`
    width: 20px;
    height: 20px;
  `;

  useEffect(() => {
    console.log("ItemList Component mounted");
  }, []);

  const listItems = useSelector(
    state =>
      state.items &&
      state.items.filter(elem => elem.on_shopping_list === onShoppingList)
  );
  const shoppingItems = useSelector(
    state =>
      state.items && state.items.filter(elem => elem.on_shopping_list === true)
  );
  const addAll = e => {
    e.preventDefault();
    dispatch(addAllItemsFromShoppingToPantry(shoppingItems));
    dispatch(getUserItems());
  };

  console.log("shoppingItems", shoppingItems);

  return (
    <div>
      <NavbarItem
        onClick={getListItems}
        alt="List of Items"
        className="icon"
        src={img_url}
      />
      {listItemsShow && (
        <MainContent className="main-content">
          <h4>I WILL SHOW A LIST OF ITEMS</h4>

          {listItems &&
            listItems.map((item, index) => {
              return (
                <ListItem key={index}>
                  <p onClick={() => addItemInfo(item)}> {item.name}</p>
                  <p> {item.amount}</p>
                  {!onShoppingList && (
                    <div>
                      <p>Expires: {item.expires_after_date_bought} </p>
                      <Icon src="./expired_icon.png" alt="" />
                    </div>
                  )}
                  {item.expires_at && (
                    <p> Default Expiration Date:{item.expires_at}</p>
                  )}
                  <p onClick={e => dispatch(deleteFromItems(item.id))}> x</p>
                </ListItem>
              );
            })}
          {onShoppingList && (
            <div>
              <button onClick={addAll}>bought all items</button>
              <button onClick={() => dispatch(deleteFromShoppingList())}>
                remove all
              </button>
            </div>
          )}
          {!onShoppingList && (
            <div>
              <button onClick={() => dispatch(deleteFromPantryList())}>
                remove all
              </button>
            </div>
          )}
          {itemDetailShow && (
            <ItemDetailedView
              itemInFocus={itemInFocus}
              addItemInfo={addItemInfo}
              onShoppingList={onShoppingList}
            />
          )}
        </MainContent>
      )}
    </div> //end div
  ); //end return
} //closingtag function
