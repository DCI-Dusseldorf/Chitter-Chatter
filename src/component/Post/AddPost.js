import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Card, CardActions, CardHeader } from '@material-ui/core';
import { useState } from 'react';
import { updatePosts } from '../../actions';
import { DropzoneDialog } from 'material-ui-dropzone';
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
  const [state, setState] = useState({ open: false, message: '', images: [] });
  function addPost(message, images) {
    fetch('/api/post/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: props.token,
      },
      body: JSON.stringify({ message, images }),
    }).then((response) => updatePosts());
    setState({ ...state, message: '' });
  }
  function handleClose() {
    setState({ ...state, open: false });
  }

  function handleSave(images) {
    //Saving files to state for further use and closing Modal.
    const reader = new FileReader();
    if (images[0]) {
      reader.readAsDataURL(images[0]);
    }
    reader.addEventListener(
      'load',
      function () {
        setState({ ...state, images: [reader.result], open: false });
      },
      false
    );
  }

  function handleOpen() {
    setState({ ...state, open: true });
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
              addPost(state.message, state.images);
            }}
          >
            Post
          </Button>
          <Button
            onClick={(e) => {
              setState({ ...state, open: true });
            }}
          >
            Add image
          </Button>
          <DropzoneDialog
            open={state.open}
            onSave={handleSave}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={handleClose}
          />
        </CardActions>
      </form>
    </Card>
  );
}

export default Addpost;
