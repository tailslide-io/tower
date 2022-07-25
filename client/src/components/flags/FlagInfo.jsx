import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FlagInfoCard from './FlagInfoCard';

function FlagInfo() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );

  if (!selectedFlag) return null;

  return (
    <>
      <FlagInfoCard flag={selectedFlag} />
    </>
  );
}

export default FlagInfo;
