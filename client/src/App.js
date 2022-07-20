import React from 'react';
import { Route } from 'react-router-dom';
import { Routes } from '../node_modules/react-router-dom/index';
import ClientApplication from './components/clientApplications/ClientApplication';
import ClientApplicationsDashboard from './components/clientApplications/ClientApplicationsDashboard';
import FlagDashboard from './components/flags/FlagDashboard';
import FlagLogs from './components/flags/FlagLogs';
import FlagsNavbar from './components/flags/FlagsNavbar';
import FlagTimeSeries from './components/flags/FlagTimeSeries';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';

function App() {
  // get the apps from the Redux store
  // display the apps' title
  // need to get all the apps from server, useEffect hook

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="apps">
            <Route path=":appId" element={<ClientApplication />} />
            <Route index element={<ClientApplicationsDashboard />}></Route>
          </Route>
          <Route path="flags">
            <Route path=":flagId" element={<FlagsNavbar />}>
              <Route index element={<FlagDashboard />} />
              <Route path="logs" element={<FlagLogs />} />
              <Route path="timeseries" element={<FlagTimeSeries />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

/*
<Routes>
  <Route path="/" element={<Dashboard />}>
    <Route
      path="messages"
      element={<DashboardMessages />}
    />
    <Route path="tasks" element={<DashboardTasks />} />
  </Route>
  <Route path="about" element={<AboutPage />} />
</Routes>
*/

export default App;
