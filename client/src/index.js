import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './lib/store';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
// import your route components too

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

{
  // <BrowserRouter>
  // <Routes>
  // <Route path="/" element={<App />}>
  // {
  /* <Route index element={<Home />} />
          <Route path="apps" element={<Apps />}>
            <Route path=":appId" element={<Flags />}>
              <Route path="flags/:flagId" element={<Flag />} />
            </Route>
            <Route path="new" element={<NewFlag />} /> */
  // }
  // {
  /* </Route> */
  // }
  //     </Route>
  //   </Routes>
  // </BrowserRouter>
  // </Provider>
}
