import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { deleteFromItems, getExpiryItems } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { MainContent, ListItem } from "./ItemList";

export default function ExpiryList() {
  const [showExpiryList, setShowExpiryList] = useState({
    expiryItems: [],
    show: false
  });
  const dispatch = useDispatch();

  const showAndGetExpiryItems = () => {
    if (showExpiryList.show === false) {
      dispatch(getExpiryItems());
      setShowExpiryList({
        show: true
      });
    } else if (showExpiryList.show === true) {
      setShowExpiryList({
        show: false
      });
    }
  };

  useEffect(() => {
    console.log("useEffec in ExpiryList running");
    dispatch(getExpiryItems());
  }, []);

  const expiryItems = useSelector(state => state.expiryItems);

  const newItems = state => state.newItem && state.newItem === true;
  const NavbarItem = styled.img`
    width: 45px;
    height: 45px;
    grid-area: "nav";
    object-fit: scale-down;
  `;
  const Notify = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: tomato;
    position: absolute;
    transform: translate(35px, -45px);
    padding: 0;
    color: papayawhip;
    display: flex;
    justify-content: center;
  `;

  return (
    <section>
      <NavbarItem
        onClick={showAndGetExpiryItems}
        alt="List of items about to expire"
        className="icon"
        src="expired_icon.png"
      />

      {showExpiryList.show && (
        <MainContent>
          <h1>I AM THE EXPIRY LIST</h1>
          {expiryItems &&
            expiryItems.map((item, index) => {
              return (
                <ListItem key={index}>
                  <p>{item.name}</p>
                </ListItem>
              );
            })}
        </MainContent>
      )}
      {expiryItems.length > 0 && <Notify> {expiryItems.length}</Notify>}
    </section>
  );
}

// showExpiryList.map((item, index) => {
// }
// export default function ItemList({ img_url, disp_function, onShoppingList }) {
//   const [listItemsShow, setListItemsShow] = useState();
//   const [itemDetailShow, setItemDetailShow] = useState();
//   const [itemInFocus, setItemInFocus] = useState();
//   // const [shoppingList, setShoppingList] = useState();
//
//   const getListItems = () => {
//     if (!listItemsShow) {
//       setListItemsShow(true);
//       dispatch(getUserItems());
//     } else if (listItemsShow === true) {
//       setListItemsShow(false);
//     } else {
//       setListItemsShow(true);
//       dispatch(getUserItems());
//       // dispatch(viewingRequests());
//     }
//   };
//   const addItemInfo = item => {
//     console.log("Running addItemInfo in ItemList", item);
//     if (!itemDetailShow) {
//       setItemDetailShow(true);
//       setItemInFocus(item);
//     } else if (itemDetailShow === true) {
//       setItemDetailShow(false);
//       setItemInFocus({});
//     } else {
//       setItemDetailShow(true);
//       setItemInFocus(item);
//     }
//   };
//   const NavbarItem = styled.img`
//     width: 45px;
//     height: 45px;
//     grid-area: "nav";
//   `;
//
//   const MainContent = styled.div`
//     grid-area: "main";
//     width: 100vw;
//     height: 90vh;
//     z-index: 2;
//     position: absolute;
//     border: 2px solid red;
//     background: lightyellow;
//     left: 0px;
//     top: 15vh;
//   `;
//
//   const ListItem = styled.div`
//     display: flex;
//     padding-right: 10px;
//   `;
//
//   const Icon = styled.img`
//     width: 20px;
//     height: 20px;
//   `;
//
//   useEffect(() => {
//
//     console.log("ItemList Component mounted");
//   }, []);
//
//   const listItems = useSelector(
//     state =>
//       state.items &&
//       state.items.filter(elem => elem.on_shopping_list === onShoppingList)
//   );
//   console.log("*****", listItems);
//   return (
//     <div>
//       <NavbarItem
//         onClick={getListItems}
//         alt="List of Items"
//         className="icon"
//         src={img_url}
//       />
//       {listItemsShow && (
//         <MainContent className="main-content">
//           <h4>I WILL SHOW A LIST OF ITEMS</h4>
//
//           {listItems &&
//             listItems.map((item, index) => {
//               return (
//                 <ListItem key={index}>
//                   <p onClick={() => addItemInfo(item)}> {item.name}</p>
//                   <p> {item.amount}</p>
//                   {item.expires_after_date_bought && (
//                     <div>
//                       <p>Expires: {item.expires_after_date_bought} </p>
//                       <Icon src="./expired_icon.png" alt="" />
//                     </div>
//                   )}
//                   {item.expires_at && (
//                     <p> Default Expiration Date:{item.expires_at}</p>
//                   )}
//                   {item.on_shopping_list && (
//                     <div>
//                       <button>bought</button>
//                     </div>
//                   )}
//                   <p onClick={e => dispatch(deleteFromItems(item.id))}> x</p>
//                 </ListItem>
//               );
//             })}
//           {onShoppingList.length > 0 && (
//             <div>
//               <button>bought all items</button>
//               <button>remove all items</button>
//             </div>
//           )}
//           {itemDetailShow && (
//             <ItemDetailedView
//               itemInFocus={itemInFocus}
//               addItemInfo={addItemInfo}
//             />
//           )}
//         </MainContent>
//       )}
//     </div> //end div
//   ); //end return
// } //closingtag function
