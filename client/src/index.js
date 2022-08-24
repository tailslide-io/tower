import CssBaseline from '@mui/material/CssBaseline'; 
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './lib/store';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from 'lib/defaultTheme';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <Provider store={store}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  </Provider>
);
