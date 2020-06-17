import React, { Component } from 'react'

export default class TrackList extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(song) {
        console.log(song);
        this.props.updateLikes(song);
    }

    render() {
        let results = this.props.results
        return (
                <div>
                    <ul className='searchResults'>
                        {results.map(result => {
                            return (
                                <li id='result' key={result.id} onClick={() => this.handleClick(result)}>
                                    <a>{result.name} by {result.artists[0].name}</a>
                                </li>
                            )
                        })}
                    </ul>

                </div>
        )
    }
}
