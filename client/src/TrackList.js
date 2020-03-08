import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js';

export default class TrackList extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log(e.currentTarget.textContent);
        this.props.updateLikes(e.currentTarget.textContent);
    }

    render() {
        let results = this.props.results
        return (
                <ul className='searchResults'>
                    {results.map(result => {
                        return (
                            <li id='result' key={result.id} onClick={this.handleClick}>
                                <a value={result.name}>{result.name} by {result.artists[0].name}</a>
                            </li>
                        )
                    })}
                </ul>
            
        )
    }
}
