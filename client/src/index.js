import CssBaseline from '@mui/material/CssBaseline'; // CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.
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
// import your route components too

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

/*
index.js
root.render(
  <Provider store={store}>
    <CssBaseline>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CssBaseline>
  </Provider>
);

app.js
function App() {
  return (
    <>
      <Layout />
      <Route path="/" component={World} />
    </>
  );
}

const World = () => {
  return (
    <h1>Hello World!</h1>
  )
}

*/
