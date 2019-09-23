import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromItems, getUserItems } from "../actions";
// import axios from "../axios";
import styled from "styled-components";

export default function ItemList({ img_url, disp_function, onShoppingList }) {
  const [listItemsShow, setListItemsShow] = useState();
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
  // const deleteFromList = e => {
  //   e.preventDefault();
  //   console.log("DelteFromListRunning");
  // };

  useEffect(() => {
    console.log("ItemList Component mounted");
    // dispatch(initialCheckForNewFriendReqs());
  }, []);

  const listItems = useSelector(
    state =>
      state.items &&
      state.items.filter(elem => elem.on_shopping_list === onShoppingList)
  );
  //
  // const newItem = useSelector(
  //   state => state.newItem && state.newItem == true
  // );

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
              console.log("ListItems mapping for", item.id);
              return (
                <ListItem key={index}>
                  <p> {item.name}</p>
                  <p> {item.amount}</p>
                  <p onClick={e => dispatch(deleteFromItems(item.id))}> x</p>
                </ListItem>
              );
            })}
        </MainContent>
      )}
    </div> //end div
  ); //end return
} //closingtag function
