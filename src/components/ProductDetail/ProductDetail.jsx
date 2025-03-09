import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaImage } from 'react-icons/fa';
import StoreCard from '../StoreCard/StoreCard';
import './ProductDetail.css';

// API URL - adjust as needed
const API_URL = 'http://127.0.0.1:8000';

const ProductDetail = ({ product, comparison }) => {
  const [imgError, setImgError] = useState(false);
  
  if (!product) return null;

  // Find the best (lowest) price
  const bestPrice = comparison?.best_price || 
    (product.prices && product.prices.length > 0 
      ? product.prices.reduce((min, price) => price.price < min.price ? price : min, product.prices[0])
      : null);

  // Sort prices from lowest to highest
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);

  // Get the appropriate image URL based on the source
  const getProxyImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/400x300';
    
    if (url.includes('anhoch.com')) {
      const encodedUrl = encodeURIComponent(url);
      return `${API_URL}/proxy-image/?url=${encodedUrl}`;
    }
    
    return url;
  };

  // Apply the proxy if needed
  const imageUrl = getProxyImageUrl(product.image_url);

  // Handle image loading errors
  const handleImageError = () => {
    console.error(`Failed to load image: ${imageUrl}`);
    setImgError(true);
  };

  return (
    <div className="product-detail">
      <div className="product-main">
        <div className="product-image-container">
          {!imgError ? (
            <img 
              src={imageUrl} 
              alt={product.name} 
              className="product-image"
              onError={handleImageError}
            />
          ) : (
            <div className="image-placeholder detail-placeholder">
              <FaImage size={64} color="#ccc" />
              <div>{product.brand || ''} {product.model || product.name || 'Product'}</div>
            </div>
          )}
        </div>
        
        <div className="product-info-container">
          <div className="product-brand">{product.brand}</div>
          <h1 className="product-title">{product.model}</h1>
          
          <div className="product-meta">
            {product.size && (
              <div className="meta-item">
                <span className="meta-label">Size:</span>
                <span className="meta-value">{product.size}"</span>
              </div>
            )}
            
            {product.resolution && (
              <div className="meta-item">
                <span className="meta-label">Resolution:</span>
                <span className="meta-value">{product.resolution}</span>
              </div>
            )}
            
            {product.refresh_rate && (
              <div className="meta-item">
                <span className="meta-label">Refresh Rate:</span>
                <span className="meta-value">{product.refresh_rate} Hz</span>
              </div>
            )}
            
            {product.panel_type && (
              <div className="meta-item">
                <span className="meta-label">Panel Type:</span>
                <span className="meta-value">{product.panel_type}</span>
              </div>
            )}
          </div>
          
          {bestPrice && (
            <div className="best-price-container">
              <div className="best-price-label">Best Price:</div>
              <div className="best-price-value">{bestPrice.price.toLocaleString()} MKD</div>
              <div className="best-price-store">
                at <span>{bestPrice.store.name}</span>
              </div>
            </div>
          )}
          
          <div className="product-specs">
            <h3>Specifications</h3>
            <div className="specs-grid">
              {product.specs && Object.entries(product.specs).map(([key, value]) => {
                // Skip numeric specs already shown above
                if (['size', 'refresh_rate'].includes(key)) return null;
                
                // Format boolean values
                if (typeof value === 'boolean') {
                  return (
                    <div className="spec-row" key={key}>
                      <div className="spec-name">{key.replace(/_/g, ' ')}</div>
                      <div className="spec-value">
                        {value ? 
                          <><FaCheckCircle className="spec-icon yes" /> Yes</> : 
                          <><FaTimesCircle className="spec-icon no" /> No</>
                        }
                      </div>
                    </div>
                  );
                }
                
                // Format other values
                return (
                  <div className="spec-row" key={key}>
                    <div className="spec-name">{key.replace(/_/g, ' ')}</div>
                    <div className="spec-value">{value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-prices">
        <h2>Available at {product.prices.length} {product.prices.length === 1 ? 'store' : 'stores'}</h2>
        
        <div className="prices-list">
          {sortedPrices.map((pricing) => (
            <StoreCard
              key={pricing.id}
              pricing={pricing}
              isBestPrice={bestPrice && pricing.id === bestPrice.id}
              priceDifference={pricing.price - (bestPrice ? bestPrice.price : 0)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail