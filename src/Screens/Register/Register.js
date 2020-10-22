import React from 'react'
import { Row, Button, Col } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import './register.css'
import { emailRegex, phoneRegex } from '../../Utils/constants';
import '../Register/register.css'
import { showErrorMessage, showSuccessMessage } from '../../Utils/notification';
import { makeRequestWithBody, makeRequest } from '../../Utils/MakeRequest';
import Selector from '../../Utils/Selector';
import {
    EyeOutlined,
    EyeInvisibleOutlined,
    LoadingOutlined,
} from '@ant-design/icons';

import { GenCapcha } from '../../Utils/GeneratedCapcha';
class Regist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                password: '',
                location: '',
                username: '',
                phone: '',
                location_code: '',
                email: '',

            },
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                username: "",
                phoneCheck0: "",
                phoneCheckdigit: "",
                phone: "",
                password: "",
                confirmPassword: "",
                address: "",

            },
            isLoading: true,
            province: [],
            district: [],
            village: [],
            provinceSelected: "",
            districtSelected: "",
            villageSelected: "",
            title: {
                a: "Chọn tỉnh, thành phố",
                b: "Chọn quận, huyện",
                c: "Chọn xã, phường"
            },
            capcha_code: "",
            generated_code: "",
            capcha_invalid: "(*) Mã an toàn chưa đúng",
            capMess: 'none',
            color: "rgb(228 0 0)",
            showPass: true,
            typePass: 'password'
        }
    }

    async componentDidMount() {
        let province = await makeRequest('/location/city', "GET")
        //  console.log("province1: " + JSON.stringify(province));
        await this.setState({
            ...this.state,
            province: province.data,
            generated_code: await GenCapcha()
        })
        console.log("province1: " + JSON.stringify(this.state.generated_code));
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name + "   " + value);
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
            case "phone":
                formErrors.phoneCheck0 = (value.charAt(0) === "0") ? "" : "Số điện thoại bắt đầu bằng 0.";
                formErrors.phone = phoneRegex.test(value) ? "" : "Số điện thoại phải là chữ số.";
                formErrors.phoneCheckdigit = value.length === 10 ? "" : "Số điện thoại phải là 10 chữ số";
                break;
            default:
                break;
        }
    };

    getDistric = async (value) => {
        console.log("location: " + value)
        const district = await makeRequest('/location/district/?parent_code=' + value, "GET")
        await this.setState({
            ...this.state,
            district: district.data
        })
        console.log("distric     " + JSON.stringify(this.state.district));
    }
    getVillage = async (value) => {
        console.log("location: " + value)
        const village = await makeRequest('/location/village/?parent_code=' + value, "GET")
        await this.setState({
            ...this.state,
            village: village.data
        })
        console.log("village: " + JSON.stringify(this.state.village));
    }
    getLocation = async (value) => {
        const location = await makeRequest('/location/?code=' + value, "GET")
        await this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                location: location.data[0].path_with_type,
                location_code: location.data[0].code
            }
        })
    }

    handleChangeCapcha = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            capMess: 'none',
            [name]: value
        })
    }

    hidePass = () => {
        this.setState({
            ...this.state,
            showPass: false,
            typePass: 'text'
        })
    }
    showPass = () => {
        this.setState({
            ...this.state,
            showPass: true,
            typePass: 'password'
        })
    }
    async _onClickRegister() {
        this.setState({
            ...this.state,
            isLoading: false
        })
        if (this.state.generated_code !== this.state.capcha_code) {
            this.setState({
                ...this.state,
                capMess: 'block',
            })
            showErrorMessage("Mã an toàn chưa đúng")
        }

        if (this.state.user.firstName.length > 0 && this.state.user.lastName.length > 0 && this.state.user.password.length > 0 &&
            this.state.user.username.length > 0 && this.state.user.email.length > 0 && this.state.user.location.length > 0
            && this.state.user.phone.length > 0) {
            const res = await makeRequestWithBody("register", this.state.user, "POST")
            if (res.signal === 1) {
                console.log(JSON.stringify(this.state.user));
                showSuccessMessage("Đăng kí tài khoản thành công")
                // console.log("abc");
                this.props.history.push('/login')
            }
        } else {
            console.log(JSON.stringify(this.state.user));
            showErrorMessage("Nhập đầy đủ thông tin")
        }
    }
    render() {
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
                                        <label htmlFor="phone">Số điện thoại </label>
                                        <input
                                            value={this.state.user.phone}
                                            className={formErrors.phone ? "error" : null}
                                            placeholder={"Số điện thoại"}
                                            type="text"
                                            name="phone"
                                            noValidate
                                            onChange={this.handleChange}
                                        />
                                        {formErrors.phone.length > 0 && (
                                            <span className="errorMessage">
                                                {formErrors.phone}
                                            </span>
                                        )}
                                        {formErrors.phoneCheck0.length > 0 &&
                                            (<span className="errorMessage">
                                                {formErrors.phoneCheck0}
                                            </span>)}
                                        {formErrors.phoneCheckdigit.length > 0 &&
                                            (<span className="errorMessage">
                                                {formErrors.phoneCheckdigit}
                                            </span>)}
                                    </div>
                                </Row>
                                <div style={{ width: '100%', display: 'flex' }} className="selector-address">
                                    <div className="provice-selector" style={{ width: '150px', paddingRight: '20px' }}>
                                        <Selector data={this.state.province}
                                            title={this.state.title.a}
                                            getData={this.getDistric}
                                        ></Selector>
                                    </div>
                                    <div className="district-selector" style={{ width: '150px' }}>
                                        <Selector data={this.state.district}
                                            title={this.state.title.b}
                                            getData={this.getVillage}
                                        ></Selector>
                                    </div>
                                    <div className="village-selector" style={{ width: '150px' }}>
                                        <Selector data={this.state.village}
                                            title={this.state.title.c}
                                            getData={this.getLocation}
                                        ></Selector>
                                    </div>
                                </div>

                                <div className="address">
                                    <label htmlFor="address">Địa chỉ</label>
                                    <input
                                        value={this.state.user.location}
                                        className={formErrors.address.length > 0 ? "error" : null}
                                        placeholder="Địa chỉ"
                                        type="text"
                                        name="location"
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
                                            value={this.state.user.username}
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
                                            <input
                                                value={this.state.user.password}
                                                className={formErrors.password.length > 0 ? "error" : null}
                                                placeholder="Điền mật khẩu"
                                                type={this.state.typePass}
                                                name="password"
                                                noValidate
                                                onChange={this.handleChange}
                                            >
                                            </input>
                                            {this.state.showPass && <EyeInvisibleOutlined style={{ width: '30px', height: '30px' }}
                                                onClick={this.hidePass} />}
                                            {!this.state.showPass && <EyeOutlined style={{ width: '30px', height: '30px' }}
                                                onClick={this.showPass} />}
                                        </div>
                                        {formErrors.password.length > 0 && (
                                            <span className="errorMessage">{formErrors.password}</span>
                                        )}
                                    </div>

                                </Row>
                                <div style={{ display: "flex" }}>
                                    <label className='label-item'>Mã an toàn
                            <span>(*)</span>
                                    </label>
                                    <input className="capcha-input "
                                        name='capcha_code'
                                        type='text ' value={this.state.capcha_code}
                                        onChange={this.handleChangeCapcha} ></input>
                                    <div style={{ width: "70px", height: "30px" }}>
                                    </div>
                                    <div className="generated-capcha"> {this.state.generated_code} </div>

                                </div>
                                <div style={{
                                    textAlign: "center",
                                    color: this.state.color,
                                    fontWeight: 500,
                                    fontSize: '12px',
                                    paddingLeft: '110px',
                                    fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                                    display: this.state.capMess
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

                                    Đăng kí
                                    {!this.state.isLoading && < LoadingOutlined spin
                                        style={{ width: '30px', height: '30px' }} />}
                                </Button>
                                <Button className="act-btn">
                                    <Link className="link" to={"/login"}>Thoát</Link>
                                </Button>
                            </Col>
                            <Col className="col-lg-4 col-md-4col-sm-4 " id="btn-item"> </Col>
                        </Row>
                    </section >
                </div>
            </div >
        )
    }
}
export default withRouter(Regist)