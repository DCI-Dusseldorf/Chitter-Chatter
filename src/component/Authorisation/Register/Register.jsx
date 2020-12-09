import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useHistory } from 'react-router-dom';
import { useStyles } from './registerStyle';
import logo from '../../Logo/logo-side.png';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import StatusSnackBar from '../StatusSnackBar';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://sz.hktr.de/chitter/'>
        Chitter-Chatter
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaults = {
  name: '',
  email: 'user3@gmail.com',
  password: 'asdasdasdsa8',
  status: false,
  showStatus: false,
};

export default function Register() {
  const classes = useStyles();
  const [state, setState] = useState(defaults);
  const dispatch = useDispatch();
  const history = useHistory();
  const open = state.showStatus;

  function submit(e) {
    e.preventDefault();
    console.log(state);
    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
      }),
    })
      .then((response) => response.json().then((data) => ({ data, response })))
      .then(({ data, response }) => {
        console.log(data);
        if (data.tokens)
          dispatch({
            type: 'Register',
            accessToken: data.tokens.access.token,
            refreshToken: data.tokens.refresh.token,
            user: data.user,
          });
        if (response.ok) {
          setState({
            ...state,
            showStatus: true,
            status: { message: 'Success' },
          });
          history.push('/newsfeed');
        } else {
          setState({
            ...state,
            showStatus: true,
            status: { message: data.message, code: response.status },
          });
        }
      });
  }

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src={logo}
            alt='Chitter-Chatter logo'
            style={{ marginBottom: '40px' }}
          />
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='fname'
                  name='name'
                  variant='outlined'
                  required
                  fullWidth
                  id='name'
                  label='Your Name'
                  autoFocus
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={state.password}
                  onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={submit}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      <StatusSnackBar state={state} open={open} setState={setState} />
    </>
  );
}
