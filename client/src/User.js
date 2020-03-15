import React, { Component } from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPlayCircle, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import './User.css';


export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likedSongs: this.props.likedSongs,
            chosenSong: {},
            isPlaying: false
        }
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.likedSongs !== prevProps.likedSongs) {
          this.setState({ likedSongs: this.props.likedSongs });
        }
    }

    handlePlay(song) {
        this.props.playSong(song);
        this.setState({isPlaying: true});
    }

    handlePause() {
        if (!this.state.isPlaying) {
            return;
        } else {
            this.setState({isPlaying: false})
            this.props.pauseSong();
        }
    }

    handleUserClick() {
        {this.state.isPlaying ? this.handlePause() : this.handlePlay()}
    }

    chooseSong(song) {
        this.props.updateCurrent(song);
        this.setState({chosenSong: song});
    }

    render() {

        // overlay will show user's liked songs
        const popover = (
            <Popover className='User-popover'>
              <Popover.Title as="h3">what are u listening to?</Popover.Title>
                {this.state.likedSongs.map((song, i) => {
                    return  <Popover.Content className='User-popover-content' key={i}>
                                {(this.state.isPlaying && this.state.chosenSong === song) ?
                                    <FontAwesomeIcon className='mr-2' onClick={() => {this.handlePause(); this.chooseSong(song)}} icon={faPauseCircle} size='2x'/>
                                    :
                                    <FontAwesomeIcon className='mr-2' onClick={() => {this.handlePlay(song); this.chooseSong(song)}} icon={faPlayCircle} size='2x'/>
                                }
                                <div>{song.name}</div>
                            </Popover.Content>
                })}
            </Popover>
          );

        return (
            <div className='User'>
                {
                    !this.props.userImage ? 
                        <FontAwesomeIcon icon={faUser} size='10x'/> 
                    : 
                        <div className='User-icon'>
                            <FontAwesomeIcon className='User-play' icon={this.state.isPlaying? faPauseCircle : faPlayCircle} size='2x' onClick={this.handleUserClick}/>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                <div className='User-icon-pic'>
                                    <img src={this.props.userImage} className={this.state.isPlaying ? 'spinning' : 'stop-spinning'}/>
                                </div>
                                
                            </OverlayTrigger>
                            
                        </div> 
                }
            </div>
        )
    }
}
