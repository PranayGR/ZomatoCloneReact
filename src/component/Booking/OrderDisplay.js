import React from 'react';
import {withRouter} from 'react-router-dom';

const OrderDisplay = (props) => {  

    const renderTable = ({orderData}) => {
        if(orderData){
            return orderData.map((item) =>{
                return(
                    <tr key={item.id}>  
                        <td>{item.id}</td>
                        <td>{item.rest_name}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>Rs. {item.cost}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                        <td>{item.bank}</td>
                    </tr>
                )
            })
        }
    }

    return(
        <div className="container">
            <h3 style={{textAlign:'center'}}>YOUR ORDERS</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>RestName</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Cost</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>BankName</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props)}
                </tbody>
            </table>
        </div>   
    )
}

export default withRouter(OrderDisplay);