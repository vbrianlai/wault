import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <Link to='/' className='navbar-brand'>wault</Link>
                <button 
                    className='navbar-toggler' 
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#navbarNav' 
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav mr-auto'>

                        <li className='nav-item'>
                            <NavLink to='/' className='nav-link'>Home</NavLink>
                        </li>
                    </ul>
                    
                    <ul className='navbar-nav'>
                        {
                            !this.props.username.length > 0 ? 
                                <li className='nav-item'>
                                    <a className='nav-link' href='http://localhost:8888/login'>Connect with Spotify</a>
                                </li>
                                :
                                <li className='nav-item' className='nav-link'>
                                    <span>You are connected as Spotify user {this.props.username}. </span> 
                                    <a  href='http://localhost:8888/login'>Not You?</a>
                                </li>
                        }

                    </ul>
                    
                </div>
            </nav>
        )
    }
}
