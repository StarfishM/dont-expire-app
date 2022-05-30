import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitialStandardProducts,
  addToPantry,
  addToShoppingList,
  removeFromStandardItems
} from "../actions";
import styled from "styled-components";
import { IconItemTinder } from "../StandardStyles";

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
    margin-bottom: 20px;
    width: 32vw;
  `;
  useEffect(() => {
    dispatch(getInitialStandardProducts());
  }, []);

  const MainContentItemTinder = styled.div`
    grid-area: "main";
    width: 100%;
    min-height: 81vh;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffcb77;
    left: 0px;
    top: 15vh;
  `;
  const Card = styled.div`
    min-height: 81vh;
    width: 45vw;
    background: #ffeac9;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  `;
  const ProductImage = styled.img`
    height: 70vh;
    width: 30vw;
    border-radius: 30px;
    object-fit: cover;
    margin: 20px;
    box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
    -webkit-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
    -moz-box-shadow: 0px -1px 15px 0px rgba(87, 71, 4, 0.43);
  `;

  if (!standardItems) {
    return null;
  }

  // const listItems = useSelector(state => state.standardItems);
  //<ProductImage src={standardItems[0].img_url} />

  return (
    <MainContentItemTinder>
      {standardItems.length === 0 && <h3>Out of standard items :( ...</h3>}
      {standardItems.length > 0 && (
        <Card>
          <ProductImage src={standardItems[0].img_url} />
          <Wrapper>
            <IconItemTinder
              src="./shopping_card_icon.png"
              alt=""
              onClick={e => dispatch(addToShoppingList(standardItems[0].id))}
            ></IconItemTinder>
            <IconItemTinder
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
            ></IconItemTinder>
            <IconItemTinder
              src="./no_icon.png"
              alt=""
              onClick={e =>
                dispatch(removeFromStandardItems(standardItems[0].id))
              }
            ></IconItemTinder>
          </Wrapper>
        </Card>
      )}
    </MainContentItemTinder>
  ); //end return
} //closingtag function
