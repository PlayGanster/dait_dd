import "@styles/pages/home/home-content.scss"
import USERS_IMG from "@assets/img/home/users.webp"
import FIRE_IMG from "@assets/img/home/fire.webp"
import MONEY_IMG from "@assets/img/home/money.webp"
import ContentClicker from "./content-clicker"
import { useEffect } from "react"

const telegram = window.Telegram.WebApp

const HomeContent = () => {

    useEffect(() => {
        telegram.BackButton.hide()
    }, [])

  return (
    <div className="home-content">
        <ul className="content__info">
            <li className="info-item">
                <img className="item__icon" src={USERS_IMG} />
                <p className="item__amount">72</p>
            </li>
            <li className="info-item">
                <img className="item__icon" src={FIRE_IMG} />
                <p className="item__amount">142</p>
            </li>
            <li className="info-item">
                <img className="item__icon" src={MONEY_IMG} />
                <p className="item__amount">189 921</p>
            </li>
        </ul>
        <ContentClicker />
    </div>
  )
}

export default HomeContent
