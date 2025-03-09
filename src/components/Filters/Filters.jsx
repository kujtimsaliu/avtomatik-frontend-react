import React, { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaAngleDown } from 'react-icons/fa';
import { getBrands } from '../../services/api';
import './Filters.css';

const Filters = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    brand: initialFilters.brand || '',
    min_size: initialFilters.min_size || '',
    max_size: initialFilters.max_size || '',
    min_refresh_rate: initialFilters.min_refresh_rate || '',
    panel_type: initialFilters.panel_type || '',
    resolution: initialFilters.resolution || '',
    in_stock: initialFilters.in_stock || false,
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    display: true,
    performance: true,
    availability: true,
  });

  useEffect(() => {
    // Fetch brands from API
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFilters({
      ...filters,
      [name]: newValue,
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setMobileFiltersOpen(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      brand: '',
      min_size: '',
      max_size: '',
      min_refresh_rate: '',
      panel_type: '',
      resolution: '',
      in_stock: false,
    };
    
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const panelTypes = ['IPS', 'VA', 'TN', 'OLED', 'QD-OLED', 'Nano IPS'];
  const resolutions = [
    { value: '1920x1080', label: 'Full HD (1920x1080)' },
    { value: '2560x1440', label: 'QHD (2560x1440)' },
    { value: '3440x1440', label: 'Ultrawide QHD (3440x1440)' },
    { value: '3840x2160', label: '4K UHD (3840x2160)' },
  ];

  return (
    <div className="filters-container">
      <button 
        className="mobile-filter-toggle"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
      >
        <FaFilter /> Filters
      </button>
      
      <div className={`filters ${mobileFiltersOpen ? 'mobile-open' : ''}`}>
        <div className="filters-header">
          <h3>Filters</h3>
          <button 
            className="close-filters"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Brand Filter */}
        <div className="filter-section">
          <div 
            className="filter-heading"
            onClick={() => toggleSection('brand')}
          >
            <h4>Brand</h4>
            <FaAngleDown className={expandedSections.brand ? 'expanded' : ''} />
          </div>
          
          {expandedSections.brand && (
            <div className="filter-content">
              <select 
                name="brand"
                value={filters.brand}
                onChange={handleInputChange}
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        {/* Display Filter */}
        <div className="filter-section">
          <div 
            className="filter-heading"
            onClick={() => toggleSection('display')}
          >
            <h4>Display</h4>
            <FaAngleDown className={expandedSections.display ? 'expanded' : ''} />
          </div>
          
          {expandedSections.display && (
            <div className="filter-content">
              <div className="filter-group">
                <label>Screen Size (inches)</label>
                <div className="range-inputs">
                  <input
                    type="number"
                    name="min_size"
                    placeholder="Min"
                    value={filters.min_size}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    name="max_size"
                    placeholder="Max"
                    value={filters.max_size}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>
              
              <div className="filter-group">
                <label>Resolution</label>
                <select
                  name="resolution"
                  value={filters.resolution}
                  onChange={handleInputChange}
                >
                  <option value="">All Resolutions</option>
                  {resolutions.map(res => (
                    <option key={res.value} value={res.value}>{res.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label>Panel Type</label>
                <select
                  name="panel_type"
                  value={filters.panel_type}
                  onChange={handleInputChange}
                >
                  <option value="">All Panel Types</option>
                  {panelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Performance Filter */}
        <div className="filter-section">
          <div 
            className="filter-heading"
            onClick={() => toggleSection('performance')}
          >
            <h4>Performance</h4>
            <FaAngleDown className={expandedSections.performance ? 'expanded' : ''} />
          </div>
          
          {expandedSections.performance && (
            <div className="filter-content">
              <div className="filter-group">
                <label>Refresh Rate (Hz)</label>
                <select
                  name="min_refresh_rate"
                  value={filters.min_refresh_rate}
                  onChange={handleInputChange}
                >
                  <option value="">Any</option>
                  <option value="60">60+ Hz</option>
                  <option value="75">75+ Hz</option>
                  <option value="100">100+ Hz</option>
                  <option value="144">144+ Hz</option>
                  <option value="165">165+ Hz</option>
                  <option value="200">200+ Hz</option>
                  <option value="240">240+ Hz</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Availability Filter */}
        <div className="filter-section">
          <div 
            className="filter-heading"
            onClick={() => toggleSection('availability')}
          >
            <h4>Availability</h4>
            <FaAngleDown className={expandedSections.availability ? 'expanded' : ''} />
          </div>
          
          {expandedSections.availability && (
            <div className="filter-content">
              <div className="filter-checkbox">
                <input
                  type="checkbox"
                  id="in_stock"
                  name="in_stock"
                  checked={filters.in_stock}
                  onChange={handleInputChange}
                />
                <label htmlFor="in_stock">In Stock Only</label>
              </div>
            </div>
          )}
        </div>
        
        <div className="filters-actions">
          <button 
            className="btn btn-primary apply-filters"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <button 
            className="clear-filters"
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {mobileFiltersOpen && (
        <div 
          className="filters-overlay"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}
    </div>
  );
};

export default Filters;