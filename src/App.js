import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navbar from './component/Navigation/Navbar';
import Login from './component/Authorisation/Login/Login';
import Register from './component/Authorisation/Register/Register';
import Newsfeed from './Pages/Newsfeed';
import Profile from './Pages/Profile';
import FriendsLists from './Pages/FriendsLists';
import Chat from './Pages/Chat';
import Birthday from './Pages/Birthday';
import IfAuth from './component/Authorisation/IfAuth';

function App() {
  return (
    <>
      <Router>
        {/* <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Redirect path='/newsfeed' />
        </Switch> */}
        <Navbar />
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/chitter' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/friendsLists' component={FriendsLists} />
          <Route path='/chat' component={Chat} />
          <Route path='/birthday' component={Birthday} />
          <Route path='/newsfeed' component={Newsfeed} />
          <Route path='/' exact component={Register} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
