import React, { useState, useEffect } from 'react';
import GameOverPage from './components/GameOverPage';
import PlayPage from './components/PlayPage';
import LandingPage from './components/LandingPage';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import { useHistory } from 'react-router';
import './App.css';

const App = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [artistObj, setArtistObj] = useState({});
  function getArtist(search) {
    fetch(`/api/trackNames?search=${search}`)
      .then((results) => results.json())
      .then((data) => {
        //  const artistSongs = data.result.map(result => {
        //     return {preview: result.previewUrl, artist: result.artistName, track: result.trackName, thumbnail: result.artworkUrl100}
        //     });
        //     setArtistObj(artistSongs)
        setArtistObj(data);
        console.log(`Raw data from request :`);
        console.log(data);
        console.log(`This is what the artistObj is set to:`);
        console.log(artistObj);
      })
      .catch((err) => {
        console.log(err);
      });
    //return false;
  }
  useEffect(() => {
    return <Redirect to="/" />;
    //window.location = 'http://localhost:3000';
    //history.push('/');
  }, []);

  return (
    <Router>
      <NavMenu />
      <Container className="container">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return (
                <LandingPage
                  {...props}
                  search={search}
                  setSearch={setSearch}
                  getArtist={getArtist}
                  setArtistObj={setArtistObj}
                />
              );
            }}
          />
          <Route exact path="/gameover" component={GameOverPage} />
          <Route
            exact
            path="/play"
            render={(props) => {
              return <PlayPage {...props} artistObj={artistObj} />;
            }}
          />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
