import { RouterList } from "@/data/router/router-data"
import { RouterType } from "@/types/types"
import { Suspense, useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import LoaderDefault from "../loader-default/loader-default"
import axios from "axios"
import { url_api } from "@/data/site/site-data"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { setBalance, setDataUser, setFarmOnline, setSettings } from "@/redux/features/userSlice"

const telegram = window.Telegram.WebApp

const Router = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingDataUser, setLoadingDataUser] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user)
    const id = telegram.initDataUnsafe.user?.id

    const handleLoading = () => { setIsLoading(false); }

    useEffect(() => {
        axios.post(`${url_api}user/login`, {id_telegram: id, refid: 2}).then((response:any) => {
            if(response.data.code === "200"){
                dispatch(
                    setDataUser({
                        data: {
                            name: response.data.user[0].name,
                            surname: response.data.user[0].surname,
                            img: response.data.user[0].img,
                            balance: Number(response.data.user[0].balance),
                            profile_ready: Number(response.data.user[0].profile_ready)
                        }
                    })
                )
                dispatch(
                    setSettings({
                        data: {
                            language: response.data.user[0].language,
                            graphics: response.data.user[0].graphics,
                            theme: response.data.user[0].theme,
                            sound: response.data.user[0].sound
                        }
                    })
                )
                setLoadingDataUser(true)
                if(Number(response.data.user[0].profile_ready) === 0) navigate("/profile")
            }
        })
    }, [])

    function startTimerThisTimeFarm() {
        if(loadingDataUser === false) return;
        const endFarmTime = Number(localStorage.getItem("endFarmTime"));
        const timeNow = Math.floor(Date.now() / 1000);
        if(!Number.isNaN(endFarmTime) && endFarmTime !== 0) {
            if(endFarmTime > timeNow) {
                const timeNow = Math.floor(Date.now() / 1000);
                localStorage.setItem("thisFarmTime", String(timeNow))
                setTimeout(() => {
                    startTimerThisTimeFarm()
                }, 15000);
            }else {
                dispatch(setFarmOnline({data: {farmOnline: false}}))
                localStorage.setItem("endFarmTime", String(0));
                localStorage.setItem("startFarmTime", String(0));
            }
        }
    }

    function startTimerFarm() {
        if(loadingDataUser === false) return;
        const endFarmTime = Number(localStorage.getItem("endFarmTime"));
        const timeNow = Math.floor(Date.now() / 1000);
        if(!Number.isNaN(endFarmTime) && endFarmTime !== 0) {
            if(endFarmTime > timeNow) {
                setTimeout(() => {
                    console.log(Number(user.balance) + 1)
                    console.log(Number(user.balance), 1)
                    axios.post(`${url_api}user/changeBalance`, {id_telegram: id, balance: Number(user.balance) + 1}).then((response:any) => {
                        if(response.data === true) dispatch(setBalance({data: {balance: Number(user.balance) + 1}}))
                    })
                }, 30000);
            }else {
                dispatch(setFarmOnline({data: {farmOnline: false}}))
                localStorage.setItem("endFarmTime", String(0));
                localStorage.setItem("startFarmTime", String(0));
            }
        }
    }

    function farmOfflineClaim() {
        if(loadingDataUser === false) return;
        const startFarmTime = Number(localStorage.getItem("startFarmTime"));
        const endFarmTime = Number(localStorage.getItem("endFarmTime"));
        const timeNow = Math.floor(Date.now() / 1000);
        const thisFarmTime = Number(localStorage.getItem("thisFarmTime"));
        if(!Number.isNaN(startFarmTime) && startFarmTime !== 0 && !Number.isNaN(endFarmTime) && endFarmTime !== 0) {
            console.log("Date to farm: ", timeNow, endFarmTime, startFarmTime, thisFarmTime)
            if(timeNow < endFarmTime){
                const timeAllFarming = Number(timeNow) - Number(thisFarmTime);
                const money = Number(timeAllFarming) / 60;
                const money_get = Number(user.balance) + Number(money.toFixed(2))
                console.log(Number(user.balance) + Number(money.toFixed(2)))
                console.log(Number(user.balance), Number(money.toFixed(2)))
                axios.post(`${url_api}user/changeBalance`, {id_telegram: id, balance: Number(money_get)}).then((response:any) => {
                    if(response.data === true) dispatch(setBalance({data: {balance: Number(money_get)}}))
                })
            }else {
                const timeAllFarming = Number(endFarmTime) - Number(thisFarmTime);
                if(timeAllFarming > 5000){
                    const money = Number(timeAllFarming) / 60;
                    const money_get = Number(user.balance) + Number(money.toFixed(2))
                    console.log(Number(user.balance) + Number(money.toFixed(2)))
                    console.log(Number(user.balance), Number(money.toFixed(2)))
                    axios.post(`${url_api}user/changeBalance`, {id_telegram: id, balance: Number(money_get)}).then((response:any) => {
                        if(response.data === true) dispatch(setBalance({data: {balance: Number(money_get)}}))
                    })
                }
            }
            dispatch(setFarmOnline({data: {farmOnline: true}}));
        }
    }

    useEffect(() => {
        if(user.farmOnline === true) {
            console.log("Start farm online");
            startTimerFarm()
            startTimerThisTimeFarm()
        }
    }, [user.farmOnline, loadingDataUser])

    useEffect(() => {
        farmOfflineClaim()
    }, [loadingDataUser])

    useEffect(() => {
        if(user.profile_ready === 0) navigate("/profile")
    }, [location.href, user.profile_ready])

    useEffect(()=>{
        telegram.ready()
        telegram.expand()
        telegram.headerColor = "#0D1117"
        window.addEventListener("load",handleLoading);
        return () => window.removeEventListener("load",handleLoading);
    },[])

    return (
        <>
            {
                !isLoading ? (
                <Routes>
                    {
                        RouterList.map((el: RouterType, index: number) => (
                            <Route key={index} path={el.path} element={<Suspense fallback={<div>Loading...</div>}><el.component /></Suspense>}/>
                        ))
                    }
                </Routes>
                ) : (
                    <LoaderDefault />
                )
            }
        </>
    )
}

export default Router
