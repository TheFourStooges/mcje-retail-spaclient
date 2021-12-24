import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import config from '../../config/config';
import { loadCategories } from '../../store/categories';
import { loadProducts } from '../../store/products';
import axios from 'axios';
import ViewProduct from '../../components/view-product/view-product.component';

const ProductPage = ({
  categories,
  products,
  loadCategories,
  loadProducts,
}) => {
  const { productSlug } = useParams();
  

  return (
    <div className="shop-page">
      <ViewProduct productSlug={productSlug} />
      {productSlug}
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.entities.categories,
  products: state.entities.products,
});

export default connect(mapStateToProps, { loadCategories, loadProducts })(
  ProductPage
);
