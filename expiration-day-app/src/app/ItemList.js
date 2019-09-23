import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addToPantry, addToShoppingList } from "../actions";
// import axios from "../axios";
import styled from "styled-components";

export default function ItemList({ img_url, disp_function, onShoppingList }) {
  const [listItemsShow, setListItemsShow] = useState();
  // const dispatch = useDispatch();
  const getListItems = () => {
    if (!listItemsShow) {
      setListItemsShow(true);
      // dispatch(disp_function());
      // dispatch(viewingRequests());
    } else if (listItemsShow === true) {
      setListItemsShow(false);
    } else {
      setListItemsShow(true);
      // dispatch(disp_function());
      // dispatch(viewingRequests());
    }
  };
  const NavbarItem = styled.img`
    width: 50px;
    height: 50px;
    grid-area: "nav";
  `;

  const MainContent = styled.div`
    grid-area: "main";
    width: 100vw;
    height: 90vh;
    position: absolute;
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
        <MainContent>
          <h4>I WILL SHOW A LIST OF ITEMS</h4>

          {listItems &&
            listItems.map((item, index) => {
              console.log("ListItems mapping for", item.id);
              return (
                <ListItem key={index}>
                  <p> {item.name}</p>
                  <p> {item.amount}</p>
                  <p> x</p>
                </ListItem>
              );
            })}
        </MainContent>
      )}
    </div> //end div
  ); //end return
} //closingtag function

//onClick={e => deleteFromList}

// {listItems &&
//   listItems.map((item, index) => {
//     console.log(item.id);
//     return (
//       <div key={index} className="friend">
//         <p> {item.name}</p>
//         <p> {item.amount}</p>
//         <p> x</p>
//       </div>
//     );
//   })}
