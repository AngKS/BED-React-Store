import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Cart from './components/cart/Cart';


import Home from './components/pages/Home';
import Store from './components/pages/Store'
import Product from './components/product/Product';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import MultiPage from './components/pages/MultiPage';

// Name: Ang Kah Shin
// Class: DAAA / FT / 1B / 04
// Admin: P2004176


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/store" exact component={Store} />
          <Route path="/product" exact component={Product} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/multipage" exact component={MultiPage} />
        </Switch>
        
      </Router>
      
    </div>
  );
}

export default App;
