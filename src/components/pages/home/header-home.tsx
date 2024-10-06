import "@styles/pages/home/home-header.scss"
import { IoIosSettings } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const HeaderHome = () => {
    const navigate = useNavigate();

  return (
    <div className="home-header">
        <div className="header__avatar--user" style={{backgroundImage: "url(https://avatars.mds.yandex.net/i?id=3e4905a65f46b07b22deb5b4b37efb4c_l-5547244-images-thumbs&n=13)"}}></div>
        <div className="header__info--user">
            <p className="info__username">@create</p>
            <p className="info__name">Александр Дружбин</p>
        </div>
        <div className="header__settings" onClick={() => navigate("/settings")}>
            <IoIosSettings size={22} fill="#9198A1" />
        </div>
    </div>
  )
}

export default HeaderHome
