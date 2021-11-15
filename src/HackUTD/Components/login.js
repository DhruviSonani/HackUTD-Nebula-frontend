import React, { Component } from "react";
import axios from 'axios';
import { base_url } from './common'
import '../CSS/custom.css'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user_id: '',
            password: ''
        }
    }


    LoginHandler = () => {
        const values = {
            user_id: parseInt(this.state.user_id),
            password: this.state.password
        }

        console.log(values)

        axios.post(base_url + '/chat/userAuth', values).then(resp => {
            console.log(resp);
            if (resp.data.status.includes(200)) {
                localStorage.setItem("user_data", JSON.stringify(resp.data))
                // window.location.href = "http://localhost:8501/";
                window.open("http://localhost:8501/", "_self")
            }
            else {
                alert("invalid cred entered!")
            }
        }).catch(err => {
            console.log(err);
        })
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    handleUserIDChange = (e) => {
        this.setState({ user_id: e.target.value })
    }

    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                this.LoginHandler()
            }}>

                <h3>Sign In to CourseOpt</h3>

                <div className="form-group">
                    <label>User id</label>
                    <input type="number" name="user_id" className="form-control" placeholder="Enter User id" value={this.state.user_id} onChange={this.handleUserIDChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handlePasswordChange} />
                </div>

                <div className="submit_button">
                    <button className="btn btn-primary btn-block" >Submit</button>
                </div>
            </form>
        );
    }
}

export default Login