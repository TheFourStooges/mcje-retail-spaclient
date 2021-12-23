import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import {auth} from '../../firebase/firebase.utils.js';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component.jsx';

import { logout } from '../../store/auth';
// import { selectCurrentUser } from '../../redux/user/user.selector.js';

import './header.styles.scss';

const Header = ({ authenticated, hidden, logout, sections }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>

    <div className="options">
      {/* <Link className="option" to="/shop">
        SHOP
      </Link> */}

      {sections.map(section => <Link className='option' to={'/' + section.linkUrl}>{section.title.toUpperCase()}</Link> )}

      {/* <Link className="option" to="/shop">
        CONTACT
      </Link> */}
      {authenticated ? (
        <div className="option" onClick={() => /*auth.signOut()*/ logout()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/login">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
    <p className="king">&#169 2021</p>
  </div>
);

const mapStateToProps = (state) => ({
  hidden: state.cart.hidden,
  authenticated: state.auth.authenticated,
  sections: state.directory.sections,
});

export default connect(mapStateToProps, { logout })(Header);