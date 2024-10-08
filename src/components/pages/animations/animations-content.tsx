import "@styles/pages/animations/animations-content.scss"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const telegram = window.Telegram.WebApp

const AnimationsContent = () => {
    const navigate = useNavigate()

    useEffect(() => {
        telegram.BackButton.show()
    }, [])

    telegram.BackButton.onClick(() => navigate("/"))

    return (
        <div className="animations-content">
        </div>
    )
}

export default AnimationsContent
