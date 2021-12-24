import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  loadCheckoutToken,
  updateCheckoutToken,
  captureCheckoutToken,
} from '../../store/checkout';
import { loadShippingMethods } from '../../store/shippingMethods';

import CheckoutForm from '../../components/checkout-form/checkout-form.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Redirect, useHistory } from 'react-router-dom';

const CheckoutPage = ({
  checkout,
  cart,
  shippingMethods,
  loadCheckoutToken,
  updateCheckoutToken,
  captureCheckoutToken,
  loadShippingMethods,
}) => {
  useEffect(() => {
    loadCheckoutToken();
    loadShippingMethods();
  }, []);

  const history = useHistory();

  const formSubmitHandler = (fields) => {
    console.log(fields);
    const {
      name,
      email,
      shippingName,
      shippingPhone,
      streetLine1,
      ward,
      district,
      city,
      postalCode,
      country,
      paymentMethod,
      cardNumber,
      cardHolder,
      cardCvv,
      cardExpirationMonth,
      cardExpirationYear,
    } = fields;

    const newBody = {
      customer: {
        name,
        email,
      },
      shippingAddress: {
        name: shippingName,
        phone: shippingPhone,
        streetLine1: streetLine1,
        ward: ward,
        district: district,
        city: city,
        postalCode: postalCode,
        country: country,
      },
      paymentInformation: {
        paymentMethod: paymentMethod,
        cardNumber: cardNumber,
        cardCvv: cardCvv,
        cardExpiration: {
          month: cardExpirationMonth,
          year: cardExpirationYear,
        },
      },
    };

    console.log(newBody);
    captureCheckoutToken(newBody);
    history.push('/');
  };

  return (
    <div className="row">
      <h1>{'Checkout'}</h1>
      <div className="col-lg-8">
        <CheckoutForm submitHandler={formSubmitHandler} />
      </div>
      <div className="col-lg-4">
        <Paper className="card">
          <div className="card__header">
            <div className="card__header__title">Order Overview</div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Price/item</TableCell>
                  {/* <TableCell>Discount/item</TableCell> */}
                  <TableCell>Quantity</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.content.cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product?.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    {/* <TableCell>{item.discountPerItem}</TableCell> */}
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.lineTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Total Items</TableCell>
                  <TableCell>{checkout?.content.totalItems}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>{checkout?.content.subtotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Shipping Cost</TableCell>
                  <TableCell>{checkout?.content.shipping}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax</TableCell>
                  <TableCell>{checkout?.content.tax}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{checkout?.content.total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total with Tax</TableCell>
                  <TableCell>{checkout?.content.totalWithTax}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper className="card">
          <div className="card__header">
            <div className="card__header__title">Shipping Method</div>
          </div>
          {shippingMethods?.list.map((method) => {
            return (
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="shippingMethod"
                  id={method.id}
                  checked={checkout.content.shippingMethodId === method.id}
                  onChange={(e) => updateCheckoutToken(e.target.id)}
                />
                <label
                  class="form-check-label"
                  for={method.id}
                  style={{ fontWeight: 'bold' }}
                >
                  {method.provider} - {method.description} - {method.price}
                </label>
              </div>
            );
          })}
          {/* <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Default radio
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Default checked radio
            </label>
          </div> */}
        </Paper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  cart: state.cart,
  shippingMethods: state.entities.shippingMethods,
});

export default connect(mapStateToProps, {
  loadCheckoutToken,
  updateCheckoutToken,
  captureCheckoutToken,
  loadShippingMethods,
})(CheckoutPage);
