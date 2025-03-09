import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, compareProductPrices, getProducts } from '../../services/api';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import ProductList from '../../components/ProductList/ProductList';
import { FaArrowLeft, FaSpinner } from 'react-icons/fa';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Fetch product details
        const productData = await getProduct(productId);
        setProduct(productData);
        
        // Fetch price comparison
        const comparisonData = await compareProductPrices(productId);
        setComparison(comparisonData);
        
        // Fetch related products (same brand)
        if (productData.brand) {
          const relatedData = await getProducts({ brand: productData.brand });
          // Filter out the current product and limit to 4 products
          const filtered = relatedData
            .filter(p => p.id !== productId)
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError('Failed to load product. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [productId]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <span>Loading product details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">Go Back to Home</Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="not-found-container">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">Go Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          <FaArrowLeft />
          <span>Back to Products</span>
        </Link>
        
        <ProductDetail 
          product={product}
          comparison={comparison}
        />
        
        {relatedProducts.length > 0 && (
          <section className="related-products">
            <h2 className="section-title">More {product.brand} Monitors</h2>
            <ProductList 
              products={relatedProducts}
              loading={false}
              error={null}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;