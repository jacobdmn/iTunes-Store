import React, { useContext } from "react";
import "./css/App.css";
import MyHeader from "./header/";
import MyContent from "./content/";
import Test from "./test";
import { UserProvider } from "./data";

function App() {
  return (
    <UserProvider>
      <div className='App'>
        {/* MY HEADER */}
        <MyHeader />
        {/* CONTENT WILL BE DISPLAYED HERE [ SEARCH BAR / HISTORY / STATS ]*/}
        <MyContent />
        {/* <Test /> */}
      </div>
    </UserProvider>
  );
}

export default App;
