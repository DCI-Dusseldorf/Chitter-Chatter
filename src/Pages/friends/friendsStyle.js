import bg from '../images/friends-bg.jpg';
import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  box: {
    margin: 'auto',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '300px',
    textAlign: 'center',
    fontSize: '100px',
    color: 'white',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
}));
