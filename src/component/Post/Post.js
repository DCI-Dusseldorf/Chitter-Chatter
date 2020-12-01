import React from 'react';
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
import { Menu, MenuItem } from '@material-ui/core';
var moment = require('moment');

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
                    editPost(post.id, post.message);
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
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image='/static/images/cards/paella.jpg'
          title='my pic'
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
        </CardActions>
      </Card>
    </>
  );
}
