import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js';
import TrackList from './TrackList';
import './SearchBar.css'

const spotifyWebApi = new Spotify();

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: '',
            searchResults: [],
            showResults: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.value.length > 0) {
            this.spotifySearch(e.target.value);
        }
        this.setState({searchParams: e.target.value});
    }

    spotifySearch(str) {
        spotifyWebApi.searchTracks(str, {limit: 5})
          .then((data) => {
            let results = [];
            data.tracks.items.forEach(item => {
                results.push(item);
            });
            this.setState({searchResults: results});
          }, (err) => {
            console.log(err);
          })
    }

    render() {
        return (
            <div >
                <input className='mt-3 mx-auto' type='text' onChange={this.handleChange} value={this.state.searchParams} placeholder='Search for songs on Spotify'/>
                {this.state.searchParams.length > 0 && <TrackList results={this.state.searchResults} updateLikes={this.props.updateLikes}/>}
            </div>
            
            
        )
    }
}
