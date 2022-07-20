import React from 'react';
import ClientApplicationsDashboard from './components/clientApplications/ClientApplicationsDashboard';

function App() {
  // get the apps from the Redux store
  // display the apps' title
  // need to get all the apps from server, useEffect hook

  return (
    <div className="App">
      <ClientApplicationsDashboard />
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
