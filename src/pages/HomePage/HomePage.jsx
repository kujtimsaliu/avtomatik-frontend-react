import React, { useState, useEffect } from 'react';
import { getProducts, getMultiStoreProducts } from '../../services/api';
import ProductList from '../../components/ProductList/ProductList';
import Filters from '../../components/Filters/Filters';
import { FaSearch, FaInfoCircle } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts(filters);
        setProducts(productsData);
        
        // Also fetch products available in multiple stores for comparison section
        const compareData = await getMultiStoreProducts(2);
        setCompareProducts(compareData.slice(0, 4)); // Get first 4 products
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find the Perfect Monitor at the Best Price</h1>
            <p className="hero-description">
              Compare prices across multiple stores and find the best deals on monitors in Macedonia
            </p>
            
            <form className="hero-search-form">
              <input
                type="text"
                placeholder="Search for monitors by brand, model, or features..."
                className="hero-search-input"
              />
              <button type="submit" className="hero-search-button">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <div className="container">
        <section className="compare-section">
          <h2 className="section-title">Compare Prices and Save</h2>
          <div className="info-box">
            <FaInfoCircle />
            <p>
              These products are available in multiple stores, allowing you to compare
              prices and save money. Click on a product to see detailed price comparison.
            </p>
          </div>
          
          {!loading && compareProducts.length > 0 && (
            <ProductList 
              products={compareProducts}
              loading={false}
              error={null}
            />
          )}
        </section>
        
        <section className="browse-section">
          <h2 className="section-title">Browse All Monitors</h2>
          
          <div className="browse-container">
            <aside className="filters-sidebar">
              <Filters onFilterChange={handleFilterChange} />
            </aside>
            
            <div className="products-container">
              <ProductList 
                products={products}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;