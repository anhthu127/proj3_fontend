
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../Screens/Components/Header';
import Home from '../Screens/Home.js/Home';
import Login from '../Screens/Login/Login';
import Register from '../Screens/Register/Register';
import SimpleSlider from '../Screens/test';
export default class Router extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="content">
                <BrowserRouter >
                    {/* <Header /> */}
                    <div>
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/test" component={SimpleSlider} />
                            <Route path={"/"}
                                component={Home} />
                        </Switch>
                        {/*                      
                    <Switch>
                        <Route path={"/" + localStorage.getItem('username')}
                                component={Home} />
                        <Route path={"/"}
                            component={Home} />
                    </Switch> */}

                    </div>
                </BrowserRouter>
            </div >

        )
    }
}

