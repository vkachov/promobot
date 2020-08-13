import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { ProductPage } from './pages/product-page';
import './App.scss';
import { CartModule } from './module/cart/cart-module';

function App() {
  return (
    <Router>
      <div className="page">
        <div className="info">Каждая перезагрузка страницы формирует рандомные 10 товаров для отображения</div>
        <nav>
          <Link to="/">Весь список</Link>
          <Link to="/1">1 элемент</Link>
          <Link to="/2">2 элемента</Link>
        </nav>
        <Switch>
          <Route 
              exact
              path="/"
              component={HomePage} />
          <Route 
              exact
              path="/:count"
              component={HomePage} />
            <Route 
              exact
              path="/product/:id"            
              component={ProductPage} />
          {/* <Route 
            exact
            path="/product/:id"
            
            component={(props: string) => <ProductPage { ...props }/>} /> */}
        </Switch>
      </div>
      <CartModule />
    </Router>
  );
}

export default App;
