import '../styles/header.css'
import Logo from "./Logo";

export default function Header() {
    return (
        <div className="header">
            <Logo/>

            <div className="header_nav">
                <div className="header_element">
                    Главная
                </div>

                <div className="header_element">
                    Описание
                </div>

                <div className="header_element">
                    Компания
                </div>
            </div>


            <div className="header_buttons">
                <button className="header_btn header_gray">
                    Войти
                </button>

                <button className="header_btn header_yellow">
                    Зарегистрироваться
                </button>
            </div>
        </div>
    )
}