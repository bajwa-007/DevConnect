import { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Post';
import Post from './components/post/Post';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      // Set auth token header
      setAuthToken(localStorage.token);
    }
    // Load user on initial render
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profiles' element={<Profiles />} />
            <Route path='/profile/:id' element={<Profile />} />

            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/create-profile'
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }
            />
            <Route
              path='/edit-profile'
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route
              path='/add-experience'
              element={
                <PrivateRoute>
                  <AddExperience />
                </PrivateRoute>
              }
            />
            <Route
              path='/add-education'
              element={
                <PrivateRoute>
                  <AddEducation />
                </PrivateRoute>
              }
            />
            <Route
              path='/posts'
              element={
                <PrivateRoute>
                  <Posts />
                </PrivateRoute>
              }
            />
            <Route
              path='/posts/:id'
              element={
                <PrivateRoute>
                  <Post />
                </PrivateRoute>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
