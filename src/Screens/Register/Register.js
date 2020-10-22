import React from 'react'
import { Row, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './register.css'
import { emailRegex, phoneRegex } from '../../Utils/constants';
import '../Register/register.css'
export default class Regist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                password: '',
                location: '',
                city: '',
                district: '',
                email: '',

            },
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                phoneNumberCheck0: "",
                phoneNumberCheckdigit: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                address: "",

            },
        }
    }

    handleChange = e => {
        e.preventDefault();

        const { name, value } = e.target;
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value,
            }
        })
        let formErrors = this.state.formErrors;
        switch (name) {
            case "firstName":
                if ((formErrors.firstName = value.length) < 3) {
                    formErrors.firstName = "Tối thiểu 3 kí tự"
                } else { formErrors.firstName = "" }
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "Tối thiểu 3 kí tự" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "Địa chỉ Email không hợp lệ";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Mật khẩu tối thiểu 6 kí tự" : "";
                break;
            case "username":
                formErrors.username =
                    value.length < 6 ? "Tên đăng nhập tối thiểu 6 kí tự" : "";
                break;
            case "phoneNumber":
                formErrors.phoneNumberCheck0 = (value.charAt(0) === "0") ? "" : "Số điện thoại bắt đầu bằng 0.";
                formErrors.phoneNumber = phoneRegex.test(value) ? "" : "Số điện thoại phải là chữ số.";
                formErrors.phoneNumberCheckdigit = value.length === 10 ? "" : "Số điện thoại phải là 10 chữ số";
                break;
            default:
                break;
        }
    };
    render() {
        // let count = 0;
        const { formErrors } = this.state

        return (
            <div className="wrap-page-register" >
                <div className='wrap-content'>
                    <section>
                        <div className='title'>
                            <h5> Đăng kí tài khoản</h5>
                        </div>
                        <div className='customer-form'>
                            <div id="custom-form"
                                className=" col-lg-9 col-md-9 col-sm-12 col-xs-12 col-lg-offset-3 col-md-offset-3 nopadding-xs" >
                                <h5>Điền thông tin cá nhân</h5>
                                <Row style={{ margin: "0px" }}>
                                    <div className="firstName">
                                        <label htmlFor="firstName">Tên</label>
                                        <input
                                            value={this.state.user.firstName}
                                            className={formErrors.firstName.length > 0 ? "error" : null}
                                            placeholder="Điền tên"
                                            type="text"
                                            name="firstName"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.firstName.length > 0 && (
                                            <span className="errorMessage">{formErrors.firstName}</span>
                                        )}
                                    </div>
                                    <div className="lastName">
                                        <label htmlFor="lastName">Họ</label>
                                        <input
                                            value={this.state.user.lastName}
                                            className={formErrors.lastName.length > 0 ? "error" : null}
                                            placeholder="Điền họ"
                                            type="text"
                                            name="lastName"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.lastName.length > 0 && (
                                            <span className="errorMessage">{formErrors.lastName}</span>
                                        )}
                                    </div>
                                </Row>

                                <Row style={{ margin: "0px" }}>
                                    <div className="email">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            value={this.state.user.email}
                                            className={formErrors.email.length > 0 ? "error" : null}
                                            placeholder="Điền địa chỉ Email"
                                            type="email"
                                            name="email"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.email.length > 0 && (
                                            <span className="errorMessage">{formErrors.email}</span>
                                        )}
                                    </div>
                                    <div className="phoneNumber">
                                        <label htmlFor="phoneNumber">Số điện thoại </label>
                                        <input
                                            // value={this.state.user.phoneNumber}
                                            className={formErrors.phoneNumber ? "error" : null}
                                            placeholder={"Số điện thoại"}
                                            type="text"
                                            name="phoneNumber"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.phoneNumber.length > 0 && (
                                            <span className="errorMessage">{formErrors.phoneNumber}
                                                <br />
                                                {formErrors.phoneNumberCheck0}
                                                <br />
                                                {formErrors.phoneNumberCheckdigit}
                                            </span>
                                        )}
                                    </div>
                                </Row>
                                <div className="address">
                                    <label htmlFor="address">Địa chỉ</label>
                                    <input
                                        // value={this.state.user.address}
                                        className={formErrors.address.length > 0 ? "error" : null}
                                        placeholder="Địa chỉ"
                                        type="text"
                                        name="address"
                                        noValidate
                                        onChange={this.handleChange}
                                    />
                                    {formErrors.address.length > 0 && (
                                        <span className="errorMessage">{formErrors.address}</span>
                                    )}
                                </div>
                                <Row style={{ margin: "0px" }}>
                                    <div className="username">
                                        <label htmlFor="username">Tên đăng nhập</label>
                                        <input
                                            // value={this.state.user.username}
                                            className={formErrors.username.length > 0 ? "error" : null}
                                            placeholder="Điền lại mật khẩu"
                                            type="type"
                                            name="username"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.username.length > 0 && (
                                            <span className="errorMessage">{formErrors.username}</span>
                                        )}
                                    </div>

                                    <div className="password">
                                        <label htmlFor="password">Mật khẩu</label>
                                        <div>
                                            <input // value={this.state.user.password}
                                                icon={{ name: 'eye', }}
                                                className={formErrors.password.length > 0 ? "error" : null}
                                                placeholder="Điền mật khẩu"
                                                type={this.state.isHidden}
                                                name="password"
                                                noValidate
                                                onChange={this.handleChange}
                                            >
                                            </input>
                                            {/* <Icon
                                            id="password-unhidden" className="fa fa-eye password-icon"
                                        onClick={() => {
                                            console.log("onclick: " + count)
                                            count = count + 1;
                                            if (this.state.count % 2 === 0) {
                                                this.setState({
                                                    ...this.state,
                                                    isHidden: "type"
                                                });
                                            }
                                        }}
                                        /> */}
                                        </div>
                                        {formErrors.password.length > 0 && (
                                            <span className="errorMessage">{formErrors.password}</span>
                                        )}
                                    </div>

                                </Row>
                                <div style={{ display: "block" }}>
                                    <label className='label-item'>Mã an toàn
                            <span>(*)</span>
                                    </label>
                                    <input className="capcha-input " type='text ' value={this.state.capcha_code}
                                        onChange={e => {
                                            this.setState({
                                                ...this.state,
                                                capcha_code: e.target.value
                                            })
                                            console.log('onchange: ' + e.target.value + '   ' + this.state.capcha_code)

                                        }} ></input>
                                    <div style={{ width: "100px", height: "30px", display: "inline-block" }}>
                                    </div>
                                    <label className="generated-capcha"> {this.state.genera_code} </label>
                                </div>
                                <div style={{
                                    textAlign: "center",
                                    color: this.state.color,
                                    display: this.state.display
                                }}> {this.state.capcha_invalid}
                                </div>
                            </div>
                        </div >
                        <Row className="wrap-action-btn">
                            <Col className="col-lg-3 col-md-3 col-sm-4" id="btn-item"> </Col>
                            <Col className="col-lg-6 col-md-6 col-sm-6" id="btn-item">
                                <Button className="act-btn" onClick={() => {
                                    this._onClickRegister(formErrors)
                                }}>
                                    {this.state.isLoading && <i style={{ paddingRight: '5px' }} className="fa fa-refresh fa-spin" > </i>}
                             Đăng kí

                        {!this.state.isLoading && <Link className="link" exact from="/register" to={this.state.url} >

                                    </Link>}
                                </Button>
                                <Button className="act-btn">
                                    <Link className="link" to={"/"}>Thoát</Link>
                                </Button>
                            </Col>
                            <Col className="col-lg-4 col-md-4col-sm-4 " id="btn-item"> </Col>
                        </Row>
                    </section >
                </div>
            </div>
        )
    }
}