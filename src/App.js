import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Camera from './screens/Camera';
import Collection from './screens/Collection';
import Login from './screens/Login'
import LanguageSelect from './screens/LanguageSelect';
import Nav from './screens/Nav';


function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("BG");
  const [nav, setNav] = useState(false);
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse)
      //navigate to /language-select

    },
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

  useEffect(() => {
    if (profile) {
      console.log("user looking")
      fetch(`http://alive-hci.uk.r.appspot.com/user/${profile.id}`)
        .then(res => {
          if (res.status === 200) {
            // user exists in the database
            res.json()
              .then(data => {
                console.log(data.language);
                setFirstTimeUser(false);
                setSelectedLanguage(data.language);
              })
              .catch(err => console.error(err));
          } else if (res.status === 404) {
            // user does not exist in the database
            setFirstTimeUser(true);
          } else {
            // handle other errors here
          }
        })
        .catch(err => {
          console.error(err);
          // handle error here
        });
    }
  }, [profile])

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setNav(false)
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  function Mode(component) {
    if (profile) {
      if (firstTimeUser) {
        //add user to db
        return <LanguageSelect setFirstTimeUser={setFirstTimeUser} setSelectedLanguage={setSelectedLanguage} selectedLanguage={selectedLanguage} {...profile} />
      }
      if (nav) {
        return <Nav logOut={logOut} setNav={setNav} setSelectedLanguage={setSelectedLanguage} selectedLanguage={selectedLanguage} {...profile} />
      } else {
        return component
      }
    } else {
      return <Login login={login} />
    }
  }

  return (
    <div className="App">
      {/* {!profile ?
        <Login login={login} />
        :
        <Router>
          <Routes>
            <Route path="/alive-frontend" element={<Camera logOut={logOut} {...profile} />} />
            <Route path="/collection" element={<Collection {...profile} />} />
            <Route path="/language-select" element={<LanguageSelect handleLanguageChange={handleLanguageChange}/>} />
          </Routes>
        </Router>
      } */}
      <Router>
        <Routes>
          <Route path="/alive-frontend" element={Mode(<Camera logOut={logOut} setNav={setNav} {...profile} selectedLanguage={selectedLanguage} />)} />
          {/* <Route path="/alive-frontend" element={} /> */}
          <Route path="/collection" element={<Collection {...profile} />} />
          <Route path="/language-select" element={<LanguageSelect setSelectedLanguage={setSelectedLanguage} />} />
        </Routes>
      </Router>
    </div >



  );
}
export default App;
