import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import Axios from 'axios';
import { useStyles } from './profileStyle';
import { StyledBadge } from './styledBadgeAvatar';

function Profile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { userId } = useParams();
  const { accessToken, user: myUser } = useSelector((state) => state);
  const avatar = useSelector((state) => state.user.avatar);
  const [searchedUser, setSearchedUser] = useState({});
  if (!userId) {
    userId = myUser.id;
  }
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
  const avatarUpload = (e) => {
    const reader = new FileReader();
    console.log(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async (e) => {
      console.log(e);
      await Axios.patch(`/api/user/${myUser.id}`, {
        avatar: e.target.result,
      });
      dispatch({
        type: 'user:avatar',
        avatar: e.target.result,
      });
    };
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {searchedUser.name}
            <br />
            {searchedUser.email}
            <div className={classes.icons}>
              <Avatar>
                <label htmlFor='file'>
                  <EditIcon />
                </label>
                <input
                  type='file'
                  id='file'
                  style={{ display: 'none' }}
                  onChange={avatarUpload}
                />
              </Avatar>
              <Avatar>
                <SettingsIcon />
              </Avatar>
            </div>
          </Paper>

          <StyledBadge
            className={classes.badge}
            overlap='circle'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant='dot'
          >
            <Avatar src={avatar} className={classes.large} />
          </StyledBadge>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
