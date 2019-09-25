import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPantry, addToShoppingList } from "../actions";
import axios from "../axios";
import styled from "styled-components";

// import { Link } from "react-router-dom";

const MainContent = styled.div`
  grid-area: "main";
  background: lightyellow;
  width: 100vw;
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
        <h2>ADD ITEMS TO PANTRY/LIST SEARCH ITEMS COMPONENT</h2>
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
                  <img src={item.img_url} alt={item.name} />
                  {item.name}
                  <img
                    onClick={e => dispatch(addToShoppingList(item.id))}
                    src="./shopping_card_icon.png"
                    alt={item.name}
                  />
                  <img
                    onClick={e =>
                      dispatch(addToPantry(item.id, item.expiry_date))
                    }
                    src="./home_icon.png"
                    alt={item.name}
                  />
                </div>
              ))}
          </div>
        </div>
      </MainContent>
    </div>
  );
}
