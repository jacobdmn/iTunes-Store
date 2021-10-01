import React from "react";
import "./css/App.css";
import MyHeader from "./header/";
import MyContent from "./content/";
import { UserProvider } from "./data";

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <div className='App'>
          {/* MY HEADER */}
          <MyHeader />
          {/* CONTENT TO HOLD [ SEARCH BAR / HISTORY / STATS ]*/}
          <MyContent />
        </div>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
