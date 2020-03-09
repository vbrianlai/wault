import React, { Component } from 'react';
import {Popover, OverlayTrigger, Button} from 'react-bootstrap';
import './User.css'

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likedSongs: this.props.likedSongs
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.likedSongs !== prevProps.likedSongs) {
          this.setState({ likedSongs: this.props.likedSongs });
        }
    }

    handleClick(song) {
        this.props.playSong(song);
    }

    render() {

        // overlay will show user's liked songs
        const popover = (
            <Popover className='User-popover'>
              <Popover.Title as="h3">what are u listening to?</Popover.Title>
                {this.state.likedSongs.map((song, i) => {
                    return <Popover.Content className='User-popover-content' onClick={() => this.handleClick(song)}><a>{i+1}. {song.name}</a></Popover.Content>
                })}
            </Popover>
          );

        return (
            <div className='User'>
                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                    <img src={this.props.userImage}/>
                </OverlayTrigger>
            </div>
        )
    }
}
