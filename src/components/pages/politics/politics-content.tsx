import "@styles/pages/politics/politics-content.scss"
import { useNavigate } from "react-router-dom"

const telegram = window.Telegram.WebApp

const PoliticsContent = () => {
    const navigate = useNavigate();
    telegram.BackButton.onClick(() => navigate("/settings"))

    return (
        <div className="politics-content">
            <p className="content__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi neque nisi facilis ratione mollitia, eum nam cumque. Dignissimos ea quisquam sed nam aspernatur similique ipsam optio qui quos suscipit placeat ex dolor corrupti ratione aliquid excepturi hic, alias consequatur sit culpa! Dicta nobis consequatur recusandae corporis in ut! Dolor quae itaque perspiciatis deleniti ullam recusandae architecto.
            </p>
        </div>
    )
}

export default PoliticsContent
