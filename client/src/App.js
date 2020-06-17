import React, {Component} from 'react';
import Spotify from 'spotify-web-api-js';
import './App.css';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import User from './components/User';
import NowPlaying from './components/NowPlaying';
import SignIn from './components/SignIn';

const spotifyWebApi = new Spotify();


class App extends Component{

  constructor(props) {
    super(props);

    // Gets access token
    const params = this.getHashParams();
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }

    this.state = {
      loggedIn: params.access_token===spotifyWebApi.getAccessToken() ? true : false,
      username: '',
      userImage: null,
      likedSongs: [],
      access_token: spotifyWebApi.getAccessToken() || null,
      playbackState: {},
      currentSong: {},
      hashParams: params
    }

    this.updateLikes = this.updateLikes.bind(this);
    this.updateCurrent = this.updateCurrent.bind(this);
    this.playSong = this.playSong.bind(this);
    // this.getCurrentPlaybackState = this.getCurrentPlaybackState.bind(this);
  }
  
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  /**
   * After component mounts, obtain User's info and playback state
   */
  componentDidMount() {

    // console.log(spotifyWebApi.getAccessToken());

    // fetch('https://api.spotify.com/v1/me', {
    //   headers: {
    //     'Authorization': 'Bearer ' + spotifyWebApi.getAccessToken()
    //   }
    // }).then((response) => response.json())
    // .then(data => {console.log(data)});

    spotifyWebApi.getMe()
      .then(res => {
          this.setState(
            {
              username: res.display_name,
              userImage: res.images[0].url
            }
          );
          console.log(res);
      });

      spotifyWebApi.getMyCurrentPlaybackState()
      .then(response => {
        this.setState({playbackState: response})
      })
  }


  /**
   * Handles adding selected song to likedSongs
   * @param {*} likedSong - song to add
   */
  updateLikes(likedSong) {
    let likedSongs = this.state.likedSongs;
    if (likedSongs.length === 3) {
      likedSongs.shift();
      likedSongs.push(likedSong)
    } else {
      likedSongs.push(likedSong);
    }
    this.setState({
      likedSongs: [...likedSongs]
    });
  }

  /**
   * Handles playing a selected song. If no song is selected, then Spotify will play the current song in queue
   * @param {*} song - song to play
   */
  playSong(song) {
    console.log(song || 'Resume');
    if (!song){
      spotifyWebApi.play()
    } else {
      let songs = {
        'uris': [`${song.uri}`]
      };
      spotifyWebApi.play(songs);
    }
  }

  /**
   * Pauses current track
   */
  pauseSong() {
    spotifyWebApi.pause();
  }

  /**
   * Keeps track of current song playing
   * @param {*} song - current song
   */
  updateCurrent(song) {
    console.log(song);
    this.setState({currentSong: song});
  }


  render() {
    return (
      <div className="App">
        <NavBar username={this.state.username}/> 
        
        <SearchBar token={spotifyWebApi.getAccessToken()} updateLikes={this.updateLikes}/>

        <SignIn/>
        

        <NowPlaying currentSong={this.state.currentSong}/>

        <User 
          userImage={this.state.userImage} 
          likedSongs={this.state.likedSongs} 
          playSong={this.playSong} 
          pauseSong={this.pauseSong}
          updateCurrent={this.updateCurrent}
        />

      </div>
    );
  }
}

export default App;
