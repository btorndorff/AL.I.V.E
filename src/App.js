import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Camera from './screens/Camera';
import Collection from './screens/Collection';
import Login from './screens/Login'
import LanguageSelect from './screens/LanguageSelect';


function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("BG");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data)
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user])

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="App">
      {!profile ?
        <Login login={login} />
        :
        // <LanguageSelect />
        <Router>
          <Routes>
            <Route path="/alive-frontend" element={<Camera logOut={logOut} {...profile} />} />
            <Route path="/collection" element={<Collection {...profile} />} />
          </Routes>
        </Router>
      }
    </div >



  );
}
export default App;
