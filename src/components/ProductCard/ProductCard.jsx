import React from 'react';
import { Link } from 'react-router-dom';
import { FaStore, FaTag } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  // Find the best (lowest) price
  const bestPrice = product.prices.length > 0 
    ? product.prices.reduce((min, price) => price.price < min.price ? price : min, product.prices[0])
    : null;

  // Count available stores
  const storeCount = product.prices.length;

  // Get first store with image available (or placeholder)
  const imageUrl = product.image_url || (product.prices.length > 0 && product.prices[0].store.imageUrl) || 'https://via.placeholder.com/300x200';

  return (
    <div className="product-card card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={imageUrl} alt={product.name} />
          
          {product.specs && product.specs.gaming && (
            <span className="badge-gaming">Gaming</span>
          )}
          
          {storeCount > 1 && (
            <div className="compare-badge">
              <FaStore className="compare-icon" />
              <span>{storeCount} stores</span>
            </div>
          )}
        </div>
        
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h3 className="product-name">{product.model}</h3>
          
          <div className="product-specs">
            {product.size && (
              <span className="spec-item">{product.size}"</span>
            )}
            {product.resolution && (
              <span className="spec-item">{product.resolution}</span>
            )}
            {product.refresh_rate && (
              <span className="spec-item">{product.refresh_rate} Hz</span>
            )}
            {product.panel_type && (
              <span className="spec-item">{product.panel_type}</span>
            )}
          </div>
          
          {bestPrice && (
            <div className="product-price">
              <div className="price-label">
                <FaTag />
                <span>Best Price:</span>
              </div>
              <div className="price">{bestPrice.price.toLocaleString()} MKD</div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
