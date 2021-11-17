import { Routes, Route, Outlet, Link } from "react-router-dom";

import Layout from './components/layout/Layout';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" elements={<Layout />}>
          <Route index element={<Home/>}/>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
