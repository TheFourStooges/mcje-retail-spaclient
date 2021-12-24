/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { connect } from 'react-redux';
import {
  loadCheckoutToken,
  updateCheckoutToken,
  captureCheckoutToken,
} from '../../store/checkout';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/card.scss';
import { Paper } from '@mui/material';

import config from '../../config/config';
// import attributesEnum from '../../config/attributesEnum';

const axios = require('axios');

// https://jasonwatmore.com/post/2020/10/14/react-hook-form-combined-add-edit-create-update-form-example
// https://jasonwatmore.com/post/2020/04/20/react-formik-combined-add-edit-create-update-form-example
const CheckoutForm = ({ submitHandler, onClose }) => {
  // If params has id defined => edit mode
  // const { history, match } = props;
  // const navigate = useNavigate();
  // Add mode = !Edit mode
  const isAddMode = false;

  const createValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email().required('Email is required'),
    shippingName: Yup.string().required('Name is required'),
    shippingPhone: Yup.string().required('Slug is required'),
    streetLine1: Yup.string().required('Street Line 1 required'),
    ward: Yup.string().required('Ward required'),
    district: Yup.string().required('District required'),
    city: Yup.string().required('City required'),
    postalCode: Yup.string().required('Postal Code required'),
    country: Yup.string().required('Country required'),
    paymentMethod: Yup.string().required('Payment Method required'),
    cardNumber: Yup.string(),
    cardCvv: Yup.string(),
    cardHolder: Yup.string(),
    cardExpirationMonth: Yup.string(),
    cardExpirationYear: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    formState,
  } = useForm({
    resolver: yupResolver(createValidationSchema),
  });

  const onSubmit = (fields) => {
    console.log('CheckoutForm onSubmit');
    submitHandler(fields);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Paper className="card">
        <div className="card__header">
          <div className="card__header__title">Customer</div>
        </div>
        <div className="row">
          <div className="form-group col">
            <label>Customer Name</label>
            <input
              {...register('name')}
              type="text"
              className={`form-control`}
            />
          </div>
          <div className="form-group col">
            <label>Customer Email Address</label>
            <input
              {...register('email')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>
      </Paper>

      <Paper className="card">
        <div className="card__header">
          <div className="card__header__title">Shipping Address</div>
        </div>
        <div className="row">
          <div className="form-group col">
            <label>Receipient's Name</label>
            <input
              {...register('shippingName')}
              type="text"
              className={`form-control`}
            />
          </div>
          <div className="form-group col">
            <label>Receipient's Phone</label>
            <input
              {...register('shippingPhone')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Street Line</label>
            <input
              {...register('streetLine1')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Ward</label>
            <input
              {...register('ward')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>District</label>
            <input
              {...register('district')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>City</label>
            <input
              {...register('city')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Postal Code</label>
            <input
              {...register('postalCode')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Country</label>
            <input
              {...register('country')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>
      </Paper>

      <Paper className="card">
        <div className="card__header">
          <div className="card__header__title">Payment Information</div>
        </div>
        <div className="row">
          <div className="form-group col">
            <label>Payment Method</label>
            <select {...register('paymentMethod')} className={'form-control'}>
              <option hidden disabled selected value>
                {' '}
                -- select an option --{' '}
              </option>
              {['card', 'bank-transfer', 'cash-on-delivery'].map(
                (selection, idx) => (
                  <option key={selection}>{selection}</option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Card Number</label>
            <input
              {...register('cardNumber')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Card CVV</label>
            <input
              {...register('cardCvv')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Cardholder's Name</label>
            <input
              {...register('cardHolder')}
              type="text"
              className={`form-control`}
            />
          </div>
        </div>

        <div className="row">
          <div className="form-group col">
            <label>Expiration Month (MM)</label>
            <input
              {...register('cardExpirationMonth')}
              type="number"
              min={1}
              max={12}
              className={`form-control`}
            />
          </div>
          <div className="form-group col">
            <label>Expiration Year (YY)</label>
            <input
              {...register('cardExpirationYear')}
              type="number"
              min={1}
              max={99}
              className={`form-control`}
            />
          </div>
        </div>
      </Paper>

      {/* // End */}

      {/* Submit and Reset button  */}
      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Save
        </button>
        <Link to={isAddMode ? '.' : '..'} className="btn btn-link">
          Cancel
        </Link>
      </div>
    </form>
  );
};

// const mapStateToProps = (state) => ({
//   checkout: state.checkout,
// });

export default CheckoutForm;
