import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import { deletePost, editPost, likePost } from '../../actions';
import { Box, Button, Menu, MenuItem, TextField } from '@material-ui/core';
var moment = require('moment');

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    marginBottom: "10px"
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post(props) {
  const { post } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = useState({ editedMessage: post.message, editToggle: 'none' });

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label='settings' onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                    setState({...state, editToggle: ''})
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    handleClose();
                    deletePost(post.id);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
          title={post.id}
          subheader={moment(post.createdAt).fromNow()}
        />
        <CardContent>
          {/* vvvvvvv         show -> hide    !!!DOESN'T WORK!!!*/}
          <Typography
            component={Box}
            display=''
            variant='body2'
            color='textSecondary'
          >
            {post.message}
          </Typography>
          {/* vvvvvv          hide -> show */}
          <TextField
            component={Box}
            display={state.editToggle}
            multiline rows={3}
            variant='outlined'
            value={state.editedMessage}
            onChange={(e) => setState({ ...state, editedMessage: e.target.value })}
          />
        </CardContent>
        <CardMedia
          className={classes.media}
          image='/static/images/cards/paella.jpg'
          title='Paella dish'
        />
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon
              onClick={(e) => {
                likePost(post.id);
              }}
            />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
          {/* vvv             hide -> show */}
          <Button
            component={Box}
            display={state.editToggle}
            variant='contained'
            color='primary'
            onClick={(e) => {
              e.preventDefault();
              editPost(post.id, state.editedMessage);
              setState({...state, editToggle: 'none'})
            }}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
