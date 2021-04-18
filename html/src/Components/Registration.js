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
                    👋 Добро пожаловать!
                </div>

                <div className="reg_welcome_subtitle">
                    Чтобы начать обучение пройдите, авторизацию или зарегестрируйтесь на нашей образовательной платформе
                </div>

                <div className="reg_welcome_learning">
                    <div className="reg_welcome_learning_title">
                        Вы уже учитесь на нашей платформе?
                    </div>

                    <div className="reg_welcome_learning_btns">
                        <button className={`reg_btn ${!isRegistered && "reg_active"}`} onClick={buttonHandler}>
                            Нет
                        </button>

                        <button className={`reg_btn ${isRegistered && "reg_active"}`} onClick={buttonHandler}>
                            Да
                        </button>
                    </div>

                    <div className="reg_welcome_learning_title">
                        {isRegistered ?
                            "С возвращением!"
                            :
                            "Оу, вы у нас впервые, пройдите регистрацию!"}
                    </div>
                </div>
            </div>


            <div className="reg_form">
                {isRegistered ?
                    <Fragment>
                        <input type="email" className="reg_form_input" placeholder="Почта" name="email"
                               onChange={handleChange}/>
                        <input type="password" className="reg_form_input" placeholder="Пароль" name="password1"
                               onChange={handleChange}/>
                    </Fragment>
                    :
                    <Fragment>
                        <input type="text" className="reg_form_input" name="first_name" placeholder="Имя"
                               onChange={handleChange}/>
                        <input type="text" className="reg_form_input" name="last_name" placeholder="Фамилия"
                               onChange={handleChange}/>
                        <input type="email" className="reg_form_input" placeholder="Почта" name="email"
                               onChange={handleChange}/>
                        <input type="date" className="reg_form_input" placeholder="Дата рождения" name="date"
                               onChange={changeDate}/>
                        <input type="password" className="reg_form_input" placeholder="Пароль" name="password1"
                               onChange={handleChange}/>
                        <input type="password" className="reg_form_input" placeholder="Повтор пароля" name="password2"
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
                                label="Я мальчик"
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
                                label="Я девочка"
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
                                label="Я ученик"
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
                                label="Я преподаватель"
                            />
                        </div>
                    </Fragment>
                }

                {isRegistered ?
                    <button className="reg_form_submit" onClick={() => login()}>
                        Войти
                    </button>
                    :
                    <button className="reg_form_submit" onClick={() => register()}>
                        Зарегистрироваться
                    </button>
                }

            </div>
        </div>
    )

}