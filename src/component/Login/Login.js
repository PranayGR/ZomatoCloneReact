import React,{Component} from 'react';
import Header from '../Header';

const loginURL = "https://zomato-login-reg-api.herokuapp.com/api/auth/login";
const userURL = "https://zomato-login-reg-api.herokuapp.com/api/auth/userInfo";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state= {
           email:'@gmail.com' ,
           password:'',
           message:''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    handleSubmit = () =>{
        fetch(loginURL, {
            method: 'POST',
            headers:{
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.auth === false) {
                this.setState({message: data.token});
            } else {
                sessionStorage.setItem('ltk', data.token);
                sessionStorage.setItem('loginStatus','loggedIn');
                fetch(userURL, {method: 'GET'})
                if(sessionStorage.getItem('menu')){
                    this.props.history.push(`/placeOrder/${sessionStorage.getItem('restName')}`)
                } else{
                    this.props.history.push('/');
                }
            }
        })
    }

    render() {
        return(
            <>
                <Header/>
                <div className="container mt-3">
                    <h2>Login Form</h2>
                    <h3 style={{color:'red'}}>{this.state.message}</h3>
                    <div className="row g-3 mt-2">
                        <div className="col-6">
                            <label htmlFor="loginemail" style={{fontWeight: "bold"}}>Email</label>
                            <input type="email" className="form-control" placeholder="Email" id="loginemail"name="email" aria-label="Email" onChange={this.handleChange} value={this.state.email}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="loginpassword" style={{fontWeight: "bold"}}>Password</label>
                            <input type="password" className="form-control" placeholder="Password" name="password" id="loginpassword" aria-label="Password" onChange={this.handleChange}/>
                        </div>
                        <button className="btn btn-info mx-auto" style={{width:'200px', color:'white'}} onClick={this.handleSubmit}>Login</button>
                        
                    </div>
                    <a className="btn btn-success" href="https://github.com/login/oauth/authorize?client_id=930f92e500db2f4d357c" style={{width:'200px', color:'white'}}>Login With Github</a>
                </div>
            </>
        )
    }
}

export default Login;