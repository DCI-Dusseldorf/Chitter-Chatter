import { Box } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { getFriendsProfiles } from '../../actions';
import FriendsProfile from './FriendsProfile';
import { useStyles } from './friendsStyle';

function FriendsLists() {
  const classes = useStyles();
  const friendsIds = useSelector((state) => state.auth.user.friends);
  useEffect(() => getFriendsProfiles(friendsIds), [friendsIds]);
  const friends = useSelector((state) => state.auth.friends);
  return (
    <>
      <Box width='75%' className={classes.box}>
        F.R.I.E.N.D.S
      </Box>
      {!friends
        ? `...loading ${friends.id}`
        : friends.map((friend) => <FriendsProfile friends={friend} />)}
    </>
  );
}

export default FriendsLists;
