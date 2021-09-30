import React, { useState } from "react";
import "./css/App.css";
import MyHeader from "./header/";
import MyContent from "./content/";

/// CONTEXT API HOOK, DATA SHARABLE
import MyData from "./data";

function App() {
  const [data, setData] = useState([]);
  const favoriteList = [];
  favoriteList.push(data.filter((song) => song.love));

  return (
    <div className='App'>
      {/* USING CONTEXT API HOOK TO GLOBALIZE THE DATA */}
      <MyData.Provider value={{ data, setData, favoriteList }}>
        {/* MY HEADER */}
        <MyHeader />

        {/* CONTENT WILL BE DISPLAYED HERE [ SEARCH BAR / HISTORY / STATS ]*/}
        <MyContent />
      </MyData.Provider>
    </div>
  );
}

export default App;
