import { RouterNavBar } from "@/data/router/router-data"
import { RouterNavBarType } from "@/types/types"
import "@styles/layout/layout-tapbar.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const LayoutTapbar = () => {
    const [list, setList] = useState<RouterNavBarType[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const copy: RouterNavBarType[] = [...RouterNavBar]
        copy.filter((el: RouterNavBarType) => {
            if(el.path === location.pathname) el.active = true
            else el.active = false
        })
        setList(copy)
    }, [location.pathname])

    function renderTopBar() {
        if(location.pathname !== "/") return;
        return (
            <div className="tapbar__topmenu">
                <ul className="topmenu__list">
                    <li className="list-item" onClick={() => navigate("/friends")}>Магазин</li>
                    <li className="list-item" onClick={() => navigate("/tasks")}>Задания</li>
                    <li className="list-item" onClick={() => navigate("/referals")}>Рефералы</li>
                </ul>
            </div>
        )
    }

    return (
        <div className="layout-tapbar">
            {renderTopBar()}
            <ul className="tapbar__list">
                {
                    list.map((el: RouterNavBarType, index: number) => (
                        <li key={index} onClick={() => navigate(el.path)} className={`list-item ${el.active ? "--active" : ""}`}>
                            <el.icon size={22}/>
                            <p className="item__name">{el.name}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default LayoutTapbar
