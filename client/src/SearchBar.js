import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js';
import TrackList from './TrackList';

const spotifyWebApi = new Spotify();

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchParams: '',
            searchResults: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
    
        // search tracks on spotify, update searchResults
        const searchParams = this.state.searchParams;
        spotifyWebApi.searchTracks(searchParams)
          .then((data) => {
            let results = [];
            data.tracks.items.forEach(item => {results.push(item)});
            this.setState({searchResults: results});
          }, (err) => {
            console.log(err);
          })

        
    }
    
    handleChange(e) {
    // console.log(e.target.value);
    this.setState({searchParams: e.target.value});
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' onChange={this.handleChange} value = {this.state.searchParams}/>
                    <button>Submit</button>
                </form>
                {
                    this.state.searchResults.length > 0 &&
                        <TrackList results={this.state.searchResults}/>
                }
            </div>
            
            
        )
    }
}
