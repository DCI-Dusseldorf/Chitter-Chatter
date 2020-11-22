import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Card, CardActions, CardHeader } from '@material-ui/core';
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(5, 20),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function Addpost() {
  const classes = useStyles();
  const [state, setState] = useState({ message: '' });

  function addPost(message) {
    fetch('/api/post/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: window.token,
      },
      body: JSON.stringify({ message }),
    }).then((response) => console.log(response));
  }

  return (
    <Card className={classes.root} variant='outlined'>
      <CardHeader title='Create Post' />
      <form noValidate autoComplete='off'>
        <div>
          <TextField
            id='outlined-multiline-static'
            label='Multiline'
            multiline
            rows={4}
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
