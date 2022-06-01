import React, { Component } from 'react';

class MenuDisplay extends Component {
    orderId = [];

    // To add Menu Items to Orders
    addItem = (id) => {
        this.orderId.push(id);
        this.props.finalOrder(this.orderId);
    }

    // To Remove Menu Items from Orders
    removeItem = (id) => {
        if (this.orderId.indexOf(id) > -1) {
            this.orderId.splice(this.orderId.indexOf(id), 1);
        }
        this.props.finalOrder(this.orderId);
    }

    // To show Menu Items Added
    renderCart = (orders) => {
        if (orders) {
            return orders.map((item, index) => {
                return (
                    <b key={index}>{item} </b>
                )
            })
        }
    }

    // To show Menu Items wrt Restuarants
    renderMenu = ({ menuData }) => {
        if (menuData) {
            if (this.orderId.length > 0) {
                return menuData.map((item) => {
                    if (this.orderId.includes(item.menu_id)) {
                        let count = {};
                        this.orderId.forEach((id) => {
                            count[id] = (count[id] || 0) + 1;
                        })
                        return (
                            <div className="mt-2 row justify-content-center mb-3" key={item.menu_id}>
                                <div className="col-lg-1 col-md-2 col-sm-3 col-4 d-flex justify-content-center">
                                    <img src={item.menuImg} alt={item.menu_name} className="img-fluid menuImg" />
                                </div>
                                <div className="col-md-10 col-sm-9 col-8 row align-items-center">
                                    <div className="col-lg-8">
                                        <h5>{item.menu_name}</h5>
                                        <p className="menuPrice">Rs. {item.price}</p>
                                        <p className="menuDescription">{item.description}</p>
                                        <div className="d-lg-none d-block">
                                            <button className="btn btn-danger removeItemBtn" onClick={() => { this.removeItem(item.menu_id) }}><i className="fas fa-minus"></i></button>
                                            <span style={{ fontSize: '18px' }}> {count[item.menu_id]} </span>
                                            <button className="btn btn-success addItemBtn" onClick={() => { this.addItem(item.menu_id) }}><i className="fas fa-plus"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-4 justify-content-center d-lg-flex d-none">
                                        <button className="btn btn-danger removeItemBtn" onClick={() => { this.removeItem(item.menu_id) }}><i className="fas fa-minus"></i></button>
                                        <span style={{ fontSize: '20px'}}> &nbsp; {count[item.menu_id]} &nbsp; </span>
                                        <button className="btn btn-success addItemBtn" onClick={() => { this.addItem(item.menu_id) }}><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    } else if (this.orderId.includes(item.menu_id) == false) {
                        return (
                            <div className="mt-2 row justify-content-center mb-3" key={item.menu_id}>
                                <div className="col-lg-1 col-md-2 col-sm-3 col-4 d-flex justify-content-center">
                                    <img src={item.menuImg} alt={item.menu_name} className="menuImg" />
                                </div>
                                <div className="col-md-10 col-sm-9 col-8 row align-items-center">
                                    <div className="col-lg-8">
                                        <h5>{item.menu_name}</h5>
                                        <p className="menuPrice">Rs. {item.price}</p>
                                        <p className="menuDescription">{item.description}</p>
                                        <div className="d-lg-none d-block">
                                            <button className="btn btn-danger removeItemBtn" onClick={() => { this.removeItem(item.menu_id) }}><i className="fas fa-minus"></i></button>
                                            <span style={{ fontSize: '20px' }}> 0 </span>
                                            <button className="btn btn-success addItemBtn" onClick={() => { this.addItem(item.menu_id) }}><i className="fas fa-plus"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-4 justify-content-center d-lg-flex d-none">
                                        <button className="btn btn-danger removeItemBtn" onClick={() => { this.removeItem(item.menu_id) }}><i className="fas fa-minus"></i></button>
                                        <span style={{ fontSize: '20px' }}> &nbsp; 0 &nbsp; </span>
                                        <button className="btn btn-success addItemBtn" onClick={() => { this.addItem(item.menu_id) }}><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            } else {
                return menuData.map((item) => {
                    return (
                        <div className="mt-2 row justify-content-center mb-3" key={item.menu_id}>
                            <div className="col-lg-1 col-md-2 col-sm-3 col-4 d-flex justify-content-center">
                                <img src={item.menuImg} alt={item.menu_name} className="img-fluid menuImg" />
                            </div>
                            <div className="col-md-10 col-sm-9 col-8 row align-items-center">
                                <div className="col-lg-8">
                                    <h5>{item.menu_name}</h5>
                                    <p className="menuPrice">Rs. {item.price}</p>
                                    <p className="menuDescription">{item.description}</p>
                                    <div className="d-lg-none d-block">
                                        <button className="btn btn-danger removeItemBtn" onClick={() => { this.removeItem(item.menu_id) }}><i className="fas fa-minus"></i></button>
                                        <span style={{ fontSize: '20px' }}> 0 </span>
                                        <button className="btn btn-success addItemBtn" onClick={() => { this.addItem(item.menu_id) }}><i className="fas fa-plus"></i></button>
                                    </div>
                                </div>
                                <div className="col-4 justify-content-center d-lg-flex d-none">
                                    <button className="btn btn-danger removeItemBtn" onClick={() => { this.removeItem(item.menu_id) }}><i className="fas fa-minus"></i></button>
                                    <span style={{ fontSize: '20px' }}> &nbsp; 0 &nbsp; </span>
                                    <button className="btn btn-success addItemBtn" onClick={() => { this.addItem(item.menu_id) }}><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        }
    }

    render() {
        return (
            <>
                <div className="bg-success">
                    <h2>Item Added</h2>
                    Item Number {this.renderCart(this.orderId)} Added
                </div>
                {this.renderMenu(this.props)}
            </>
        )
    }
}

export default MenuDisplay;
