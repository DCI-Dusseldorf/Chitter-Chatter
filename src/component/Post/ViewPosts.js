import React from 'react';
import Post from './Post';
import { makeStyles } from '@material-ui/core/styles';

import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

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
    console.log(state);
    return state.posts;
  });
  return (
    <Container className={classes.rootGrid}>
      {posts.map((post) => (
        <Post post={post} token={props.token} />
      ))}
    </Container>
  );
};

export default ViewPosts;
