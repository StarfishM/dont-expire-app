import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addToPantry, addToShoppingList } from "../actions";
// import axios from "../axios";

export default function ItemList({ img_url, disp_function, onShoppingList }) {
  const [listItemsShow, setListItemsShow] = useState();
  const dispatch = useDispatch();
  const getListItems = () => {
    if (!listItemsShow) {
      setListItemsShow(true);
      dispatch(disp_function());
      // dispatch(viewingRequests());
    } else if (listItemsShow === true) {
      setListItemsShow(false);
    } else {
      setListItemsShow(true);
      dispatch(disp_function());
      // dispatch(viewingRequests());
    }
  };
  const deleteFromList = e => {
    e.preventDefault();
    console.log("DelteFromListRunning");
  };
  useEffect(() => {
    console.log("ItemList Component mounted");
    // dispatch(initialCheckForNewFriendReqs());
  }, []);

  const listOfItems = useSelector(
    state =>
      state.shoppint_itema &&
      state.shopping_items.filter(
        elem => elem.on_shopping_list === onShoppingList
      )
  );
  //
  // const newItem = useSelector(
  //   state => state.newItem && state.newItem == true
  // );

  return (
    <div>
      <h1>I AM THE ITEM LIST COMPONENT!</h1>
      <img
        onClick={getListItems}
        alt="List of Items"
        className="icon"
        src={this.props.img_url}
      />
      {listItemsShow && (
        <div>
          <h1>I WILL SHOW A LIST OF ITEMA</h1>
        </div>
      )}
      )}
    </div>
  );
}

// {listItems && listItems.map((item, index)=>{
//         console.log(item.id);
//         return(
//         <div key={index} className="friend">
//         <p> {item.name}</p>
//         <p> {item.amount}</p>
//       <p onClick= {e=>deleteFromList}> x</p>)}
//              )}
//     });
