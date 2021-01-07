import React, { useEffect } from 'react';
import Post from './Post';
import { makeStyles } from '@material-ui/core/styles';

import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { updatePosts } from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
const ViewPosts = (props) => {
  const classes = useStyles();
  const posts = useSelector((state) => {
    return state.auth.posts;
  });
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token) updatePosts();
    //updatePosts(props.token).then((posts)=>setPosts(posts)); same as above
  }, [token]);
  return (
    <Container className={classes.rootGrid}>
      {props.posts
        ? props.posts.map((post) => <Post post={post} key={post.id} />)
        : posts.map((post) => <Post post={post} key={post.id} />)}
    </Container>
  );
};

export default ViewPosts;
