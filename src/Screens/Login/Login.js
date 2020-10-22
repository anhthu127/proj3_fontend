import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { makeRequestWithBody } from '../../Utils/MakeRequest';
import { showErrorMessage } from '../../Utils/notification';
import './login.css'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
            isLoading: false,
            isLogin: null,
            url: "#",
            account: {
                username: "",
                password: "",
            },
            isPressedLogin: false,
            validForm: {
                validUsername: '',
                validPassword: '',
            }
        }
    }
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name + "   " + value);
        this.setState({
            ...this.state,
            account: {
                ...this.state.account,
                [name]: value,
            }
        })
        let formErrors = this.state.validForm;
        switch (name) {
            case "password":
                formErrors.validPassword =
                    value.length < 6 ? " (*) Mật khẩu không hợp lệ" : "";
                break;
            case "username":
                formErrors.validUsername =
                    value.length < 6 ? " (*) Tên đăng nhập không hợp lệ" : "";
                break;
            default:
                break;
        }
    }
    async submitLogin() {
        const response = await makeRequestWithBody('/login', this.state.account, "POST")
        console.log(JSON.stringify(response));
        if (response.signal === 0) {
            showErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng")
        } else {
            localStorage.setItem('token', response.data)
            console.log(localStorage.getItem('token'));
            localStorage.setItem('username', this.state.account.username)
            this.props.history.push('/' + this.state.account.username)
        }
    }
    render() {
        return (
            <div className="login-component" >
                <div className="wrap-header-login">
                    {/* <Header /> */}
                </div>
                <div className="login-component">
                    <div className="wrap-login">
                        <div className=" title">
                            <p>Đăng nhập</p>
                        </div>
                        <div style={{
                            width: "60%",
                            height: "1px",
                            background: "#70a1ff",

                        }}></div>
                        <div style={{
                            width: "100 %",
                            height: "15px"
                        }}></div>
                        <div className="box">
                            <div className="input-group">
                                <label className="login-label" htmlfor="username">Tên đăng nhập</label>
                                <input
                                    value={this.state.account.username}
                                    type="text"
                                    name="username"
                                    className={this.state.validForm.validUsername.length > 0 ? "error" : "login-input"}
                                    placeholder="Tên đăng nhập"
                                    onChange={this.handleChange} />
                                {this.state.validForm.validUsername.length > 0 && (
                                    <span className="errorMessage">{this.state.validForm.validUsername}</span>
                                )}
                            </div>

                            <div className="input-group">
                                <label className="login-label" htmlfor="password">Mật khẩu</label>
                                <input
                                    value={this.state.account.password} type="password" name="password"
                                    className={this.state.validForm.validPassword.length > 0 ? "error" : "login-input"}
                                    placeholder="Mật khẩu"
                                    onChange={this.handleChange} />
                                {this.state.validForm.validPassword.length > 0 && (
                                    <span className="errorMessage">{this.state.validForm.validPassword}</span>
                                )}
                            </div>

                            <Button
                                type="button"
                                className="login-btn"
                                onClick={() =>
                                    this.submitLogin(this.state.account)}
                            >
                                Đăng nhập
                            </Button>

                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", height: "30px" }}></div>
            </div >
        )
    }
}

export default withRouter(Login)