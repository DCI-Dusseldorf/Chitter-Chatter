import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

export default function StatusSnackBar(props){

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
      props.setState({...props.state,showStatus:false});
  };
  return (<>
      <Snackbar open={props.open } autoHideDuration={1000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={ props.state.status.code ? "error" : "success"}
        >
          { props.state.status.message }
        </Alert>
      </Snackbar> 
  </>);
}