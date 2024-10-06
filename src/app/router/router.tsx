import { RouterList } from "@/data/router/router-data"
import { RouterType } from "@/types/types"
import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"

const Router = () => {
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
