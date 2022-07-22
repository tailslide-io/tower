import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateFlagById } from '../../features/flags/flagsReducer';
import { objectKeysCamelToSnake } from '../../lib/utils';
import FlagForm from './FlagForm';
// import { handleFetchFlagById } from '../../lib/utils';

/*
  1. Get info about this flags (rom the URL -> useParams)
  2. Separate out the logs from the return flag so that
    flag only has information without logs (object destructuring, removing the logs property)
    - Use tab nav to swap between views (https://mui.com/material-ui/react-tabs/)
  
  // Nav Bar
    // Flag Info / TS Data / Logs
*/

function FlagInfo() {
  let { flagId } = useParams();
  flagId = Number(flagId);
  const dispatch = useDispatch();

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );

  const handleOnFlagUpdate = (flagData) => {
    flagData = objectKeysCamelToSnake(flagData);
    const { id, ...flagWithoutId } = flagData;
    dispatch(updateFlagById({ flagId: id, body: flagWithoutId }));
  };

  if (!selectedFlag) return null;

  return (
    <>
      <FlagForm
        flag={selectedFlag}
        formActionLabel="Save"
        formAction={handleOnFlagUpdate}
      />
    </>
  );
}

export default FlagInfo;
