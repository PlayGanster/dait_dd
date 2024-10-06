import { RouterList } from "@/data/router/router-data"
import { RouterType } from "@/types/types"
import { Suspense, useEffect } from "react"
import { Route, Routes } from "react-router-dom"

const telegram = window.Telegram.WebApp

const Router = () => {

    useEffect(() => {
        telegram.ready()
        telegram.headerColor = "#0D1117"
    }, [])

  return (
    <Routes>
        {
            RouterList.map((el: RouterType, index: number) => (
                <Route key={index} path={el.path} element={<Suspense fallback={<div>Loading...</div>}><el.component /></Suspense>}/>
            ))
        }
    </Routes>
  )
}

export default Router
