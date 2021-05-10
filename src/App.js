import Header from "./components/header.js";
import Home from "./pages/home.js";
import { Rankings } from "./pages/rankings.js";
import { Search } from "./pages/search.js";
import { Login } from "./pages/login.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>  
      <Header />
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/rankings">
            <Rankings />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/factors">
            
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
