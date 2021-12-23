import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProductToCart } from '../../store/cart';
import config from '../../config/config';

import './view-products.styles.css';

const ViewProducts = ({ categoryName, categorySlug, products, addProductToCart }) => {
  return (
    <>
      <ul className="products">
        {products?.map((product) => {
          const { id, name, description, basePrice, assets, category } = product;
          const firstImagePath = assets[0] ? assets[0].path : null;
          const finalImagePath = config.serverHost + firstImagePath;
          // console.log(product);
          return (
            <li>
              <div className="product-item">
                <div className="product-top">
                  <div className="product-thumb">
                    <img src={firstImagePath ? finalImagePath : null} alt={product.name} />
                  </div>
                  <Link
                    to={`/product/${product.slug}`}
                    className="buy-now"
                  >
                    Buy Now
                  </Link>
                </div>

                <div className="product-info">
                  <Link className='product-cat' to={`/shop/${category.slug}`}>
                    {category.name}
                  </Link>
                  <Link to={`/product/${product.slug}`} className="product-name">
                    {name}
                  </Link>
                  <div className="product-price">{basePrice}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default connect(null, { addProductToCart })(ViewProducts);
