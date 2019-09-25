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
  const delteItem = id => {
    dispatch(deleteFromItems(id));
    dispatch(getExpiryItems());
  };

  useEffect(() => {
    console.log("useEffec in ExpiryList running");
    dispatch(getExpiryItems());
  }, []);

  const expiryItems = useSelector(state => state.expiryItems);

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
                  <p>{item.expires_after_date_bought}</p>
                  <p onClick={() => delteItem(item.id)}>x</p>
                </ListItem>
              );
            })}
        </MainContent>
      )}
      {expiryItems.length > 0 && <Notify> {expiryItems.length}</Notify>}
    </section>
  );
}