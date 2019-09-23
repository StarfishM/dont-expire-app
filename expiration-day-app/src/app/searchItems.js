import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToPantry, addToShoppingList } from "../actions";
import axios from "../axios";
// import { Link } from "react-router-dom";

export default function SearchItems() {
  const [searchInput, setSearchInput] = useState();
  const [itemsList, setItemsList] = useState([]);
  const dispatch = useDispatch();

  const onInputChange = e => {
    setSearchInput(e.target.value);
    console.log("inputSearch:", searchInput);
  };

  useEffect(() => {
    let ignore = false;
    (async () => {
      const { data } = await axios.get(`find/${searchInput || ""}`);
      console.log(("DB RETURN GET/find:", data));
      if (!ignore) {
        setItemsList(data.items);
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
      <h2>ADD ITEMS TO PANTRY/LIST SEARCH ITEMS COMPONENT</h2>
      <h2>I AM A CHANGE</h2>
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
          {itemsList &&
            itemsList.map(item => (
              <div className="search-result" key={item.id}>
                <img src={item.img_url} alt={item.name} />
                {item.name}
                <img
                  onClick={e => dispatch(addToShoppingList(item.id))}
                  src="./shopping_card_icon.png"
                  alt={item.name}
                />
                <img
                  onClick={e => dispatch(addToPantry(item.id))}
                  src="./home_icon.png"
                  alt={item.name}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}