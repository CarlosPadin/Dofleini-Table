import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { Permissions, Roles } from './utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App roles={Roles} permissions={Permissions}/>
  </React.StrictMode>
);
