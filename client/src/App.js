import AuthContainer from 'components/auth/AuthContainer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { Routes } from '../node_modules/react-router-dom/index';
import ClientApplication from './components/clientApplications/ClientApplication';
import ClientApplicationsDashboard from './components/clientApplications/ClientApplicationsDashboard';
import FlagInfo from './components/flags/FlagInfo';
import FlagLogsTimeline from './components/flags/FlagLogsTimeline';
import FlagsNavbar from './components/flags/FlagsNavbar';
import FlagTimeSeries from './components/flags/FlagTimeSeries';
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import LogInfo from './components/logs/LogInfo';
import { updateNewestFlags } from './features/flags/flagsReducer';
import { natsConnect } from './lib/nats';

function App() {
  const [natsClient, setConnection] = useState(undefined);
  const dispatch = useDispatch();
  // get the apps from the Redux store
  // display the apps' title
  // need to get all the apps from server, useEffect hook
  useEffect(() => {
    if (natsClient === undefined) {
      natsConnect(setConnection, updateNewestFlags, dispatch);
    }
  }, [natsClient]);

  // return (
  //   <div className="App">
  //     <Routes>
  //       <Route path="/" element={<Layout />}>
  //         <Route index element={<Home />} />
  //         <Route path="apps">
  //           <Route path=":appId" element={<ClientApplication />} >
  //             <Route path="flags">
  //               <Route path=":flagId" element={<FlagsNavbar />}>
  //                 <Route path="logs" element={<FlagLogsTimeline />} />
  //                 <Route path="timeseries" element={<FlagTimeSeries />} />
  //                 <Route index element={<FlagInfo />} />
  //               </Route>
  //             </Route>
  //           </Route>
  //           <Route index element={<ClientApplicationsDashboard />}></Route>
  //         </Route>
  //         <Route path="logs">
  //           <Route index element={<LogInfo />} />
  //         </Route>
  //         <Route path="auth">
  //           <Route index element={<AuthContainer />} />
  //         </Route>
  //       </Route>
  //     </Routes>
  //   </div>
  // );

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
