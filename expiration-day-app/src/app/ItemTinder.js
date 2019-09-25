import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialStandardProducts,
  addToPantry,
  addToShoppingList,
  removeFromStandardItems
} from "../actions";
import { ListItem } from "./ItemList";
import styled from "styled-components";

export default function ItemTinder({ itemId }) {
  // const [listItemsShow, setListItemsShow] = useState();

  const standardItems = useSelector(
    state =>
      state.standard_items &&
      state.standard_items.filter(item => !item.reviewed)
  );
  const dispatch = useDispatch();
  const Wrapper = styled.section`
    display: flex;
    justify-content: space-between;
  `;
  useEffect(() => {
    dispatch(getInitialStandardProducts());
    console.log("***Standard Items:", standardItems);
  }, []);

  const MainContent = styled.div`
    grid-area: "main";
    width: 100vw;
    height: 90vh;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid red;
    background: lightyellow;
    left: 0px;
    top: 15vh;
  `;
  const Card = styled.div`
    height: 90vh;
    width: 45vw;
    background: lightgreen;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  `;
  const ProductImage = styled.img`
    height: 80vh;
    width: 40vw;
    border-radius: 40px;
    object-fit: contain;
    padding: 10px;
  `;
  const Icon = styled.img`
    display: flex;
    height: 30px;
    width: 10vw;
    object-fit: contain;
    padding: 10px;
    border-radius: 5px;
    border: solid 1px black;
    cursor: pointer;
  `;

  if (!standardItems) {
    return null;
  }

  // const listItems = useSelector(state => state.standardItems);
  //<ProductImage src={standardItems[0].img_url} />

  return (
    <MainContent>
      {standardItems.length > 0 && (
        <Card>
          <ProductImage src={standardItems[0].img_url} />
          <Wrapper>
            <Icon
              src="./shopping_card_icon.png"
              alt=""
              onClick={e => dispatch(addToShoppingList(standardItems[0].id))}
            ></Icon>
            <Icon
              src="./home_icon.png"
              alt=""
              onClick={e =>
                dispatch(
                  addToPantry(
                    standardItems[0].id,
                    standardItems[0].time_until_expiry
                  )
                )
              }
            ></Icon>
            <Icon
              src="./no_icon.png"
              alt=""
              onClick={e =>
                dispatch(removeFromStandardItems(standardItems[0].id))
              }
            ></Icon>
          </Wrapper>
        </Card>
      )}
    </MainContent>
  ); //end return
} //closingtag function
