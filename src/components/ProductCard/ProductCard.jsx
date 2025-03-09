import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStore, FaTag, FaImage } from 'react-icons/fa';
import './ProductCard.css';

// API URL - adjust as needed
const API_URL = 'http://127.0.0.1:8000';

const ProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);

  // Find the best (lowest) price
  const bestPrice = product.prices && product.prices.length > 0 
    ? product.prices.reduce((min, price) => price.price < min.price ? price : min, product.prices[0])
    : null;

  // Count available stores
  const storeCount = product.prices ? product.prices.length : 0;

  // Get original image URL
  const originalImageUrl = product.image_url || 
    (product.prices && product.prices.length > 0 && product.prices[0].store && product.prices[0].store.imageUrl) || 
    'https://via.placeholder.com/300x200';

  // Get the appropriate image URL based on the source
  const getProxyImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200';
    
    if (url.includes('anhoch.com')) {
      const encodedUrl = encodeURIComponent(url);
      return `${API_URL}/proxy-image/?url=${encodedUrl}`;
    }
    
    return url;
  };

  // Apply the proxy if needed
  const imageUrl = getProxyImageUrl(originalImageUrl);

  // Handle image loading errors
  const handleImageError = () => {
    console.error(`Failed to load image: ${imageUrl}`);
    setImgError(true);
  };

  return (
    <div className="product-card card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          {!imgError ? (
            <img 
              src={imageUrl} 
              alt={product.name || 'Product image'}
              onError={handleImageError}
            />
          ) : (
            <div className="image-placeholder">
              <FaImage size={48} color="#ccc" />
              <div>{product.brand || ''} {product.model || product.name || 'Product'}</div>
            </div>
          )}
          
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
          <div className="product-brand">{product.brand || 'Unknown Brand'}</div>
          <h3 className="product-name">{product.model || product.name || 'Unknown Model'}</h3>
          
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

export default ProductCard