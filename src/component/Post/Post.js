import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import SendIcon from '@material-ui/icons/Send';
import { red } from '@material-ui/core/colors';
import {
  commentPost,
  deletePost,
  editPost,
  reactPost,
  removeReactPost,
} from '../../actions';
import { Box, Button, Menu, MenuItem, TextField } from '@material-ui/core';
import { AiFillLike, AiFillDislike, AiFillHeart } from 'react-icons/ai';
import { BiAngry } from 'react-icons/bi';
import { FiFrown } from 'react-icons/fi';
import { FaGrinSquintTears, FaLaugh } from 'react-icons/fa';
import { useSelector } from 'react-redux';
var moment = require('moment');

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: theme.spacing(1),
  },
  avatar: {
    backgroundColor: red[500],
  },

  typography: {
    padding: theme.spacing(2),
    display: 'flex',
  },
  favoriteIconred: {
    color: 'red',
  },
  favoriteIcongrey: {
    color: 'grey',
  },
  popperIcon: {
    marginLeft: '10px',
  },
  icons: {
    marginLeft: '-10px',
  },
  button: {
    margin: theme.spacing(0.3),
  },
  boxIconButtons: {
    marginTop: theme.spacing(-3),
  },
}));

export default function Post(props) {
  const { post } = props;
  if (!post.yourReactions) {
    post.yourReactions = {};
  }
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElPopper, setAnchorElPopper] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickPopper = (newPlacement, event) => {
    setAnchorElPopper(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const [state, setState] = useState({
    editedMessage: post.message,
    editMode: false,
    commentMessage: '',
    commentMode: false,
    reaction: {
      Like: post.yourReactions.Like || false,
      Hate: post.yourReactions.Hate || false,
      Frown: post.yourReactions.Frown || false,
      Angry: post.yourReactions.Angry || false,
      Lol: post.yourReactions.Lol || false,
      Rofl: post.yourReactions.Rofl || false,
      Love: post.yourReactions.Love || false,
    },
  });
  function setReaction(reaction) {
    !state.reaction[reaction]
      ? reactPost(post.id, reaction)
      : removeReactPost(post.id, reaction);
    return setState({
      ...state,
      reaction: { ...state.reaction, [reaction]: !state.reaction[reaction] },
    });
  }
  console.log(user);
  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src={user.avatar}
              aria-label='recipe'
              className={classes.avatar}
            >
              {user.name.substring(0, 1)}
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
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv        show -> hide */}
          <Box display={state.editMode ? 'none' : ''}>
            <Typography variant='body1' color='textSecondary'>
              {post.message}
            </Typography>
          </Box>
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv        hide -> show */}
          <Box display={state.editMode ? '' : 'none'}>
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
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv     hide -> show */}
          <Box display={state.commentMode ? '' : 'none'} mt={1}>
            <TextField
              label='Comment'
              multiline
              rows={2}
              variant='outlined'
              value={state.commentMessage}
              onChange={(e) =>
                setState({ ...state, commentMessage: e.target.value })
              }
            />
          </Box>
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv     hide -> show */}
          <Box display={state.commentMode ? '' : 'none'} textAlign='end'>
            <IconButton className={classes.boxIconButtons}>
              <SendIcon
                color='primary'
                onClick={(e) => {
                  e.preventDefault();
                  commentPost(post.id, state.commentMessage);
                  setState({
                    ...state,
                    commentMode: false,
                    commentMessage: '',
                  });
                }}
              />
            </IconButton>
            <IconButton className={classes.boxIconButtons}>
              <ClearIcon
                color='secondary'
                onClick={(e) => {
                  e.preventDefault();
                  setState({
                    ...state,
                    commentMode: false,
                    commentMessage: '',
                  });
                }}
              />
            </IconButton>
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label='add to favorites'
            onClick={(e) => {
              e.preventDefault();
              handleClickPopper('top-start', e);
            }}
          >
            <Popper
              open={open}
              anchorEl={anchorElPopper}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={1000}>
                  <Paper>
                    <Typography className={classes.typography}>
                      <AiFillLike
                        className={classes.popperIcon}
                        onClick={() => setReaction('Like')}
                        color={state.reaction.Like ? 'blue' : ''}
                      />
                      <AiFillDislike
                        className={classes.popperIcon}
                        onClick={() => setReaction('Hate')}
                        color={state.reaction.Hate ? 'red' : ''}
                      />
                      <FiFrown
                        className={classes.popperIcon}
                        onClick={() => setReaction('Frown')}
                        color={state.reaction.Frown ? 'orange' : ''}
                      />
                      <BiAngry
                        className={classes.popperIcon}
                        onClick={() => setReaction('Angry')}
                        color={state.reaction.Angry ? 'red' : ''}
                      />
                      <FaLaugh
                        className={classes.popperIcon}
                        onClick={() => setReaction('Lol')}
                        color={state.reaction.Lol ? 'yellow' : ''}
                      />
                      <FaGrinSquintTears
                        className={classes.popperIcon}
                        onClick={() => setReaction('Rofl')}
                        color={state.reaction.Rofl ? 'yellow' : ''}
                      />
                      <AiFillHeart
                        className={classes.popperIcon}
                        onClick={() => setReaction('Love')}
                        color={state.reaction.Love ? 'red' : ''}
                      />
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
            {/* <FavoriteIcon
            /> */}
            <AiFillLike
              className={classes.icons}
              color={!state.reaction.Like ? '' : 'blue'}
            />
            <AiFillDislike
              className={classes.icons}
              color='red'
              display={!state.reaction.Hate ? 'none' : ''}
            />
            <FiFrown
              className={classes.icons}
              color='orange'
              display={!state.reaction.Frown ? 'none' : ''}
            />
            <BiAngry
              className={classes.icons}
              color='red'
              display={!state.reaction.Angry ? 'none' : ''}
            />
            <FaLaugh
              className={classes.icons}
              color='yellow'
              display={!state.reaction.Lol ? 'none' : ''}
            />
            <FaGrinSquintTears
              className={classes.icons}
              color='yellow'
              display={!state.reaction.Rofl ? 'none' : ''}
            />
            <AiFillHeart
              className={classes.icons}
              color='red'
              display={!state.reaction.Love ? 'none' : ''}
            />
          </IconButton>
          <IconButton aria-label='share'>
            <CommentIcon
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, commentMode: true });
              }}
            />
          </IconButton>
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv        hide -> show */}
          <Box display={state.editMode ? '' : 'none'}>
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
                setState({
                  ...state,
                  editMode: false,
                  editedMessage: post.message,
                });
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
