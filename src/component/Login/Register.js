import React,{Component} from 'react';
import Header from '../Header';

const registerURL = "https://zomato-login-reg-api.herokuapp.com/api/auth/register";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:'',
            phone:'',
            email:'',
            password:''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit = () =>{
        fetch(registerURL, {
            method: 'POST',
            headers:{
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then(this.props.history.push('/'))
    }

    render() {
        return(
            <>
                <Header/>
                <div className="container mt-3">
                    <h2>Register Form</h2>
                    <div className="row g-3 mt-2">
                    <div className="col-6">
                            <label htmlFor="regname" style={{fontWeight: "bold"}}>Username</label>
                            <input type="text" className="form-control" placeholder="Username" id="regname" name="name" aria-label="Username"
                            onChange={this.handleChange}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="regphone" style={{fontWeight: "bold"}}>Phone</label>
                            <input type="text" className="form-control" placeholder="Phone" id="regphone" name="phone" aria-label="Phone" onChange={this.handleChange}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="regemail" style={{fontWeight: "bold"}}>Email</label>
                            <input type="email" className="form-control" placeholder="Email" id="regemail" name="email" aria-label="Email" onChange={this.handleChange}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="regpassword" style={{fontWeight: "bold"}}>Password</label>
                            <input type="password" className="form-control" placeholder="Password" id="regpassword" name="password" aria-label="Password" onChange={this.handleChange}/>
                        </div>
                        <button className="btn btn-success mx-auto" style={{width:'200px', color:'white'}} onClick={this.handleSubmit}>Register</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Register;