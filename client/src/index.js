import CssBaseline from '@mui/material/CssBaseline'; // CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './lib/store';

import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from '../node_modules/react-router-dom/index';
import App from './App';
import ClientApplication from './components/clientApplications/ClientApplication';
import Layout from './components/layout/Layout';

const container = document.getElementById('root');
const root = createRoot(container);
// import your route components too

root.render(
  <Provider store={store}>
    <CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="apps">
              <Route path=":appId" element={<ClientApplication />} />
              <Route index element={<App />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CssBaseline>
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
