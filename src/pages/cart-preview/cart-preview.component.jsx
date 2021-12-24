import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
// import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import config from '../../config/config.js';

import { selectCartItems, selectCartSubtotal } from '../../store/cart';

import './cart-preview.styles.scss';

const CartPreviewPage = ({ cartItems, subtotal }) => {
  console.log(cartItems);
  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <div className="cart">
        <div className="products">
          {cartItems?.map((cartItem) => {
            return <CheckoutItem cartItem={cartItem} />;
          })}
        </div>

        <div className="cart-total">
          <p>
            <span>Subtotal</span>
            <span>{subtotal}</span>
          </p>
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
    // <div className="checkout-page">
    //   <div className="checkout-header">
    //     <div className="header-block">
    //       <span>Product</span>
    //     </div>

    //     <div className="header-block">
    //       <span>Description</span>
    //     </div>

    //     <div className="header-block">
    //       <span>Quantity</span>
    //     </div>

    //     <div className="header-block">
    //       <span>Price</span>
    //     </div>

    //     <div className="header-block">
    //       <span>Remove</span>
    //     </div>
    //   </div>
    //   {cartItems?.map((cartItem) => (
    //     <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    //   ))}
    //   <div className="subtotal">
    //     <span>Subtotal: ${subtotal}</span>
    //   </div>
    // </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  subtotal: selectCartSubtotal,
});

export default connect(mapStateToProps)(CartPreviewPage);
