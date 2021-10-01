import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBox from "./searchBox";
import Favorite from "./favorite";
import Statistics from "./statistics";
import Error from "./Error";

const MyContent = () => {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path='/'>
            <SearchBox />
          </Route>
          <Route exact path='/favorite'>
            <Favorite />
          </Route>
          <Route exact path='/statistics'>
            <Statistics />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </main>
  );
};

export default MyContent;
