import React, { Component } from 'react';
import QuickDisplay from './QuickDisplay';
import './QuickSearch.css';

const mealURL = "https://zomatoapiclone.herokuapp.com/mealtype";

class QuickSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mealtype: ''
        }
    }

    render() {
        return (
            <>
                <div className="container text-center QuickSearch">
                    <h1>Quick Search</h1>
                    <h3>Discover Restuarants By Meal</h3>
                    <QuickDisplay mealData={this.state.mealtype} />
                </div>
                <hr />
                <div className="container text-center social">
                    <p className="">FOLLOW US ON</p>
                    <a href="www.facebook.com"><i className="fab fa-facebook-square"></i></a>
                    <a href="www.instagram.com"><i className="fab fa-instagram"></i></a>
                    <a href="www.youtube.com"><i className="fab fa-youtube"></i></a>
                </div>
            </>
        )
    }

    // API Load on page call
    componentDidMount() {
        fetch(mealURL, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ mealtype: data })
            })
    }


}

export default QuickSearch;