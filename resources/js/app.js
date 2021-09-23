import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import 'semantic-ui-css/semantic.min.css'

import { AuthProvider } from './context/auth';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('app')
);
