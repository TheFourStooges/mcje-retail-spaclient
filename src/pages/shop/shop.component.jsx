import React, { useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import config from '../../config/config';
import { loadCategories } from '../../store/categories';
import { loadProducts } from '../../store/products';
import axios from 'axios';
import ViewProducts from '../../components/view-products/view-products.component';

const ShopPage = ({ categories, products, loadCategories, loadProducts }) => {
  const { categorySlug } = useParams();
  console.log(categorySlug);
  let category;
  useEffect(() => {
    loadCategoryProducts(categorySlug);
  }, []);

  const loadCategoryProducts = async (slug) => {
    const categories = await axios.request({
      baseURL: config.baseUrl,
      url: '/category',
      params: {
        slug: slug,
      },
    });

    category = categories.data.data.find((c) => c.slug === slug);
    const categoryId = category?.id;

    console.log(categoryId, slug);

    loadProducts(25, 1, categoryId);
  };

  // console.log(categoryId);

  return (
    <div className="shop-page">
      <ViewProducts
        categoryName={category?.name}
        categorySlug={category?.slug}
        products={products.list}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  categories: state.entities.categories,
  products: state.entities.products,
});

export default connect(mapStateToProps, { loadCategories, loadProducts })(
  ShopPage
);
