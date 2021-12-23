import React from 'react';
import { connect } from 'react-redux';

import config from '../../config/config.js';
import { updateCartLineItem, removeCartLineItem } from '../../store/cart.js';
// import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions.js'

import './checkout-item.styles.scss';
// import { removeItemFromCart } from '../../redux/cart/cart.utils.js';

const CheckoutItem = ({ cartItem, updateCartLineItem, removeCartLineItem }) => {
  const { id, product, price, discountPerItem, quantity, lineTotal } = cartItem;
  const { productName, productAssets } = product;
  const firstImageUrl = productAssets[0]
    ? config.serverHost + productAssets[0].path
    : null;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={firstImageUrl} alt="item" />
      </div>
      <span className="name">{productName}</span>
      <span className="quantity">
        <div className="arrow" onClick={updateCartLineItem(id, quantity - 1)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={updateCartLineItem(id, quantity + 1)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeCartLineItem(id)}>
        &#10005;
      </div>
    </div>
  );
};

// const mapDispatchToProps = dispatch => ({
//   // clearItem: item => dispatch(clearItemFromCart(item)),
//   // addItem:  item => dispatch(addItem(item)),
//   // removeItem: item => dispatch(removeItem(item))
//   updateCartLineItem
// })

export default connect(null, { updateCartLineItem, removeCartLineItem })(
  CheckoutItem
);
