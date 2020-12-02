import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { red } from '@material-ui/core/colors';
import { commentPost, deletePost, editPost, likePost } from '../../actions';
import { Box, Button, Menu, MenuItem, TextField } from '@material-ui/core';
var moment = require('moment');

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: theme.spacing(1),
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    margin: theme.spacing(0.3),
  }
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

  const [state, setState] = useState({
    editedMessage: post.message,
    editMode: false,
    reaction: '',
  });

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
                    setState({ ...state, editMode: true });
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
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv        show -> hide */}
          <Box display={ (state.editMode) ? 'none' : '' }>
            <Typography variant='body2' color='textSecondary'>
              {post.message}
            </Typography>
          </Box>
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv        hide -> show */}
          <Box display={ (state.editMode) ? '' : 'none' }>
            <TextField
              multiline
              rows={3}
              variant='outlined'
              value={state.editedMessage}
              onChange={(e) =>
                setState({ ...state, editedMessage: e.target.value })
              }
            />
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon
              onClick={(e) => {
                if (state.reaction === 'like')
                  setState({ ...state, reaction: 'like' });
                likePost(post.id, state.reaction);
              }}
            />
          </IconButton>
          <IconButton aria-label='share'>
            <CommentIcon
              onClick={(e) => {
                commentPost(post.id);
              }}
            />
          </IconButton>
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv        hide -> show */}
          <Box display={ (state.editMode) ? '' : 'none' }>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              size='small'
              startIcon={<SaveIcon />}
              onClick={(e) => {
                e.preventDefault();
                editPost(post.id, state.editedMessage);
                setState({ ...state, editMode: false });
              }}
            >
              Save
            </Button>
            <Button
              className={classes.button}
              variant='contained'
              color='secondary'
              size='small'
              startIcon={<ClearIcon />}
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, editMode: false, editedMessage: post.message });
              }}
            >
              Cancel
            </Button>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
