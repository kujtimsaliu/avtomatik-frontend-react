import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Avtomatik</h3>
            <p>The best place to compare monitor prices across different stores.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Navigation</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/compare">Compare</Link></li>
                <li><Link to="/brands">Brands</Link></li>
                <li><Link to="/deals">Best Deals</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>Stores</h4>
              <ul>
                <li><a href="https://www.neptun.mk" target="_blank" rel="noopener noreferrer">Neptun</a></li>
                <li><a href="https://www.anhoch.com" target="_blank" rel="noopener noreferrer">Anhoch</a></li>
                <li><Link to="/stores">All Stores</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>About</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Avtomatik. All rights reserved.</p>
          <p>Prices and product availability are subject to change.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
