import React, {useState, useEffect} from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart/Cart';

function App() {
  const [cart, setCart] = useState({});




  return (
    <div className="App">
      <Routes>
        <Route path="/" elements={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="cart" element={<Cart/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
