import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemIcon,
  Modal,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchFlagsByAppId } from '../../features/flags/flagsReducer';
import { defaultFlag } from '../../lib/utils';
import FlagCard from '../flags/FlagCard';
import FlagForm from '../flags/FlagForm';

function ClientApplication() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // navigate('./');
    setOpen(false);
  };

  const ref = React.createRef();

  const dispatch = useDispatch();
  let { appId } = useParams();
  appId = Number(appId);
  const flags = useSelector((state) => state.flags).filter(
    (flag) => flag.appId === appId
  );

  useEffect(() => {
    dispatch(fetchFlagsByAppId(appId));
  }, [dispatch, appId]);
  const sortedFlags = flags
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <List>
        {sortedFlags.map((flag) => (
          <Box key={flag.id}>
            <FlagCard flag={flag} />
            <Divider />
          </Box>
        ))}
        <ListItemIcon>
          <IconButton
            // component={Link}
            // to="newFlag"
            type="submit"
            edge="start"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddCircleIcon color="primary" fontSize="large" />
          </IconButton>
        </ListItemIcon>
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FlagForm
          ref={ref}
          callback={handleClose}
          flag={{ ...defaultFlag, appId }}
          formAction={() => {}}
        />
      </Modal>
    </>
  );
}

export default ClientApplication;
