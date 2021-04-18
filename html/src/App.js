import './App.css';
import {Redirect, Route, Switch, useHistory, withRouter} from "react-router-dom";
import IndexPage from "./Components/IndexPage";
import React, {Fragment, useEffect} from "react";
import Home from "./Components/Home";
import Header2 from "./Components/Header2";
import Profile from "./Components/Profile";
import Tasks from "./Components/Tasks";
import Modules from "./Components/Modules";
import Navigation from "./Components/Navigation";
import Market from "./Components/Market";
import BuyPage from "./Components/BuyPage";
import ErrorPage from "./Components/ErrorPage";
import Forum from "./Components/Forum";

function App({customHistory}) {
    return (
        <Fragment>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
            </style>

            {window.location.pathname === "/d" &&
            <Header2/>
            }

            <Switch>
                <Route customHistory={customHistory} exact path='/index' export>
                    <IndexPage customHistory={customHistory}/>
                </Route>


                <Route customHistory={customHistory} path='/profile/:id' export>
                    <Profile customHistory={customHistory}/>
                </Route>

                <Route customHistory={customHistory} exact path='/tasks' export>
                    <Tasks/>
                </Route>

                <Route customHistory={customHistory} exact path='/modules' export>
                    <Modules/>
                </Route>

                <Route customHistory={customHistory} exact path='/market' export>
                    <Market/>
                </Route>

                <Route customHistory={customHistory} exact path='/forum' export>
                    <Forum/>
                </Route>

                <Route customHistory={customHistory} exact path='/buy' export>
                    <BuyPage/>
                </Route>

                 <Redirect from='/' to='/profile/home'/>

                {/*<Route path='/roster/:number' component={Player}/>*/}
            </Switch>
        </Fragment>
    );
}

export default withRouter(App);

function RedirectProfile() {
    const history = useHistory();
    useEffect(() => {
        history.push("/profile/")
    })
    return (
        <div/>
    )
}
