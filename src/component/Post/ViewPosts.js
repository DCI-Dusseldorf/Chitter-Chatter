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
    return state.posts;
  });
  useEffect(() => {
    if (props.token) updatePosts(props.token);
    //updatePosts(props.token).then((posts)=>setPosts(posts)); same as above
  }, [props.token]);
  return (
    <Container className={classes.rootGrid}>
      {posts.map((post) => (
        <Post post={post} token={props.token} />
      ))}
    </Container>
  );
};

export default ViewPosts;
