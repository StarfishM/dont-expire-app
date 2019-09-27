import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromItems,
  getUserItems,
  addAllItemsFromShoppingToPantry,
  deleteAllFromShoppingList,
  deleteAllFromPantryList
} from "../actions";
import ItemDetailedView from "./ItemDetailedView";
import styled from "styled-components";
import {
  Button,
  ClickablePTags,
  List,
  ListItem,
  NavbarItem,
  PLessMargin
} from "../StandardStyles";

export const MainContent = styled.div`
  grid-area: "BoxTwo";
  padding-top: 20px;
  padding-left: 20px;
  width: 50vw;
  min-height: 81vh;
  z-index: 2;
  position: absolute;
  background: #ead7d1;
  right: 0px;
  top: 10vh;
`;

export default function ItemList({ img_url, disp_function, onShoppingList }) {
  const [listItemsShow, setListItemsShow] = useState();
  const [itemDetailShow, setItemDetailShow] = useState();
  const [itemInFocus, setItemInFocus] = useState();
  const [showExpiryDate, setShowExpiryDate] = useState();

  const dispatch = useDispatch();

  const toggleHover = () => {
    if (!showExpiryDate) {
      setShowExpiryDate(true);
    } else if (showExpiryDate) {
      setShowExpiryDate(false);
    }
  };
  const getListItems = () => {
    if (!listItemsShow) {
      setListItemsShow(true);
      dispatch(getUserItems());
    } else if (listItemsShow === true) {
      setListItemsShow(false);
    } else {
      setListItemsShow(true);
      dispatch(getUserItems());
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

  const ExpiredIcon = styled.img`
    width: 20px;
    height: 20px;
    background: ${props => props.backgroundColor};
    margin-top: 16px;
  `;

  const HoverInfo = styled.p`
    position: absolute;
    margin-top: 5px;
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
          {onShoppingList ? <h4>To Buy</h4> : <h4>Items in Pantry</h4>}

          <List>
            {listItems &&
              listItems.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <PLessMargin> {item.amount}</PLessMargin>
                    <ClickablePTags onClick={() => addItemInfo(item)}>
                      {" "}
                      {item.name}
                    </ClickablePTags>

                    {!onShoppingList && (
                      <section>
                        <div>
                          <ExpiredIcon
                            src="./expired_icon.png"
                            alt=""
                            backgroundColor={item.color}
                            onMouseEnter={toggleHover}
                            onMouseLeave={toggleHover}
                          />
                        </div>
                        {showExpiryDate && (
                          <HoverInfo>
                            {item.expires_after_date_bought}{" "}
                          </HoverInfo>
                        )}
                      </section>
                    )}
                    <ClickablePTags
                      onClick={e => dispatch(deleteFromItems(item.id))}
                    >
                      {" "}
                      x
                    </ClickablePTags>
                  </ListItem>
                );
              })}
            {itemDetailShow && (
              <ItemDetailedView
                itemInFocus={itemInFocus}
                addItemInfo={addItemInfo}
                onShoppingList={onShoppingList}
              />
            )}
          </List>
          {onShoppingList && (
            <ListItem>
              <Button primary onClick={addAll}>
                bought all
              </Button>
              <Button onClick={() => dispatch(deleteAllFromShoppingList())}>
                remove all
              </Button>
            </ListItem>
          )}
          {!onShoppingList && (
            <div>
              <Button onClick={() => dispatch(deleteAllFromPantryList())}>
                remove all
              </Button>
            </div>
          )}
        </MainContent>
      )}
    </div> //end div
  ); //end return
} //closingtag function
