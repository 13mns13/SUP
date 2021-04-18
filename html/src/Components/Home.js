import '../styles/home.css'

import {Fragment, useState} from 'react';
import * as React from "react";
import Header2 from "./Header2";

function cardStyles() {
    let styles = ``
    return (styles)
}

export default function Home({customHistory}) {
    return (
        <div className="home_main_cont">
            <Header2 customHistory={customHistory}/>
            <section className="home_block1">
                <h4 className="h4_title home_mt5">Привет, Иван, давай учиться вместе! 🎓</h4>
                <h1 className="h1_title home_mt5">Регистрация прошла успешно, теперь тебе стал доступен личный кабинет
                    выбери свои интересы и увлечения и мы посоветуем тебе курсы.</h1>

                <div className="home_block1_buttons">
                    <button className="home_btn_yellow reg_form_submit">
                        Перейти в личный кабинет
                    </button>

                    <button className="home_btn_light_yellow reg_form_submit">
                        Перейти на главную
                    </button>
                </div>
            </section>

            <section className="home_block2">
                <h3 className="h3_title home_mt5">Небольшая подборка курсов📘</h3>

                <div className="home_block1_cards home_mt5">
                    <div className="home_block1_card java">
                        <div className="h2_title">Программирование на Java</div>
                        <h1 className="h1_title home_mt5">Получите одну из самых востребованных IT технологий. Вы
                            освоите Java,
                            научитесь писать программы и узучите ООП. Реализуете 6 проектов для портфолио
                        </h1>

                        <button className="home_btn_yellow reg_form_submit">
                            Перейти на страничку занятия
                        </button>
                    </div>

                    <div className="home_block1_card android">
                        <div className="h2_title">Разработка под Android</div>
                        <h1 className="h1_title home_mt5">Научитесь разрабатывать приложения, используя язык
                            программирования Java.
                            Получите практический опыт и реализуете 4 собственных проекта для портфолио.
                        </h1>

                        <button className="home_btn_yellow reg_form_submit">
                            Перейти на страничку занятия
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}