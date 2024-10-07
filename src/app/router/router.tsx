import { RouterList } from "@/data/router/router-data"
import { RouterType } from "@/types/types"
import { Suspense, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import LoaderDefault from "../loader-default/loader-default"

const telegram = window.Telegram.WebApp

const Router = () => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoading = () => {
        setIsLoading(false);
    }

    useEffect(()=>{
        window.addEventListener("load",handleLoading);
        return () => window.removeEventListener("load",handleLoading);
    },[])

    useEffect(() => {
        telegram.ready()
        telegram.headerColor = "#0D1117"
    }, [])

    return !isLoading ? (
    <Routes>
        {
            RouterList.map((el: RouterType, index: number) => (
                <Route key={index} path={el.path} element={<Suspense fallback={<div>Loading...</div>}><el.component /></Suspense>}/>
            ))
        }
    </Routes>
    ):(
        <LoaderDefault />
    )
}

export default Router
