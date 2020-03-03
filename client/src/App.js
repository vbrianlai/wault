import React, {Component} from 'react';
import Spotify from 'spotify-web-api-js';

import './App.css';
import SearchBar from './SearchBar';

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
      nowPlaying: {
        name: 'Not Checked',
        image: ''
      },
      searchParams: ''
    }

    this.getNowPlaying = this.getNowPlaying.bind(this);
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
          this.setState({username: res.display_name});
          console.log(res);
      });
    
    // spotifyWebApi.getMyRecentlyPlayedTracks()
    //   .then(res => {
    //       console.log(res);
    //   });
  }

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then(response => {
        let song = response ? {name: response.item.name, image: response.item.album.images[0].url} : {name: 'unidentified', image : 'unidentified'}
        this.setState({nowPlaying: song});
      })
  }

  getUser() {
    spotifyWebApi.getMe()
      .then(response => {
        this.setState({
          username: response.display_name
        })
      });
  }

  render() {
    // let user = spotifyWebApi.getMe().then( res => res.display_name);
    console.log(this.state.username);
    return (
      <div className="App">
      {
        (!this.state.loggedIn) ? 
        <a href='http://localhost:8888'>
          <button>Login with Spotify</button>
        </a>
        :
        <div>
          <div>You are logged in as {this.state.username}</div>
          <a href='http://localhost:8888'>
            <button>Login with a different Spotify account</button>
          </a>
        </div>
          
      }
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.image} style={{width: 100}}/>
        </div>
        <button onClick={this.getNowPlaying}>
          Check Now Playing
        </button>

        {/* <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} value = {this.state.searchParams}/>
          <button>Submit</button>
        </form> */}
        <SearchBar token={spotifyWebApi.getAccessToken()}/>
        
        
      </div>
    );
  }
}

export default App;
