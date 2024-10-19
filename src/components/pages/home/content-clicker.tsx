import "@styles/pages/home/content-clicker.scss"
import { BsFillPersonVcardFill } from "react-icons/bs"
import { PiSneakerFill } from "react-icons/pi"
import { TbFaceId } from "react-icons/tb"
import AVATAR_IMG from "@assets/img/home/person-test.webp"
import { useNavigate } from "react-router-dom"
import { FaShirt } from "react-icons/fa6"
import { GiTrousers } from "react-icons/gi"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { setBalance, setFarmOnline } from "@/redux/features/userSlice"
import { useEffect, useState } from "react"
import axios from "axios"
import { idUserTelegram, url_api } from "@/data/site/site-data"

const ContentClicker = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user)
    const [farmOnline, setFarmOnlines] = useState(false)
    const [money, setMoney] = useState(0)

    function startFarm() {
        const startFarmTime = Number(localStorage.getItem("startFarmTime"));
        const endFarmTime = Number(localStorage.getItem("endFarmTime"));
        if(!Number.isNaN(startFarmTime) && startFarmTime === 0 && !Number.isNaN(endFarmTime) && endFarmTime === 0 && user.farmOnline !== true) {
            dispatch(setFarmOnline({data: {farmOnline: true}}));
            const timeNow = Math.floor(Date.now() / 1000);
            const timeSevenHour = timeNow + 7 * 60 * 60;
            localStorage.setItem("startFarmTime", String(timeNow));
            localStorage.setItem("endFarmTime", String(timeSevenHour));
        }
    }

    useEffect(() => {
        setFarmOnlines(user.farmOnline)
    }, [user.farmOnline])

    useEffect(() => {
        const startFarmTime = Number(localStorage.getItem("startFarmTime"))
        const timeNow = Math.floor(Date.now() / 1000);
        const timeFarming = timeNow - startFarmTime;
        const moneys = Math.round(timeFarming / 60);
        setMoney(moneys)
    }, [])

    function timerFarmMoney() {
        const startFarmTime = Number(localStorage.getItem("startFarmTime"));
        const endFarmTime = Number(localStorage.getItem("endFarmTime"));
        const timeNow = Math.floor(Date.now() / 1000);
        if(timeNow < endFarmTime) {
            setTimeout(() => {
                const timeNow = Math.floor(Date.now() / 1000);
                const timeFarming = timeNow - startFarmTime;
                const money = Math.round(timeFarming / 60);
                setMoney(money)
                timerFarmMoney()
            }, 1000);
        }else {
            dispatch(setFarmOnline({data: {farmOnline: false}}))
            dispatch(setFarmOnline({data: {farmOnline: true}}))
        }
    }

    function claimMoney() {
        const balance = Number(user.balance)
        const money = Number(420)
        const newBalance = balance + money;
        axios.post(`${url_api}user/changeBalance`, {id_telegram: idUserTelegram, balance: newBalance}).then((response:any) => {
            if(response.data === true){
                dispatch(setBalance({data: {balance: newBalance}}))
                localStorage.setItem("startFarmTime", String(0))
                localStorage.setItem("endFarmTime", String(0))
                dispatch(setFarmOnline({data: {farmOnline: false}}))
            }
        })
    }

    function renderFarmButton(online:any) {
        if(online === false){
            return (
                <div className="button__start" onClick={() => startFarm()}>
                    Начать фарминг
                </div>
            )
        }else {
            const endFarmTime = Number(localStorage.getItem("endFarmTime"));
            // const startFarmTime = Number(localStorage.getItem("startFarmTime"))
            const timeNow = Math.floor(Date.now() / 1000);
            if(endFarmTime < timeNow) {
                return (
                    <div className="button__claim">
                        <p className="claim__name" onClick={() => claimMoney()}>Собрать урожай</p>
                    </div>
                )
            }else {
                timerFarmMoney()
                return (
                    <div className="button__farming">
                        <p className="farming__name">Фарминг</p>
                        <p className="farming__amount">{money} / 420</p>
                    </div>
                )
            }
        }
    }

  return (
    <div className="content__clicker--wrapper">
        <div className="content__clicker--content">
            <ul className="clicker__navigation">
                <li className="navigation-item" onClick={() => navigate("/profile")}><BsFillPersonVcardFill className="item__icon" /></li>
                <li className="navigation-item" onClick={() => navigate("/animations")}><TbFaceId className="item__icon" /></li>
                <li className="navigation-item" onClick={() => navigate("/clothes?filter=outerwear")}><FaShirt className="item__icon" /></li>
                <li className="navigation-item" onClick={() => navigate("/clothes?filter=trousers")}><GiTrousers className="item__icon" /></li>
                <li className="navigation-item" onClick={() => navigate("/clothes?filter=sneakers")}><PiSneakerFill className="item__icon" /></li>
            </ul>
            <div className="clicker__person">
                <img className="person__img" src={AVATAR_IMG} />
                <img className="person__img--clone" src={AVATAR_IMG} />
            </div>
            <div className="clicker__farm--popup">
                {
                    renderFarmButton(farmOnline)
                }
            </div>
        </div>
    </div>
  )
}

export default ContentClicker
