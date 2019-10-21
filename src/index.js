import { BrowserRouter } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

// ReactDOM.render(<App />, document.getElementById('root'));

// REEACT ROUTER
import RoutingApp from './RoutingApp';

ReactDOM.render(
  <BrowserRouter>
    <RoutingApp />
  </BrowserRouter>,
  document.getElementById('root')
);
