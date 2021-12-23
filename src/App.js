import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-sign-up.component';
import Header from './components/header/header.component';

import { createStructuredSelector } from 'reselect';
// import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";
import { connect } from 'react-redux';
import { loadCategories } from './store/categories';
import { loadUser } from './store/auth';
import { loadCart } from './store/cart';
// import { setCurrentUser } from './redux/user/user.actions';
// import { selectCurrentUser } from './redux/user/user.selector';

import './App.css';
import PrivateRoute from './common/PrivateRoute';

class App extends React.Component {
  componentDidMount() {
    const loadStuff = async () => {
      await this.props.loadUser();
      await this.props.loadCart();
      await this.props.loadCategories();
    };
    loadStuff();

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth){
    //     const userRef = await createUserProfileDocument(userAuth)

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       })
    //     });
    //   }

    //   setCurrentUser(userAuth)

    // })
  }

  componentWillUnmount() {
    // this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/login" exact component={SignInAndSignUp} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/shop/:categorySlug" component={ShopPage} />
          <PrivateRoute path="/shop" component={ShopPage} />
          <PrivateRoute exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loadCategories, loadUser, loadCart })(App);
