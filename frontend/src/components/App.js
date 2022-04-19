import React, {
  useState,
  useEffect
} from 'react';
import {
  Switch,
  Route,
  useHistory
} from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from './ProtectedRoute.js';
import {
  api
} from '../utils/api';
import {
  CurrentUserContext
} from "../contexts/CurrentUserContext";
import auth from '../utils/auth';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const history = useHistory();

  function closePopup() {
    setInfoTooltip(false)
  }

  const handleRegister = (email, password) => {
    auth.signup(password, email)
      .then((res) => {
        setInfoTooltip(true);
        if (res) {
          setMessage(true);
          history.push('/sign-in');
        } else {
          setMessage(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(true);
        setMessage(false);
      });
  }

  const handleLogin = (email, password) => {
    auth.signin(password, email)
      .then((res) => {
        if (res) {
          console.log(res);
          setLoggedIn(true);
          setCurrentUser(res.data);
          localStorage.setItem('jwt', res.token);
          api.refreshToken();
          history.push('/');
        } else {
          setInfoTooltip(true);
          setMessage(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltip(true);
        setMessage(false);
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
        .then((userInfo) => {
          if (userInfo) {
            setCurrentUser(userInfo);
            // setUserEmail(userInfo.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          localStorage.removeItem('jwt');
          console.log(err)
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="page">
        <Header
          userEmail={currentUser.email}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
          />

          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
            />
          </Route>
        </Switch>
        <InfoTooltip
          status={message}
          onClose={closePopup}
          isOpen={isInfoTooltip}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
