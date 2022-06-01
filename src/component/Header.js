import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

const usersURL = "https://zomato-login-reg-api.herokuapp.com/api/auth/userinfo";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: '',
            userName: ''
        }
    }

    handleLogout = () => {
        sessionStorage.removeItem('userInfo');
        sessionStorage.setItem('loginStatus', 'loggedOut');
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem('uName');
        this.setState({ userData: '', userName: ''});
        this.props.history.push('/');
    }

    conditionalHeader = () => {
        if (this.state.userData.firstName || sessionStorage.getItem('uName') !== null) {
            if (sessionStorage.getItem('uName') !== null) {
                let name = sessionStorage.getItem('uName'); 
                return (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="nav-link mx-lg-3 mx-md-1">Hi {name}</span>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link mx-lg-3 mx-md-1 btn" onClick={this.handleLogout}>Logout</button>
                        </li>
                    </ul>
                )
            } else {
                let data = this.state.userData;
                let outArray = [data.firstName, data.email, data.phone, data.role];
                sessionStorage.setItem('userInfo', outArray);
                sessionStorage.setItem('loginStatus', 'loggedIn');
                return (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="nav-link mx-lg-3 mx-md-1">Hi {data.firstName}</span>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link mx-lg-3 mx-md-1 btn" onClick={this.handleLogout}>Logout</button>
                        </li>
                    </ul>
                )
            }
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link mx-lg-3 mx-md-1">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="register" className="nav-link mx-lg-3 mx-md-1">Register</Link>
                    </li>
                </ul>
            )
        }
    }

    render() {
        return (
            <>
                <header>
                    {/* Navbar Section  */}
                    <nav className="navbar navbar-expand-md sticky-top">
                        <div className="container-fluid">
                            <Link to={'/'} className="navbar-brand">Zomato</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-bars"></i>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                {this.conditionalHeader()}
                            </div>
                        </div>
                    </nav>
                </header>
            </>
        )
    }

    componentDidMount() {
        if (this.props.location.search) {
            if (this.props.location.search.split('=')[0] == '?code') {
                var code = this.props.location.search.split('=')[1]
            }
            if (code) {
                let requestedData = {
                    code: code
                }

                if(sessionStorage.getItem('loginStatus') == 'loggedOut'){
                    fetch('http://localhost:9900/oauth', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(requestedData)
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            let userName = data.name;
                            sessionStorage.setItem('uName', userName);
                            sessionStorage.setItem('loginStatus', "loggedIn");
                            this.setState({ userName: userName });
                        })
                }
            }
        }

        fetch(usersURL, {
            method: 'GET',
            headers: {
                'x-access-token': sessionStorage.getItem('ltk')
            }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ userData: data });
            })

    }
}

export default withRouter(Header);
