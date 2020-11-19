import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Newsfeed from './Pages/Newsfeed';
import Profile from './Pages/Profile';
import FriendsLists from './Pages/FriendsLists';
import Chat from './Pages/Chat';
import Birthday from './Pages/Birthday';
import Register from './Pages/Register';
import Navbar from './component/Navigation/Navbar';
import Login from './Pages/Login';

function App() {
  return (
    <>
      <Router>
        {/* <Register /> */}
        {/* <Test /> */}
        <Navbar />

        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
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
