import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateFlagById } from '../../features/flags/flagsReducer';
import { objectKeysCamelToSnake } from '../../lib/utils';
import FlagForm from './FlagForm';
import FlagInfoCard from './FlagInfoCard';

function FlagInfo() {
  let { flagId } = useParams();
  flagId = Number(flagId);
  // const dispatch = useDispatch();

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );

  // const handleOnFlagUpdate = (flagData, callback) => {
  //   flagData = objectKeysCamelToSnake(flagData);
  //   const { id, ...flagWithoutId } = flagData;
  //   dispatch(updateFlagById({ flagId: id, body: flagWithoutId, callback }));
  // };

  if (!selectedFlag) return null;

  return (
    <>
      {/* <FlagForm
        flag={selectedFlag}
        formActionLabel="Save"
        formAction={handleOnFlagUpdate}
      /> */}
      <FlagInfoCard flag={selectedFlag} />
    </>
  );
}

export default FlagInfo;
