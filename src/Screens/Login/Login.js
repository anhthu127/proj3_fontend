import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css'
export default class Login extends Component {
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
                                <label className="login-label" htmlFor="username">Tên đăng nhập</label>
                                <input
                                    value={this.state.account.username}
                                    type="text"
                                    name="username"
                                    className="login-input"
                                    placeholder="Tên đăng nhập"
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            account: {
                                                ...this.state.account,
                                                username: e.target.value
                                            }
                                        });
                                    }} />
                            </div>

                            <div className="input-group">
                                <label className="login-label" htmlFor="password">Mật khẩu</label>
                                <input
                                    value={this.state.account.password} type="password" name="password"
                                    className="login-input"
                                    placeholder="Mật khẩu"
                                    onChange={e => {
                                        this.setState({
                                            ...this.state,
                                            account: {
                                                ...this.state.account,
                                                password: e.target.value
                                            }
                                        });
                                    }} />
                            </div>

                            <Button
                                type="button"
                                className="login-btn"
                            // onClick={() =>
                            //  this.submitLogin(this.state.account)}
                            >
                                <Link to={this.state.url} >Đăng nhập</Link>
                            </Button>

                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", height: "30px" }}></div>

            </div >
        )
    }
}

