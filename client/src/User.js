import React, { Component } from 'react';
import {Popover, OverlayTrigger, Button} from 'react-bootstrap';
import './User.css'

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likedSongs: this.props.likedSongs
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.likedSongs !== prevProps.likedSongs) {
          this.setState({ likedSongs: this.props.likedSongs });
        }
    }
    render() {
        const popover = (
            <Popover>
              <Popover.Title as="h3">what are u listening to?</Popover.Title>
              {/* <Popover.Content> */}
                
                    {this.state.likedSongs.map((song, i) => {
                        return <Popover.Content><a>{i+1}. {song}</a></Popover.Content>
                    })}
                
              {/* </Popover.Content> */}
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
