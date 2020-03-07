import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js';

export default class TrackList extends Component {

    render() {
        let results = this.props.results
        return (
            
                <ul className='searchResults'>
                    {results.map(result => {
                        return <li id='result' key={result.id}>{result.name} by {result.artists[0].name}</li>
                    })}
                </ul>
            
        )
    }
}
