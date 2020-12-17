import { Avatar, GridList } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';
import { useStyles } from './profileStyle';
import { StyledBadge } from './styledBadgeAvatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import * as FaIcons from 'react-icons/fa';
import PropTypes from 'prop-types';
import PhotoIcon from '@material-ui/icons/Photo';
import PeopleIcon from '@material-ui/icons/People';
import Post from '../../component/Post/Post';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import { avatarUpload, getFriendsProfiles } from '../../actions';
import { useUser } from '../../component/Data/hooks';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const classes = useStyles();
  let { userId } = useParams();
  const { accessToken, user: myUser, posts } = useSelector(
    (state) => state.auth
  );
  const avatar = useSelector((state) => state.auth.user.avatar);
  const [searchedUser, setSearchedUser] = useState({});
  const [value, setValue] = React.useState(0);
  const friendsIds = useSelector((state) => state.auth.user.friends);
  const friendsRequests = useSelector(
    (state) => state.auth.user.friendRequests
  );
  useEffect(() => getFriendsProfiles(friendsIds), [friendsIds]);
  const friends = useSelector((state) => state.auth.friends);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!userId) {
    userId = myUser.id;
  }
  useEffect(() => {
    fetch('/api/user/' + userId, {
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then((response) => response.json())
      .then((userinfo) => setSearchedUser(userinfo));
  }, [userId]);
  const user = useUser(myUser.id);
  console.log(user);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {searchedUser.name}
            <br />
            {searchedUser.email}
            <div className={classes.icons}>
              <Avatar>
                <label htmlFor='file'>
                  <EditIcon />
                </label>
                <input
                  type='file'
                  id='file'
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    avatarUpload(e, myUser.id);
                  }}
                />
              </Avatar>
              <Avatar>
                <SettingsIcon />
              </Avatar>
            </div>
          </Paper>

          <StyledBadge
            className={classes.badge}
            overlap='circle'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant='dot'
          >
            <Avatar src={avatar} className={classes.large} />
          </StyledBadge>
        </Grid>
        <Grid>
          <Paper square className={classes.rootTabs}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant='fullWidth'
              indicatorColor='secondary'
              textColor='secondary'
              aria-label='icon label tabs example'
            >
              <Tab
                icon={<FaIcons.FaRegNewspaper size='30px' />}
                label='Timeline'
                {...a11yProps(0)}
              />
              <Tab icon={<PeopleIcon />} label='Friends' {...a11yProps(1)} />
              <Tab icon={<PhotoIcon />} label='Photos' {...a11yProps(2)} />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            {posts.map((post) =>
              post.author == myUser.id ? (
                <Post post={post} key={post.id} />
              ) : null
            )}
          </TabPanel>
          <Grid cellHeight={180} className={classes.gridList}>
            <TabPanel value={value} index={1}>
              {!friends
                ? `...loading ${friends.id}`
                : friends.map((friend) => (
                    <Card className={classes.rootcard}>
                      <CardActionArea>
                        <CardMedia
                          component='img'
                          alt='Contemplative Reptile'
                          height='140'
                          image={friend.avatar}
                          title='Contemplative Reptile'
                        />
                        <CardContent>
                          <Typography gutterBottom variant='h5' component='h2'>
                            {friend.name}
                          </Typography>
                          <Typography variant='caption'>
                            {friend.friends.length} Friends
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size='small' color='primary'>
                          Friend
                        </Button>
                        <Button size='small' color='primary'>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
            </TabPanel>
          </Grid>
          <TabPanel value={value} index={2}>
            {!friends
              ? `...loading ${friends.id}`
              : friends.map((friend) => (
                  <Card className={classes.rootcard}>
                    <CardActionArea>
                      <CardMedia
                        component='img'
                        alt='Contemplative Reptile'
                        height='140'
                        image={friend.avatar}
                        title='Contemplative Reptile'
                      />
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                          {friend.name}
                        </Typography>
                        <Typography variant='caption'>
                          {friend.friends.length} Friends
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size='small' color='primary'>
                        Friend
                      </Button>
                      <Button size='small' color='primary'>
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                ))}
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
