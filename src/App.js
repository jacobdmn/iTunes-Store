import React, { useState } from "react";
import "./css/App.css";
import MyHeader from "./header/";
import MyContent from "./content/";

function App() {
  const [data, setData] = useState([]);
  const favoriteList = data.filter((song) => song.love);
  return (
    <div className='App'>
      <MyHeader />
      <MyContent data={data} setData={setData} favoriteList={favoriteList} />
    </div>
  );
}

export default App;
