import './App.css';
import NavBar from './Components/NavBar';
import LandingPage from './Components/LandingPage';
import BlogDetail from './Components/BlogDetail';
import CreateModal from './Components/CreateModal';
import Login from './Components/Login';
import UserProfile from './Components/UserProfile';

import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux';

function App() {
  const users = useSelector((state)=>state.users);

  const [modal,setModal] = useState(false);
  const [create,setCreate] = useState(false);
  const [profile,setProfile] = useState(false);

  const [auth,setAuth] = useState(false);
  const [byPostId,setPostId] = useState('');
  const [byUserId,setUserId] = useState('');

  const user_id = localStorage.getItem('user_id');
  const user = users.filter(user=> user.id === user_id );

  const loginAuth = () => {
    if(user.length === 0) {
      setAuth(!auth);
    }
  }

  const logout = () => {
    if(user.length !== 0){
      if(user[0].id === user_id){
        setAuth(!auth);
      }
    }
  }

  const toggleModal = (id) => {
    setModal(!modal);
    if(id!==undefined){
      setPostId(id);
    }
  }

  const toggleProfile = (id) => {
    setProfile(!profile);
    if(id!==undefined){
      setUserId(id);
    }
  }

  const toggleCreate = () => setCreate(!create);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" render={(props)=>
            <div>
              <NavBar toggleProfile={toggleProfile} toggleCreate={toggleCreate} user={user} {...props} id={user_id}/>
              <div className="container">
                <LandingPage toggleProfile={toggleProfile} toggleDetail={toggleModal} id={user_id} user={user}/>
                <BlogDetail toggleProfile={toggleProfile} modalDetail={modal} toggleDetail={toggleModal} byUserId={byUserId} byPostId={byPostId} user_id={user_id} user={user} {...props}/>
                <CreateModal user={user} modalCreate={create} toggleCreate={toggleCreate}/>
                <UserProfile toggleProfile={toggleProfile} profileOpen={profile} byUserId={byUserId} logout={logout} user={user}/>
              </div>
            </div>
          }/>
          {user.length === 0 ?
            <Route path="/login" render={(props)=>
              <Login loginAuth={loginAuth} {...props}/>
            }/> :
            <Redirect to="/"/>
          }
          <Route path="*"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;