import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromItems, getUserItems } from "../actions";
import ItemDetailedView from "./ItemDetailedView";
// import axios from "../axios";
import styled from "styled-components";

export default function ItemList({ img_url, disp_function, onShoppingList }) {
  const [listItemsShow, setListItemsShow] = useState();
  const [itemDetailShow, setItemDetailShow] = useState();
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
  const addItemInfo = () => {
    if (!itemDetailShow) {
      setItemDetailShow(true);
    } else if (itemDetailShow === true) {
      setItemDetailShow(false);
    } else {
      setItemDetailShow(true);
    }
  };
  const NavbarItem = styled.img`
    width: 45px;
    height: 45px;
    grid-area: "nav";
  `;

  const MainContent = styled.div`
    grid-area: "main";
    width: 100vw;
    height: 90vh;
    z-index: 2;
    position: absolute;
    border: 2px solid red;
    background: lightyellow;
    left: 0px;
    top: 15vh;
  `;

  const ListItem = styled.div`
    display: flex;
    padding-right: 10px;
  `;

  useEffect(() => {
    console.log("ItemList Component mounted");
  }, []);

  const listItems = useSelector(
    state =>
      state.items &&
      state.items.filter(elem => elem.on_shopping_list === onShoppingList)
  );

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
                  <p onClick={addItemInfo}> {item.name}</p>
                  {itemDetailShow && <ItemDetailedView />}
                  <p> {item.amount}</p>
                  <p onClick={e => dispatch(deleteFromItems(item.id))}> x</p>
                  {item.expires_at && <p> ITEM EXPIRES AT:{item.expires_at}</p>}
                </ListItem>
              );
            })}
        </MainContent>
      )}
    </div> //end div
  ); //end return
} //closingtag function
