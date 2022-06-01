import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MenuDisplay from './MenuDisplay';
import Header from '../Header';
import './Details.css';

let detailURL = "https://zomatoapiclone.herokuapp.com/details/"
let menuURL = "https://zomatoapiclone.herokuapp.com/menu/"

class RestDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: '',
            menuList: '',
            userItem: '',
            mealId: sessionStorage.getItem('mealId')
        }
    }

    // To add Menu Items in State
    addToCart = (data) => {
        this.setState({ userItem: data });
    }

    // To go on Order Page
    proceed = () => {
        if(this.state.userItem == []){
            alert('Please select at least one of the item from the menu');
        } else{
            if (sessionStorage.getItem('loginStatus') == 'loggedIn') {
                sessionStorage.setItem('menu', JSON.stringify(this.state.userItem));
                this.props.history.push(`/placeOrder/${this.state.details.restuarantName}`)
            } else {
                alert('Please Login to Place Order');
                sessionStorage.setItem('menu', JSON.stringify(this.state.userItem));
                sessionStorage.setItem('restName', this.state.details.restuarantName)
                this.props.history.push(`/login`);
            }
        }
    }

    displayStar = (rating) => {
        if (Number(rating) == 5) {
            return (
                <>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                </>
            )
        }else if(4 <= Number(rating)) {
            if ((Number(rating) % 1) > 0.4) {
                return (
                    <>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half"></i>
                    </>
                )
            } else if ((Number(rating) % 1) < 0.5) {
                return (
                    <>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </>
                )
            }
        } else if (3 <= Number(rating)) {
            if ((Number(rating) % 1) > 0.4) {
                return (
                    <>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half"></i>
                    </>
                )
            } else if ((Number(rating) % 1) < 0.5) {
                return (
                    <>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </>
                )
            }
        } else if (2 <= Number(rating)) {
            if ((Number(rating) % 1) > 0.4) {
                return (
                    <>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half"></i>
                    </>
                )
            } else if ((Number(rating) % 1) < 0.5) {
                return (
                    <>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </>
                )
            }
        } else if (1 <= Number(rating)) {
            if ((Number(rating) % 1) > 0.4) {
                return (
                    <>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half"></i>
                    </>
                )
            } else if ((Number(rating) % 1) < 0.5) {
                return (
                    <>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                    </>
                )
            }
        } else {
            return (
                <>
                    No Review
                </>
            )
        }
    }

    render() {
        let { details } = this.state;
        return (
            <>
                <Header />
                <div className="row mt-2 mb-5">
                    <h2>{details.restuarantName}</h2>
                    <p className="location1"><i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp; {details.location}</p>
                    <div className="col-lg-5 d-flex justify-content-center">
                        <img src={details.RestuarantImg} alt={details.restuarantName} className="RestImg" />
                    </div>
                    <div className="col-lg-7 mx-lg-0 mx-3">
                        <h2 className="restName">{details.restuarantName}</h2>
                        <p className="location"><i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp; {details.location}</p>
                        <p className="rating">
                            {this.displayStar(details.rating)}
                            &nbsp; &nbsp; &nbsp;
                            <span className="restRating">{details.rating}</span>
                        </p>
                        <p>Old Price: <strike><span className="oldPrice">₹ {parseInt(details.cost) + 400}</span></strike></p>
                        <p>New Price: <span className="newPrice">₹ {details.cost}</span></p>
                        <div className="promises mb-5">
                            <img src="https://i.ibb.co/GtgmZ9H/sanitized.jpg" alt="" />
                            <img src="https://i.ibb.co/FgBzpnj/free-deliver.png" alt="" />
                        </div>
                        <button className="btn btn-primary" onClick={this.proceed}>Proceed</button>
                    </div>
                </div>
                <MenuDisplay menuData={this.state.menuList} finalOrder={(data) => { this.addToCart(data)}} />
            </>
        )
    }

    // Api on Page Load
    async componentDidMount() {
        let restId = this.props.location.search.split('=')[1];
        let response = await axios.get(`${detailURL}${restId}`)
        let mealData = await axios.get(`${menuURL}${restId}`)
        this.setState({ details: response.data[0], menuList: mealData.data })
    }
}

export default RestDetails;
