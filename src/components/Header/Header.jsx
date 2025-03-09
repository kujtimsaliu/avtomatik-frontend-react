import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>
              <span className="logo-text">Avtomatik</span>
              <span className="logo-subtitle">knaqu</span>
            </h1>
          </Link>
        </div>

        <div className={`nav-search-container ${mobileMenuOpen ? 'active' : ''}`}>
          <nav className="main-nav">
            <ul>
              <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/compare" onClick={() => setMobileMenuOpen(false)}>Compare</Link></li>
              <li><Link to="/brands" onClick={() => setMobileMenuOpen(false)}>Brands</Link></li>
              <li><Link to="/deals" onClick={() => setMobileMenuOpen(false)}>Best Deals</Link></li>
            </ul>
          </nav>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search monitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="mobile-controls">
          <button className="mobile-search-btn">
            <FaSearch />
          </button>
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
