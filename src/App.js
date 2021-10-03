import React from "react";
import "./css/App.css";
import MyHeader from "./header/";
import MyContent from "./content/";
import { UserProvider } from "./data";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <React.StrictMode>
      <UserProvider>
        <Router>
          <div className='App'>
            <MyHeader />
            {/* CONTENT: [ SEARCH BAR / HISTORY / STATS ]*/}
            <MyContent />
          </div>
        </Router>
      </UserProvider>
    </React.StrictMode>
  );
}

export default App;
