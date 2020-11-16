import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './component/Navigation/Navbar';
import Newsfeed from './Pages/Newsfeed';
import Profile from './Pages/Profile';
import FriendsLists from './Pages/FriendsLists';
import Chat from './Pages/Chat';
import Birthday from './Pages/Birthday';
import Register from './component/Register';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Register />
        <Switch>
          <Route path='/profile' component={Profile} />
          <Route path='/friendsLists' component={FriendsLists} />
          <Route path='/chat' component={Chat} />
          <Route path='/birthday' component={Birthday} />
          <Route path='/' exact component={Newsfeed} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
