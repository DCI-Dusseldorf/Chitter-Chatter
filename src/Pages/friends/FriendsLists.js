import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './friendsStyle';
import FriendsTab from './FriendsTab';

function FriendsLists() {
  const classes = useStyles();

  return (
    <>
      <Box width='75%' className={classes.box}>
        F.R.I.E.N.D.S
      </Box>
      <Box>
        <FriendsTab />
      </Box>
    </>
  );
}

export default FriendsLists;
