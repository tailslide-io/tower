import { Typography } from '@mui/material';
import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { TimelineOppositeContent } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import CircuitCloseIcon from 'components/utilities/CircuitCloseIcon';
import CircuitOpenIcon from 'components/utilities/CircuitOpenIcon';

function LogsTimeline({ logs }) {

  function actionTypeString(type) {
    switch (type) {
      case 'create':
        return 'Flag Created'
      case 'update':
        return 'Flag Updated'
      case 'delete':
        return 'Flag Deleted'
      case 'circuit_open':
        return 'Circuit Tripped Open'
      case 'circuit_close':
        return 'Circuit Closed'
      case 'flag_on':
        return 'Flag Turned On'
      case 'flag_off':
        return 'Flag Turned Off'
      default:
        return ''
    }
  }

  function actionTypeDot(type) {
    switch (type) {
      case 'create':
        return (
          <TimelineDot color='secondary'>
            <AddIcon />
          </TimelineDot>
        )
      case 'update':
        return (
          <TimelineDot color='primary'>
            <EditIcon />
          </TimelineDot>
        )
      case 'delete':
        return 'Flag Deleted'
      case 'circuit_open':
        return (
          <TimelineDot color="success">
            <CircuitOpenIcon />
          </TimelineDot>
        )
      case 'circuit_close':
        return (
          <TimelineDot color="success">
            <CircuitCloseIcon />
          </TimelineDot>
        )
      case 'flag_on':
        return (
          <TimelineDot color="success">
            <FlagIcon />
          </TimelineDot>
        )
      case 'flag_off':
        return (
          <TimelineDot color="error">
            <FlagIcon />
          </TimelineDot>
        )
      default:
        return ''
    }
  }

  return (
    <Timeline>
      {logs.map((log, idx) => (
        <TimelineItem key={log.log_id}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="subtitle2"
            color="text.secondary"
          >
            {new Date(log.created_at).toLocaleString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            {actionTypeDot(log.action_type)}
            {idx === logs.length - 1
              ? null
              : <TimelineConnector />
            }
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2, m:'auto 0' }}>
            <Typography variant="body1">
              {actionTypeString(log.action_type)}
            </Typography>
          </TimelineContent>
      </TimelineItem>
      ))}
    </Timeline>
  );
}

export default LogsTimeline;
