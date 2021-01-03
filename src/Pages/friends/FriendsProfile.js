import React from 'react';
import { Container } from '@material-ui/core';
import bg1 from '../images/friends-bg1.jpg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './friendsStyle';
import { addFriend, removeFriend } from '../../actions';

function FriendsProfile(props) {
  console.log(props.friends);
  const classes = useStyles();
  return (
    <>
      <Container className={classes.container}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component='img'
              alt='Profile Picture'
              height='140'
              image={props.friends.avatar || bg1}
              title='Profile Picture'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {props.friends.name}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {props.pending ? (
              <>
                <Button
                  size='small'
                  color='primary'
                  onClick={(e) => addFriend(props.friends.id)}
                >
                  Accept Request
                </Button>
                <Button size='small' color='primary'>
                  Delete Request
                </Button>
              </>
            ) : props.outgoing ? (
              <>
                <Button
                  size='small'
                  color='primary'
                  onClick={(e) => {
                    removeFriend(props.friends.id);
                  }}
                >
                  cancel Request
                </Button>
              </>
            ) : (
              <>
                <Button
                  size='small'
                  color='primary'
                  onClick={(e) => {
                    removeFriend(props.friends.id);
                  }}
                >
                  Remove Friend
                </Button>
                <Button size='small' color='primary'>
                  Message
                </Button>
              </>
            )}
          </CardActions>
        </Card>
      </Container>
    </>
  );
}

export default FriendsProfile;
