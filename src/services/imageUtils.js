// src/services/imageUtils.js

/**
 * Utilities for handling product images across different sources
 */
const imageUtils = {
    /**
     * Get the appropriate image URL based on the source
     * - For Neptun images (no CORS issues) - use directly
     * - For Anhoch images (with CORS issues) - proxy through backend
     */
    getProxyImageUrl: (originalUrl) => {
      if (!originalUrl) {
        return 'https://via.placeholder.com/300x200';
      }
      
      // Check the URL source to determine if we need to proxy
      if (originalUrl.includes('anhoch.com')) {
        // Anhoch images need to be proxied
        const encodedUrl = encodeURIComponent(originalUrl);
        // Use your API_URL from your config or environment
        // If you need to modify this, update with your actual backend URL
        const API_URL = 'http://127.0.0.1:8000';
        return `${API_URL}/proxy-image/?url=${encodedUrl}`;
      }
      
      // Return the original URL for other sources (like Neptun)
      return originalUrl;
    }
  };
  
  export default imageUtils;