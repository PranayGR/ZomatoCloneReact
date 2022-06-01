import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home/Home';
import Footer from './Footer';
import Listing from './Listing/Listing';
import RestDetails from './Details/RestDetails';
import ViewOrder from './Booking/ViewOrder';
import PlaceOrder from './Booking/PlaceOrder';
import Login from './Login/Login';
import Register from './Login/Register';

class Routing extends React.Component {
    render(){
        return(
        <BrowserRouter>
                    <Route exact path="/" component= {Home}></Route>
                    <Route path="/listing/:mealId" component= {Listing}></Route>
                    <Route path="/details" component= {RestDetails}></Route>
                    <Route path="/viewBooking" component= {ViewOrder}></Route>
                    <Route path="/placeOrder/:restName" component= {PlaceOrder}></Route>
                    <Route path="/login" component= {Login}></Route>
                    <Route path="/register" component= {Register}></Route>
                    <Footer/>
        </BrowserRouter>
        )
    }
}

export default Routing;