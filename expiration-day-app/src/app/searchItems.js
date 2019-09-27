import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToPantry, addToShoppingList } from "../actions";
import axios from "../axios";
import styled from "styled-components";

// import { Link } from "react-router-dom";

const MainContent = styled.div`
  padding-left: 20px;
  padding-top: 20px;
  grid-area: "main";
  background: lightyellow;
  min-height: 81vh;
  width: 100%;
`;

const ImgSearch = styled.img`
  object-fit: cover;
`;

const WrapperClickIcon = styled.div`
  display: flex;
`;
const ClickIcon = styled.img`
  padding-left: 10px;
  padding-right: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
export default function SearchItems() {
  const [searchInput, setSearchInput] = useState();
  const [searchItemsList, setSearchItemsList] = useState([]);
  const dispatch = useDispatch();

  const onInputChange = e => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    let ignore = false;
    (async () => {
      const { data } = await axios.get(`find/${searchInput || ""}`);
      if (!ignore) {
        setSearchItemsList(data.items);
      } else {
        console.log("IGNORED");
      }
    })();
    return () => {
      ignore = true;
    };
  }, [searchInput]);

  return (
    <div>
      <MainContent>
        <input
          name="finditem"
          placeholder="search items"
          onChange={onInputChange}
          defaultValue={searchInput}
        />
        <div>
          {searchInput ? (
            <p>Searching for {searchInput}</p>
          ) : (
            <p>Items suggestions</p>
          )}
          <div className="search-display-container">
            {searchItemsList &&
              searchItemsList.map(item => (
                <div className="search-result" key={item.id}>
                  <ImgSearch
                    src={
                      item.img_url ||
                      "https://images.unsplash.com/photo-1566273873209-5ceccc0d1514?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                    }
                    alt={item.name}
                  />
                  {item.name}
                  <WrapperClickIcon>
                    <ClickIcon
                      onClick={e => dispatch(addToShoppingList(item.id))}
                      src="./shopping_card_icon.png"
                      alt={item.name}
                    />
                    <ClickIcon
                      onClick={e =>
                        dispatch(addToPantry(item.id, item.expiry_date))
                      }
                      src="./home_icon.png"
                      alt={item.name}
                    />
                  </WrapperClickIcon>
                </div>
              ))}
          </div>
        </div>
      </MainContent>
    </div>
  );
}
