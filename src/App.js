import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<div className="container"><h2>Page Not Found</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App