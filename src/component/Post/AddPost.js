import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Card, CardActions, CardHeader } from '@material-ui/core';
import { useState } from 'react';
import { updatePosts } from '../../actions';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 20),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Addpost(props) {
  const classes = useStyles();
  const [state, setState] = useState({ message: '' });

  function addPost(message) {
    fetch('/api/post/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: props.token,
      },
      body: JSON.stringify({ message }),
    }).then((response) => updatePosts());
    setState({ message: '' });
  }

  return (
    <Card className={classes.root} variant='outlined'>
      <CardHeader title='Create Post' />
      <form noValidate autoComplete='off'>
        <div>
          <TextField
            id='outlined-multiline-static'
            label='Add a post'
            multiline
            rows={4}
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            variant='outlined'
          />
        </div>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            onClick={(e) => {
              e.preventDefault();
              addPost(state.message);
            }}
          >
            Post
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

export default Addpost;
