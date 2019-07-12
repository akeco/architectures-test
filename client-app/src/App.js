import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path={'/products'} component={ProductsPage} />
        <Route exact path={'/'} component={HomePage} />
      </Router>
    </div>
  );
}

export default App;
