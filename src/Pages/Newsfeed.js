import { Container } from '@material-ui/core';
import React from 'react';
import AddPost from '../component/Post/AddPost';
import ViewPosts from '../component/Post/ViewPosts';

function Newsfeed() {
  return (
    <Container className='newsfeed'>
      <AddPost />
      <ViewPosts />
    </Container>
  );
}

export default Newsfeed;
