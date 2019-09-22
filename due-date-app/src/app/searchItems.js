import React, { useState, useEffect } from "react";
import axios from "../axios";
// import { Link } from "react-router-dom";

export default function SearchItems() {
  const [searchInput, setSearchInput] = useState(); //inputField
  const [itemsList, setItemsList] = useState([]); //List of Users

  const onInputChange = e => {
    setSearchInput(e.target.value);
    console.log("inputSearch:", searchInput);
  };

  const addItemToList = e=>{
      console.log("clicked on shopping cart");
  }

  const addItemToPantry = e=>{
      console.log("clicked on home icon");
  }
  useEffect(
    () => {
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
    },
    [searchInput]
  );

  return (
    <div>
      <h2>ADD ITEMS TO PANTRY SEARCH ITEMS COMPONENT</h2>
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
                <img onClick= {addItemToList}  src="./shopping_card_icon.png" alt= {item.name} />
                <img onClick= {addItemToPantry} src="./home_icon.png" alt= {item.name}/>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
