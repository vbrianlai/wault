import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js';

export default class TrackList extends Component {
    
    render() {
        return (
            <div>
                {this.props.results.map(result => {
                    return <div key={result.id}>{result.name}</div>
                })}
            </div>
        )
    }
}
