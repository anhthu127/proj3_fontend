
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../Screens/Login/Login';
import Register from '../Screens/Register/Register';
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
                    <div>
                        <Switch>

                            <Route exact path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>

        )
    }
}

