import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { FaSpinner } from 'react-icons/fa';
import './ProductList.css';

const ProductList = ({ products, loading, error, title }) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    if (products) {
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      setVisibleProducts(products.slice(0, indexOfLastProduct));
    }
  }, [products, currentPage]);

  const loadMoreProducts = () => {
    setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="loading">
        <FaSpinner className="spinner" />
        <span>Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <p>No products found.</p>
      </div>
    );
  }

  const showLoadMore = products.length > visibleProducts.length;

  return (
    <div className="product-list-container">
      {title && <h2 className="section-title">{title}</h2>}

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showLoadMore && (
        <div className="load-more-container">
          <button className="btn btn-primary load-more-btn" onClick={loadMoreProducts}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;