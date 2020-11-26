import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Container } from '@material-ui/core';
import { updatePosts } from '../../actions';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
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
  rootGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop: '20px',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ViewPosts(props) {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    updatePosts(props.token);
    //updatePosts(props.token).then((posts)=>setPosts(posts)); same as above
  }, []);

  return (
    <Container className={classes.rootGrid}>
      {posts.map((post, index) => (
        <Card key={index} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label='recipe' className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title='User Added a new message'
            subheader='September 14, 2016'
          />
          <CardMedia
            className={classes.media}
            image='/static/images/cards/paella.jpg'
            title='Paella dish'
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {post.message}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default ViewPosts;
