import AuthDashboard from 'components/auth/AuthDashboard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { Routes } from '../node_modules/react-router-dom/index';
import FlagsDashboard from './components/flags/FlagsDashboard';
import AppsDashboard from './components/apps/AppsDashboard';
import FlagViewInfo from './components/flags/FlagViewInfo';
import FlagViewLogTimeline from './components/flags/FlagViewLogTimeline';
import FlagViewNavbar from './components/flags/FlagViewNavbar';
import FlagViewCircuitHealth from './components/flags/FlagViewCircuitHealth';
import Layout from './components/layout/Layout';
import LogsDashboard from './components/logs/LogsDashboard';
import { updateNewestFlags } from './features/flags/flagsReducer';
import { natsConnect } from './lib/nats';

function App() {
  const [natsClient, setConnection] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    if (natsClient === undefined) {
      natsConnect(setConnection, updateNewestFlags, dispatch);
    }
  }, [natsClient, dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="apps">
            <Route path=":appId" element={<FlagsDashboard />} />
            <Route index element={<AppsDashboard />}></Route>
          </Route>
          <Route path="flags">
            <Route path=":flagId" element={<FlagViewNavbar />}>
              <Route path="logs" element={<FlagViewLogTimeline />} />
              <Route path="circuit" element={<FlagViewCircuitHealth />} />
              <Route index element={<FlagViewInfo />} />
            </Route>
          </Route>
          <Route path="logs">
            <Route index element={<LogsDashboard />} />
          </Route>
          <Route path="auth">
            <Route index element={<AuthDashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}



export default App;
