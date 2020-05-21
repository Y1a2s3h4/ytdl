import React from "react";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import YT_Thumbnail from "./components/YT_Thumbnail";
import { StyleReset } from "react-atomize";
// import Download from "./components/Download";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <Router>
      <StyleReset />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/ytdl_thumbnail" component={YT_Thumbnail} />
        {/* <Route path="/ytdl_thumbnail/:url" component={Download} /> */}
      </Switch>
    </Router>
  );
}

export default App;
