import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material/index';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleDeleteApp } from '../../lib/handlers';

function ClientApplicationCard({ app }) {
  const dispatch = useDispatch();
  // const fetchAppFlags = (appId) => {
  //   dispatch(fetchFlagsByAppId(appId));
  // };
  // const handleDeleteApp = (appId) => {
  //   dispatch(deleteApp(appId));
  // };

  // const handleGetAppById = (appId) => {
  //   dispatch(fetchAppById(appId));
  // };

  return (
    // <Link component={NavLink} to={`./${app.id}`}>
    //   <ListItem
    //     key={app.title}
    //     onClick={() => handleFetchFlagsByAppId(app.id, dispatch)}
    //   >
    //     <ListItemText primary={app.title} />
    //     <Button onClick={() => handleDeleteApp(app.id, dispatch)}>
    //       Delete App
    //     </Button>
    //     <Button onClick={() => handleGetAppById(app.id, dispatch)}>
    //       Get App Info
    //     </Button>
    //   </ListItem>
    // </Link>

    <ListItem
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => console.log('editing')}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteApp(app.id, dispatch)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton role={undefined} component={NavLink} to={`./${app.id}`}>
        <ListItemText
          primary={app.title}
          // secondary={`${active}/${total} Flags Active`}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default ClientApplicationCard;
