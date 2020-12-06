import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
var moment = require('moment');

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: '10px',
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
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
}));

export default function Post(props) {
  const { post } = props;
  if (!post.yourReactions) {
    post.yourReactions = {};
  }
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
    editModeOff: '',
    editModeOn: 'none',
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
                    setState({ ...state, editModeOn: '', editModeOff: 'none' });
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
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvvv        show -> hide */}
          <Box display={state.editModeOff}>
            <Typography variant='body2' color='textSecondary'>
              {post.message}
            </Typography>
          </Box>
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvv         hide -> show */}
          <Box display={state.editModeOn}>
            <TextField
              // component={Box}
              // display={state.editModeOn}
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
        <CardMedia
          className={classes.media}
          image='/static/images/cards/paella.jpg'
          title='my pic'
        />
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
              color='blue'
              display={!state.reaction.Like ? 'none' : ''}
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
                commentPost(post.id);
              }}
            />
          </IconButton>
          {/*  vvvvvvvvvvvvvvvvvvvvvvvvvv         hide -> show */}
          <Box display={state.editModeOn}>
            <Button
              variant='contained'
              color='primary'
              onClick={(e) => {
                e.preventDefault();
                editPost(post.id, state.editedMessage);
                setState({ ...state, editModeOn: 'none', editModeOff: '' });
              }}
            >
              Save
            </Button>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
