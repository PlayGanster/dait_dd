import "@styles/pages/home/content-clicker.scss"
import { BsFillPersonVcardFill } from "react-icons/bs"
import { GiClothes } from "react-icons/gi"
import { PiSneakerFill } from "react-icons/pi"
import { TbFaceId } from "react-icons/tb"
import AVATAR_IMG from "@assets/img/home/person-test.webp"

const ContentClicker = () => {
  return (
    <div className="content__clicker--wrapper">
        <div className="content__clicker--content">
            <ul className="clicker__navigation">
                <li className="navigation-item"><BsFillPersonVcardFill className="item__icon" /></li>
                <li className="navigation-item"><TbFaceId className="item__icon" /></li>
                <li className="navigation-item"><GiClothes className="item__icon" /></li>
                <li className="navigation-item"><PiSneakerFill className="item__icon" /></li>
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
