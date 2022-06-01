import React, { Component } from 'react';
import Header from '../Header';
import './PlaceOrder.css';

const URL = 'https://zomatoapiclone.herokuapp.com/menuItem';
const placeOrderURL = 'https://zomatoapiclone.herokuapp.com/placeOrder';

class PlaceOrder extends Component {
    constructor(props) {
        super(props);

        let userData = sessionStorage.getItem('userInfo');

        this.state = {
            id: Math.floor(Math.random() * 1000000),
            rest_name: this.props.match.params.restName,
            name: userData ? userData.split(',')[0] : '',
            email: userData ? userData.split(',')[1] : '',
            cost: 0,
            phone: userData ? userData.split(',')[2] : '',
            address: 'XYZ',
            menuItem: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    checkout = () => {
        let obj = this.state;
        obj.menuItem = JSON.parse(sessionStorage.getItem('menu'))
        fetch(placeOrderURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(console.log('Order Taken'))

    }

    renderMenu = (data) => {
        let menu = JSON.parse(sessionStorage.getItem('menu'));
        if (data) {
            let count = {};
            menu.forEach((id) => {
                count[id] = (count[id] || 0) + 1;
            })
            return data.map((item) => {
                    if(count[item.menu_id] == 1){
                        return (
                            <div className="col my-3" key={item.menu_id}>
                                <div className="card">
                                    <img src={item.menuImg} className="card-img-top" alt={item.menu_name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.menu_name}</h5>
                                        <p className="card-text">Rs. {item.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="col my-3" key={item.menu_id}>
                                <div className="card">
                                    <img src={item.menuImg} className="card-img-top" alt={item.menu_name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.menu_name} x {count[item.menu_id]}</h5>
                                        <p className="card-text">Rs. {item.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
            })
        }
    }

    render() {
        if (sessionStorage.getItem('loginStatus') === 'loggedOut') {
            return (
                <>
                    <Header />
                    <h2>Login First to Place Order</h2>
                </>
            )
        } else {
            return (
                <>
                    <Header />
                    <div className="container">
                        <div className="RestName">
                            <h2>Your Order from <span style={{ textTransform: 'uppercase' }}><b>{this.props.match.params.restName}</b></span></h2>
                        </div>
                        <div className="orderForm container">
                            <form action="https://zomato-payment.herokuapp.com/paynow" method="POST">
                                <input type="hidden" name="cost" value={this.state.cost} />
                                <input type="hidden" name="id" value={this.state.id} />
                                <input type="hidden" name="hotel_name" value={this.state.rest_name} />

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="userOrderName" className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control" id="userOrderName" value={this.state.name} onChange={this.handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="userOrderEmail" className="form-label">Email</label>
                                        <input type="email" name="email" className="form-control" id="userOrderEmail" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="userOrderPhone" className="form-label">Phone</label>
                                        <input type="text" name="phone" className="form-control" id="userOrderPhone" placeholder="" value={this.state.phone} onChange={this.handleChange} />
                                    </div>
                                    {/* <div className="col-md-6">
                                    <label htmlFor="userOrderAddress" className="form-label">Address</label>
                                    <input type="text" name="address" className="form-control" id="userOrderAddress" placeholder="1234 Main St" onChange={this.handleChange}/>
                                </div> */}
                                    <div className="row">
                                        {this.renderMenu(this.state.menuItem)}
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h2>Total Price is Rs. {this.state.cost}</h2>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary" onClick={this.checkout}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )
        }
    }

    componentDidMount() {
        let menuItem = JSON.parse(sessionStorage.getItem('menu'));

        fetch(URL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(menuItem)
        })
            .then((res) => res.json())
            .then(data => {
                let count = {};
                menuItem.forEach((id) => {
                    count[id] = (count[id] || 0) + 1;
                })
                let totalPrice = 0;
                data.map((item) => {
                    totalPrice += parseFloat(item.price) * parseFloat(count[item.menu_id]);
                    return 'ok';
                })
                this.setState({ cost: totalPrice, menuItem: data });
            })
    }
}

export default PlaceOrder;