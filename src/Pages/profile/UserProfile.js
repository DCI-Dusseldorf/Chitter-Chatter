import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useSelector } from 'react-redux';
import { useStyles } from './profileStyle';
import { StyledBadge } from './styledBadgeAvatar';
import Axios from 'axios';

function UserProfile() {
  const classes = useStyles();
  const { accessToken } = useSelector((state) => state);
  let { userId } = useParams();

  const [searchedUser, setSearchedUser] = useState({});
  const [toggleFriend, setToggleFriend] = useState(false);
  useEffect(() => {
    fetch('/api/user/' + userId, {
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then((response) => response.json())
      .then((userinfo) => setSearchedUser(userinfo));
  }, [userId]);

  function changeFriend() {
    if (toggleFriend === false) {
      setToggleFriend(true);
      addFriend();
    } else if (toggleFriend === true) {
      setToggleFriend(false);
      removeFriend();
    }
  }
  async function addFriend() {
    console.log(userId);
    const response = fetch(`/api/friends/approve`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    // const response = await Axios.post(`/api/friends/approve`, { id: userId });
    // console.log(response);
    // if (response.ok) await Axios.get(`/user/${userId}`);
  }
  function removeFriend() {
    const response = fetch(`/api/friends/reject`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {searchedUser.name}
            <br />
            {searchedUser.email}
            <div className={classes.icons}>
              <Avatar
                onClick={(e) => {
                  changeFriend(userId);
                }}
                className={
                  toggleFriend ? classes.addFriend : classes.removeFriend
                }
              >
                <PersonAddIcon />
              </Avatar>
            </div>
          </Paper>
          <StyledBadge
            className={classes.dot + ' ' + classes.badge}
            overlap='circle'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant='dot'
          >
            <Avatar
              src={searchedUser.avatar}
              className={classes.large}
            ></Avatar>
          </StyledBadge>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
