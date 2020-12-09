import React, { useState } from 'react';
import { useStyles } from './loginStyle';
import { useHistory } from 'react-router-dom';
import logo from '../../Logo/logo-side.png';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import StatusSnackBar from '../StatusSnackBar';
import { useDispatch, useSelector } from 'react-redux';
import { updatePosts } from '../../../actions';

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
  token: '',
};

function Login() {
  const classes = useStyles();
  const [state, setState] = useState(defaults);
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.accessToken);
  const open = state.showStatus;

  function submitLogin(e) {
    e.preventDefault();
    // console.log(state);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    })
      .then((response) => response.json().then((data) => ({ data, response })))
      .then(({ data, response }) => {
        if (data.tokens){
        localStorage.setItem('access-token', state.accessToken);
        localStorage.setItem('refresh-token', state.refreshToken);
          dispatch({
            type: 'Login',
            accessToken: data.tokens.access.token,
            refreshToken: data.tokens.refresh.token,
            user: data.user,
          });
          updatePosts(data.tokens.access.token)}else{
            dispatch({
              type: 'Login',
              accessToken: false,
              refreshToken: false,
            });
          }
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
  function submitTest(e) {
    e.preventDefault();
    fetch('/api/auth/test', {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: token },
      body: JSON.stringify({}),
    }).then((response) => console.log(response.statusText));
  }

  return (
    <>
      {' '}
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src={logo}
            alt='Chitter-Chatter logo'
            style={{ marginBottom: '40px' }}
          />
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
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
              onClick={submitLogin}
            >
              Sign In
            </Button>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={submitTest}
            >
              Test
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <Link to='/' variant='body2'>
                  Register as a new User, click here
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

export default Login;
