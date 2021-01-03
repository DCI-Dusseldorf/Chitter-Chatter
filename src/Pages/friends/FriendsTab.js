import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getFriendsProfiles,
  getFriendsRequestProfiles,
  getFriendsRequestSentProfiles,
} from '../../actions';
import FriendsProfile from './FriendsProfile';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  friendsList: {
    display: 'block',
    flexWrap: 'wrap',
  },
}));

export default function FriendsTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const friendsIds = useSelector((state) => state.auth.user.friends);
  const pendingRequestIds = useSelector(
    (state) => state.auth.user.friendRequests
  );
  const sentRequestId = useSelector(
    (state) => state.auth.user.friendRequestsSent
  );
  console.log(sentRequestId);
  useEffect(() => {
    getFriendsProfiles(friendsIds);
    getFriendsRequestProfiles(pendingRequestIds);
    getFriendsRequestSentProfiles(sentRequestId);
  }, [friendsIds, pendingRequestIds, sentRequestId]);
  const friends = useSelector((state) => state.auth.friends);
  const friendsRequest = useSelector((state) => state.auth.friendsRequest);
  const friendsRequestSent = useSelector(
    (state) => state.auth.friendsRequestSent
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='nav tabs example'
        >
          <LinkTab label='Friends' href='/drafts' {...a11yProps(0)} />
          <LinkTab label='Pending Request' href='/trash' {...a11yProps(1)} />
          <LinkTab label='Friend Request send' href='/spam' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.friendsList}>
        {!friends
          ? `...loading ${friends.id}`
          : friends.map((friend) => <FriendsProfile friends={friend} />)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!friendsRequest
          ? `...loading ${friendsRequest.id}`
          : friendsRequest.map((friend) => (
              <FriendsProfile pending friends={friend} />
            ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {!friendsRequestSent
          ? `...loading ${friendsRequestSent.id} `
          : friendsRequestSent.map((friend) => (
              <FriendsProfile outgoing friends={friend} />
            ))}
      </TabPanel>
    </div>
  );
}
