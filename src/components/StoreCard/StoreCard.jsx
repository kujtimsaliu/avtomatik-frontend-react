import React from 'react';
import { FaExternalLinkAlt, FaStore, FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';
import './StoreCard.css';

const StoreCard = ({ pricing, isBestPrice, priceDifference }) => {
  const { store, price, stock_status, url } = pricing;
  
  const getStockStatusIcon = () => {
    if (!stock_status) return <FaQuestionCircle className="status-icon unknown" />;
    
    if (stock_status.toLowerCase().includes('in stock')) {
      return <FaCheckCircle className="status-icon in-stock" />;
    } else if (stock_status.toLowerCase().includes('out of stock')) {
      return <FaTimesCircle className="status-icon out-of-stock" />;
    } else {
      return <FaQuestionCircle className="status-icon unknown" />;
    }
  };

  return (
    <div className={`store-card ${isBestPrice ? 'best-price' : ''}`}>
      {isBestPrice && <div className="best-price-badge">Best Price</div>}
      
      <div className="store-info">
        <div className="store-logo">
          <FaStore />
        </div>
        
        <div className="store-details">
          <h4 className="store-name">{store.name}</h4>
          <div className="store-status">
            {getStockStatusIcon()}
            <span>{stock_status || 'Unknown'}</span>
          </div>
        </div>
      </div>
      
      <div className="price-section">
        <div className="price-amount">
          {price.toLocaleString()} MKD
        </div>
        
        {!isBestPrice && priceDifference > 0 && (
          <div className="price-difference">
            +{priceDifference.toLocaleString()} MKD
          </div>
        )}
        
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="view-store-btn"
        >
          <span>View in Store</span>
          <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
};

export default StoreCard;