import React, { useEffect } from 'react';
import { useState } from 'react';
import config from '../../config/config';
import axios from 'axios';

import './view-product.styles.scss';

import { connect } from 'react-redux';
import { addProductToCart } from '../../store/cart';

const ViewProduct = ({ productSlug, addProductToCart }) => {
  console.log(productSlug);

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .request({
        baseURL: config.baseUrl,
        url: `/product/${productSlug}`,
        method: 'GET',
        params: {
          type: 'slug',
        },
      })
      .then((data) => setProduct(data.data));

    console.log(product);
  }, []);

  const [showcasing, setShowcasing] = useState({});
  const [addCount, setAddCount] = useState(1);

  return (
    <>
      View Product
      <div class="card-wrapper">
        <div class="card">
          <div class="product-imgs">
            <div class="img-display">
              <div class="img-showcase">
                <img src={showcasing} alt={product.description} />
              </div>
            </div>
            <div class="img-select">
              {/* {product && Array.prototype.map.call(product?.assets, (asset) => (
                <div className="img-item">
                  <a
                    onClick={() =>
                      setShowcasing(`${config.serverHost}${asset.path}`)
                    }
                    data-id={asset.id}
                  >
                    <img
                      src={`${config.serverHost}${asset.path}`}
                      alt={asset.description}
                    />
                  </a>
                </div>
              ))} */}
            </div>
          </div>
          <div class="product-content">
            <h2 class="product-title">{product.name}</h2>

            <div class="product-price">
              <p class="new-price">
                Price: <span>VND {product.basePrice}</span>
              </p>
            </div>

            <div class="product-detail">
              <h2>about this item: </h2>
              <p>{product.description}</p>
              <ul>
                {/* {product && Object.entries(product.properties).map(([key, value]) => (
                  <li>
                    {key}: <span>{value}</span>
                  </li>
                ))} */}
              </ul>
            </div>

            <div class="purchase-info">
              <input
                type="number"
                min="0"
                value={addCount}
                onChange={(e) => setAddCount(e.target.value)}
              />
              <button
                type="button"
                class="btn"
                onClick={() => addProductToCart(product.id, addCount)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addProductToCart })(ViewProduct);
