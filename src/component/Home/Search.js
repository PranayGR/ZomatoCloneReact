import React,{Component} from 'react';
import './Search.css';
import {withRouter} from 'react-router-dom';

const cityURL = "https://zomatoapiclone.herokuapp.com/city";
const restURL = "https://zomatoapiclone.herokuapp.com/restuarants?city_id="

class Search extends Component {
    constructor(props) {
        super(props);

        this.state={
            city:'',
            restData:''
        }
    }

    // Show Cities in City DropDown
    renderCity = (data) => {
        if(data){
            return data.map((item) => {
                return(
                <option value={item._id} className="text-sm-center" key={item._id}>{item.city}</option>
                )
            })
        }
    }

    // Show Restuarants in Restuarnts Dropdown wrt city
    renderRest = (resData) => {
        if(resData){
            return resData.map((item) => {
                return(
                <option value={item.restuarant_id} key={item.restuarant_id}>{item.restuarantName} | {item.location}</option>
                )
            })
        }
    }


    // Fetch Restuarant Data on City Select
    handleCity = (event) =>{
        let cityId = event.target.value;
        fetch(`${restURL}${cityId}`,{method: 'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.setState({restData: data});
        })
    }

    handleRest = (event) => {
        let restId = event.target.value;
        this.props.history.push(`/details?restId=${restId}`)
    }

    render() {
        return (
            <>
                <div id="banner-section">
                    <div className="container user-select-none">
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="col-2 logo d-flex justify-content-center align-items-center">
                                    Z
                                </div>
                            </div>
                            <div className="col-12 my-3 text-center">
                                <h1 className="text-white headline">Find The Best Restaurants Near You</h1>
                            </div>
                            <div className="col-md-3 col-6">
                                <select className="dropdown form-select" id="citySelect" defaultValue={'DEFAULT'} onChange={this.handleCity}>
                                    <option disabled className="text-sm-center" value="DEFAULT">SELECT CITY</option>
                                    {this.renderCity(this.state.city)}
                                </select>
                            </div>
                            <div className="col-md-4 col-6">
                                <select className="dropdown form-select" defaultValue={'DEFAULT'} id="hotelSelect" onChange={this.handleRest}>
                                    <option disabled className="text-sm-center" value="DEFAULT">SELECT RESTUARANTS</option>
                                    {this.renderRest(this.state.restData)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // Api on Page Load
    componentDidMount() {
        fetch(cityURL, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({city: data})
        })
    }
}

export default withRouter(Search);