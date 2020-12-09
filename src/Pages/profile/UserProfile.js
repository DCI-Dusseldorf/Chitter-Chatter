import { Avatar, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '300px',
    color: theme.palette.text.secondary,
    background:
      'linear-gradient(90deg, rgba(255,227,195,1) 50%, rgba(190,212,225,1) 50%)',
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
  dot: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  icons: {
    display: 'flex',
    position: 'absolute',
    right: '10px',
    bottom: '10px',
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

function UserProfile() {
  const classes = useStyles();
  const { accessToken } = useSelector((state) => state);
  let { userId } = useParams();

  const [searchedUser, setSearchedUser] = useState({});

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
            <Avatar src={searchedUser.avatar} className={classes.large} />
          </StyledBadge>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfile;
