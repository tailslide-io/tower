// Template

// import { Button, Link, ListItem, ListItemText } from '@mui/material/index';
// // import { Link } from "react-router-dom"
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteApp, fetchAppById } from '../../features/apps/appsReducer';
// import { fetchFlagsByAppId } from '../../features/flags/flagsReducer';

// function ClientApplication({ app }) {
//   const dispatch = useDispatch();
//   const fetchAppFlags = (appId) => {
//     dispatch(fetchFlagsByAppId(appId));
//   };
//   const handleDeleteApp = (appId) => {
//     dispatch(deleteApp(appId));
//   };

//   const handleGetAppById = (appId) => {
//     dispatch(fetchAppById(appId));
//   };
//   return (
//     <ListItem key={app.title} onClick={() => fetchAppFlags(app.id)}>
//       <ListItemText primary={app.title} />
//       <Button onClick={() => handleDeleteApp(app.id)}>Delete App</Button>
//       <Button onClick={() => handleGetAppById(app.id)}>
//         <Link to={`/apps/${app.id}`}>Get App Info</Link>
//       </Button>
//     </ListItem>
//   );
// }

// export default ClientApplication;

import React from 'react';

function ClientApplication() {
  return <div>ClientApplication</div>;
}

export default ClientApplication;
