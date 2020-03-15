import React, { Component } from 'react'
import './NowPlaying.css'
import {Card} from 'react-bootstrap';

export default class NowPlaying extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            currentSong: {}
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        console.log('cud');
        if (this.props.currentSong !== prevProps.currentSong) {
          this.setState({ currentSong: this.props.currentSong });
        }
    }


    render() {
        return (
            <div className='NowPlaying text-center'>
                {/* <Card>
                    <Card.Img variant='top' src=''/>
                </Card> */}
                <div style={{fontFamily: 'Roboto Slab, serif'}}>#NP:</div>
                <div style={{fontFamily: 'Roboto Slab, serif'}}>
                    {/* {this.props.currentSong.hasOwnProperty('item') ? this.props.currentSong.item.name : 'Loading'} */}
                    {Object.keys(this.state.currentSong).length > 0 ? 
                        `${this.state.currentSong.name} by ${this.state.currentSong.artists[0].name}`
                        : "Play your friend's song!"}
                </div>
            </div>
        )
    }
}
