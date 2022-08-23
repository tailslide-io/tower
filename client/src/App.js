import AuthContainer from 'components/auth/AuthDashboard';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { Routes } from '../node_modules/react-router-dom/index';
import ClientApplication from './components/flags/FlagsDashboard';
import ClientApplicationsDashboard from './components/apps/AppsDashboard';
import FlagInfo from './components/flags/FlagViewInfo';
import FlagLogsTimeline from './components/flags/FlagViewLogTimeline';
import FlagsNavbar from './components/flags/FlagViewNavbar';
import FlagTimeSeries from './components/flags/FlagViewCircuitHealth';
import Layout from './components/layout/Layout';
import LogInfo from './components/logs/LogsDashboard';
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
            <Route path=":appId" element={<ClientApplication />} />
            <Route index element={<ClientApplicationsDashboard />}></Route>
          </Route>
          <Route path="flags">
            <Route path=":flagId" element={<FlagsNavbar />}>
              <Route path="logs" element={<FlagLogsTimeline />} />
              <Route path="timeseries" element={<FlagTimeSeries />} />
              <Route index element={<FlagInfo />} />
            </Route>
          </Route>
          <Route path="logs">
            <Route index element={<LogInfo />} />
          </Route>
          <Route path="auth">
            <Route index element={<AuthContainer />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}



export default App;
