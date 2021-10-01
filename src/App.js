import React from "react";
import "./css/App.css";
import MyHeader from "./header/";
import MyContent from "./content/";

function App() {
  return (
    <div className='App'>
      {/* MY HEADER */}
      <MyHeader />

      {/* CONTENT WILL BE DISPLAYED HERE [ SEARCH BAR / HISTORY / STATS ]*/}
      <MyContent />
    </div>
  );
}

export default App;
