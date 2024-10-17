import { useAppSelector } from "@/redux/store";
import "@styles/pages/home/home-header.scss"
import { IoIosSettings } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const HeaderHome = () => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user)

  return (
    <div className="home-header">
        <div className="header__avatar--user" style={{backgroundImage: `url(${user.img})`}}></div>
        <div className="header__info--user">
            <p className="info__username">@create</p>
            <p className="info__name">{user.name} {user.surname}</p>
        </div>
        <div className="header__settings" onClick={() => navigate("/settings")}>
            <IoIosSettings size={22} fill="#9198A1" />
        </div>
    </div>
  )
}

export default HeaderHome
