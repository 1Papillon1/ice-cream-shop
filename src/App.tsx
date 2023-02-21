import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Icecream from "./components/Icecream";
import About from "./components/About";
import Home from "./components/Home";
import Cart from "./components/Cart";
import "./styles/app.scss";
import { useAppSelector } from "./redux/app/hooks";
import { getMemoizedNumItems } from "./redux/icecreams/cartSlice";



function App() {
  const numItems = useAppSelector(getMemoizedNumItems);


  return (
  
    <Router>
          <nav className="navigation">
          <img className="navigation__image" src="./icecreams1.jpg" alt="image" />
            <h2 className="navigation__title">Ice Cream Shop</h2>
            <ul className="navigation__list">
              <li className="navigation__list__item">
                <Link className="link" to="/">Home</Link>
              </li>
              <li className="navigation__list__item" >
                <Link className="link"  to="/icecream">Ice creams</Link>
              </li>
              <li className="navigation__list__item" >
                <Link className="link"  to="/about">About</Link>
              </li>
              <li>
                <Link to="/cart">
                  <span className="span">{ numItems }</span>
                  <img className="icons" src="./cart.png" alt="image" />
                </Link>
              </li>
            </ul>
          </nav>

    <Switch>
      <Route path="/cart">
        <Cart />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/icecream">
        <Icecream />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>

    </Router>
  );
}

export default App;
