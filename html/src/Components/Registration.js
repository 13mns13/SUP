import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import '../styles/registration.css'

import {Fragment, useState} from 'react';
import * as React from "react";
import Header2 from "./Header2";
import FetchData from "./FetchData";
import {useHistory} from "react-router-dom";

export default function Registration({customHistory}) {
    const fetchData = new FetchData()
    const [isRegistered, setIsRegistered] = useState(true)
    const buttonHandler = () => {
        setIsRegistered(current => !current)
    }

    const history = useHistory();
    const navigateToHome = () => history.push('/home');

    const [state, setState] = React.useState({
        checkedBoy: true,
        checkedStudent: true,
        last_name: "",
        first_name: "",
        email: "",
        password1: "",
        password2: "",
        date: 0,
    });

    const register = () => {
        let data = {
            last_name: state.last_name,
            first_name: state.first_name,
            email: state.email,
            password1: state.password1,
            password2: state.password2,
            birthday: state.date,
            sex: state.checkedBoy,
            teacher: !state.checkedStudent
        }
        fetchData.reg(data).then(e => {
            console.log(e)
            if (e.success) {
                localStorage.setItem("token", e.token)

            }
        })
    }

    const login = () => {
        let data = {
            email: state.email,
            password: state.password1,
        }
        fetchData.login(data).then(e => {
            console.log(e)
            if (e.success) {
                localStorage.setItem("token", e.token)
                navigateToHome()

            }
        })
    }

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value});

    };

    const changeDate = (event) => {
        setState({...state, [event.target.name]: event.target.valueAsNumber / 1000})
    }
    return (
        <div className="reg_main_container">
            <div className="reg_welcome">
                <div className="reg_welcome_title">
                    ???? ?????????? ????????????????????!
                </div>

                <div className="reg_welcome_subtitle">
                    ?????????? ???????????? ???????????????? ????????????????, ?????????????????????? ?????? ?????????????????????????????????? ???? ?????????? ?????????????????????????????? ??????????????????
                </div>

                <div className="reg_welcome_learning">
                    <div className="reg_welcome_learning_title">
                        ???? ?????? ?????????????? ???? ?????????? ???????????????????
                    </div>

                    <div className="reg_welcome_learning_btns">
                        <button className={`reg_btn ${!isRegistered && "reg_active"}`} onClick={buttonHandler}>
                            ??????
                        </button>

                        <button className={`reg_btn ${isRegistered && "reg_active"}`} onClick={buttonHandler}>
                            ????
                        </button>
                    </div>

                    <div className="reg_welcome_learning_title">
                        {isRegistered ?
                            "?? ????????????????????????!"
                            :
                            "????, ???? ?? ?????? ??????????????, ???????????????? ??????????????????????!"}
                    </div>
                </div>
            </div>


            <div className="reg_form">
                {isRegistered ?
                    <Fragment>
                        <input type="email" className="reg_form_input" placeholder="??????????" name="email"
                               onChange={handleChange}/>
                        <input type="password" className="reg_form_input" placeholder="????????????" name="password1"
                               onChange={handleChange}/>
                    </Fragment>
                    :
                    <Fragment>
                        <input type="text" className="reg_form_input" name="first_name" placeholder="??????"
                               onChange={handleChange}/>
                        <input type="text" className="reg_form_input" name="last_name" placeholder="??????????????"
                               onChange={handleChange}/>
                        <input type="email" className="reg_form_input" placeholder="??????????" name="email"
                               onChange={handleChange}/>
                        <input type="date" className="reg_form_input" placeholder="???????? ????????????????" name="date"
                               onChange={changeDate}/>
                        <input type="password" className="reg_form_input" placeholder="????????????" name="password1"
                               onChange={handleChange}/>
                        <input type="password" className="reg_form_input" placeholder="???????????? ????????????" name="password2"
                               onChange={handleChange}/>
                        <div className="reg_form_block">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedBoy}
                                        onChange={() => {
                                            state.checkedBoy = true;
                                            setState({...state})
                                        }
                                        }
                                        name="checkedBoy"
                                        color="primary"
                                    />
                                }
                                label="?? ??????????????"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!state.checkedBoy}
                                        onChange={() => {
                                            state.checkedBoy = false;
                                            setState({...state})
                                        }
                                        }
                                        name="checkedBoy"
                                        color="primary"
                                    />
                                }
                                label="?? ??????????????"
                            />
                        </div>

                        <div className="reg_form_block">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.checkedStudent}
                                        onChange={() => {
                                            state.checkedStudent = true;
                                            setState({...state})
                                        }
                                        }
                                        name="checkedBoy"
                                        color="primary"
                                    />
                                }
                                label="?? ????????????"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!state.checkedStudent}
                                        onChange={() => {
                                            state.checkedStudent = false;
                                            setState({...state})
                                        }
                                        }
                                        name="checkedBoy"
                                        color="primary"
                                    />
                                }
                                label="?? ??????????????????????????"
                            />
                        </div>
                    </Fragment>
                }

                {isRegistered ?
                    <button className="reg_form_submit" onClick={() => login()}>
                        ??????????
                    </button>
                    :
                    <button className="reg_form_submit" onClick={() => register()}>
                        ????????????????????????????????????
                    </button>
                }

            </div>
        </div>
    )

}