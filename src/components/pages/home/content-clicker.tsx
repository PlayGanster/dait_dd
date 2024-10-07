import "@styles/pages/home/content-clicker.scss"
import { BsFillPersonVcardFill } from "react-icons/bs"
import { PiSneakerFill } from "react-icons/pi"
import { TbFaceId } from "react-icons/tb"
import AVATAR_IMG from "@assets/img/home/person-test.webp"
import { useNavigate } from "react-router-dom"
import { FaShirt } from "react-icons/fa6"
import { GiTrousers } from "react-icons/gi"

const ContentClicker = () => {
    const navigate = useNavigate();

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
        </div>
    </div>
  )
}

export default ContentClicker
