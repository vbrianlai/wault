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
                
                <div style={{fontFamily: 'Roboto Slab, serif'}}>#NP:</div>
                <div style={{fontFamily: 'Roboto Slab, serif'}} className='NowPlaying-card'>

                    {Object.keys(this.state.currentSong).length > 0 ?
                        <Card style={{width: '8rem'}} className='mx-auto'>
                            <Card.Img variant='top' src={this.state.currentSong.album.images[0].url}/>
                            {/* <Card.ImgOverlay> */}
                                <Card.Title style={{fontSize: '1rem'}}>
                                    {this.state.currentSong.name}
                                </Card.Title>
                                <Card.Text style={{fontSize: '0.5rem'}}>
                                    {this.state.currentSong.artists[0].name}
                                </Card.Text>

                            {/* </Card.ImgOverlay> */}
                        </Card>
                        :
                        'Play your friends song!'
                    }
                </div>
            </div>
        )
    }
}
