import React, { useState } from 'react';
import { connect } from 'react-redux';

import config from '../../config/config.js';
import { updateCartLineItem, removeCartLineItem } from '../../store/cart.js';
// import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions.js'

import './checkout-item.styles.scss';
// import { removeItemFromCart } from '../../redux/cart/cart.utils.js';

const CheckoutItem = ({ cartItem, updateCartLineItem, removeCartLineItem }) => {
  const { id, product, price, discountPerItem, quantity, lineTotal } = cartItem;
  const { name, assets } = product;
  const firstImageUrl = assets[0] ? config.serverHost + assets[0].path : null;
  const [qty, setQty] = useState(quantity);

  return (
    <div className="product">
      <img src={firstImageUrl} alt="item" />
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <h4 className="product-price">{price}</h4>
        <p className="product-quantity">
          Quantity:{' '}
          <input
            value={qty}
            name=""
            type="number"
            onChange={(e) => {
              setQty(e.target.value);
              updateCartLineItem(id, e.target.value);
            }}
          ></input>
        </p>
        <p className="product-remove">
          <i className="fa fa-trash" aria-hidden={'true'}></i>
          <span className="remove" onClick={() => removeCartLineItem(id)}>
            Remove
          </span>
        </p>
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
