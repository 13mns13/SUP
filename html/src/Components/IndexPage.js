import banner1 from '../img/banner1.png'

import '../styles/index.css'

import curve from "../img/curve.svg";
import smile1 from '../img/smile1.png'
import smile2 from '../img/smile2.png'
import Chapter from "./Chapter"
import React from "react"
import Chapter2 from "./Chapter2"
import icon1 from "../img/icon1.png"
import icon2 from "../img/icon2.png"
import icon3 from "../img/icon3.png"
import icon4 from "../img/icon4.png"
import Header2 from "./Header2";

export default function IndexPage({customHistory}) {
    return (
        <div className="index_main_container">
            <div className="index_page">
                <div className="index_block1">

                    <div className="index_block1_left">
                        <div className="index_block1_left_tag">
                            Образование
                        </div>

                        <div className="index_block1_left_title">
                            <span className="index_yellow">Perspective</span> -
                            <span className="index_black">samsung it school</span>
                        </div>

                        <div className="index_block1_left_subtitle index_gray">
                            Samsung Skills Up School - иновационная форма обучения, позволяющая играть и запоминать
                            больше, нежели зубрить
                        </div>

                        <div className="index_block1_left_details">
                            <button className="index_block1_left_details_button index_white">
                                Подробнее
                            </button>
                        </div>

                    </div>

                    <div className="index_block1_right">

                    </div>

                </div>

                <div className="index_block2">


                    <div className="index_block2_top">
                        <div className="index_block2_top_left">
                            <div className="index_block1_left_tag">
                                Описание
                            </div>
                            <div className="index_block2_top_left_title">
                                О нашей образовательной платформе
                            </div>
                        </div>

                        <div className="index_block2_top_right">
                            <div className="index_block2_top_right_text">
                                Наши эксперты составили уникальную систему обучения благодаря которой ученик
                                осваивает материал в разы быстрее и эфективнее, решая повседневные проблеммы и улучшая
                                жизнь в целом. Развитие дистанционного формата обучения и игрового процесса вовликает и
                                мотивирует ученика становьтся на шаг лучше
                                и становиться конкурентно способным специалистом на рынке.
                            </div>
                        </div>
                    </div>

                    <div className="index_block2_middle">
                        <Chapter/>
                    </div>


                    <div className="index_block2_bottom">

                        <div className="index_block2_bottom_left">
                            <img src={smile1} className="index_block2_bottom_img_left"/>
                        </div>

                        <div className="index_block2_bottom_right">
                            <img src={smile2} className="index_block2_bottom_img_right"/>
                        </div>

                    </div>
                </div>

                <div className="index_block3">
                    <div className="index_block3_top">
                        <Chapter2/>
                    </div>

                    <div className="index_block3_content">
                        {/*<img src={curve} className="index_block3_content_curve"/>*/}

                        <div className="index_block3_content_card">
                            <div className="index_block3_content_card_icon">
                                <img src={icon1}/>
                            </div>

                            <div className="index_block3_content_card_title">
                                Стоимость
                            </div>

                            <div className="index_block3_content_card_subtitle">
                                Система превращает рутинные задачи в увлекательную игру с системой поощрений
                            </div>
                        </div>

                        <div className="index_block3_content_card">
                            <div className="index_block3_content_card_icon">
                                <img src={icon2}/>
                            </div>

                            <div className="index_block3_content_card_title">
                                Эффективность
                            </div>

                            <div className="index_block3_content_card_subtitle">
                                Система превращает рутинные задачи в увлекательную игру с системой поощрений
                            </div>
                        </div>

                        <div className="index_block3_content_card">
                            <div className="index_block3_content_card_icon">
                                <img src={icon3}/>
                            </div>

                            <div className="index_block3_content_card_title">
                                Незнаю
                            </div>

                            <div className="index_block3_content_card_subtitle">
                                Система превращает рутинные задачи в увлекательную игру с системой поощрений
                            </div>
                        </div>

                        <div className="index_block3_content_card">
                            <div className="index_block3_content_card_icon">
                                <img src={icon4}/>
                            </div>

                            <div className="index_block3_content_card_title">
                                Интересно
                            </div>

                            <div className="index_block3_content_card_subtitle">
                                Система превращает рутинные задачи в увлекательную игру с системой поощрений
                            </div>
                        </div>

                    </div>
                </div>

                <div className="index_block4">
                    <div className="index_block3_left">
                        <div className="index_block1_left_title">
                            <span className="index_black">Начните учиться -</span>
                            <span className="index_yellow">вместе с нами!</span>

                        </div>

                    </div>

                    <div className="index_block3_right">

                    </div>
                </div>

            </div>
        </div>
    )
}