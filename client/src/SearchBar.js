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
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    
    //     // search tracks on spotify, update searchResults
    //     const searchParams = this.state.searchParams;
    //     spotifyWebApi.searchTracks(searchParams)
    //       .then((data) => {
    //         let results = [];
    //         data.tracks.items.forEach(item => {results.push(item)});
    //         this.setState({searchResults: results});
    //       }, (err) => {
    //         console.log(err);
    //       })
    // }

    handleChange(e) {
    // console.log(e.target.value);
    this.setState({searchParams: e.target.value});
    }

    spotifySearch(str) {
        spotifyWebApi.searchTracks(str)
          .then((data) => {
            let results = [];
            data.tracks.items.forEach(item => {results.push(item)});
            this.setState({searchResults: results});
            // return results;
          }, (err) => {
            console.log(err);
          })
    }


    render() {

        if (this.state.searchParams.length > 0) {
            this.spotifySearch(this.state.searchParams);
        }

        return (
            <div>
                <input type='text' onChange={this.handleChange} value={this.state.searchParams} placeholder='Search for songs on Spotify'/>
                {this.state.searchParams.length > 0 && <TrackList results={this.state.searchResults}/>}
            </div>
            
            
        )
    }
}
