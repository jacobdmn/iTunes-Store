import React, { useState } from "react";
import "./css/App.css";
import MyHeader from "./header/header";
import MyContent from "./content/content";
import dataBase from "./data";

function App() {
  const [data, setData] = useState(dataBase);
  const favoriteList = data.filter((song) => song.love);
  return (
    <div className='App'>
      <MyHeader data={data} setData={setData} favoriteList={favoriteList} />
      <MyContent data={data} setData={setData} favoriteList={favoriteList} />
    </div>
  );
}

export default App;
