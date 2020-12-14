import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootTabs: {
    flexGrow: 1,
    marginTop: '60px',
    maxWidth: 500,
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '300px',
    color: theme.palette.text.secondary,
    background:
      'linear-gradient(90deg, rgba(255,227,195,1) 50%, rgba(190,212,225,1) 50%)',
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
  badge: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  icons: {
    display: 'flex',
    position: 'absolute',
    right: '10px',
    bottom: '10px',
  },
  dot: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  addFriend: {
    color: 'green',
  },
  removeFriend: {
    color: 'grey',
  },
}));
