import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>HEADER</header>
      <main><Outlet/></main>
    </div>
  )
}

export default Layout
