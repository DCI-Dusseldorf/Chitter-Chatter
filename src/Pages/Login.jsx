import React, { useState } from 'react';
import logo from '../component/Logo/logo-side.png';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://sz.hktr.de/chitter/">
        Chitter-Chatter
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const defaults = {
  name         :'',
  email        : 'Test123@gmail.com',
  password     : 'asdasdasdsa8',
  status       : false,
  showStatus   : false
};

function Login() {
  const classes = useStyles();
  const [state, setState] = useState(defaults);
  const open = state.showStatus;
          function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      setState({...state,showStatus:false});
  };
  function submitLogin(e) {
    e.preventDefault();
    console.log(state);
    fetch("/api/auth/login", {
      method:  "POST",
      headers: {"content-type": "application/json"},
      body:    JSON.stringify(
        {
          email:    state.email,
          password: state.password
        })
    }).then((response)=>response.json().then(data=>({data,response})))
    .then(({data,response})=> {
      console.log(data);
      if ( data.tokens ) window.token = data.tokens.access.token;
      console.log(window.token);
      if(response.ok){
        setState({
          ...state,
          showStatus: true,
          status: { message : 'Success' }
        })
      } else{
        setState({
          ...state,
          showStatus: true,
          status: { message : data.message, code : response.status }
        })
      }
    })
  }
  function submitTest (e) { 
    e.preventDefault();
     fetch("/api/auth/test", {
      method:  "POST",
      headers: {"content-type": "application/json",
                "Authorization":window.token },
      body:    JSON.stringify({})
    })
    .then( response => console.log(response.statusText) )
  }

  return <> <Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={classes.paper}>
    <img src={logo} alt="Chitter-Chatter logo" style={{marginBottom: "40px"}} />
    <Typography component="h1" variant="h5">
      Sign In
    </Typography>
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={state.email}
            onChange={ e => setState({ ...state, email: e.target.value }) }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={state.password}
            onChange={ e => setState({ ...state, password: e.target.value }) }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick = {submitLogin}
      >
        Sign In
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={submitTest}
      >
        Test
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link href="#" variant="body2">
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
 <Snackbar open={ open } autoHideDuration={1000} onClose={handleClose}>
 <Alert
   onClose={handleClose}
   severity={ state.status.code ? "error" : "success"}
 >
   { state.status.message }
 </Alert>
</Snackbar> </>

}

export default Login
