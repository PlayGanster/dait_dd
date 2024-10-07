import "@styles/pages/feedback/feedback-content.scss"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const telegram = window.Telegram.WebApp

const FeedbackContent = () => {
    const [message, setMessage] = useState<string>("")
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const token: string = "7667631724:AAEtfEXFrLRU26JUE_IbkrsaG55x2h9Rtq4"
    const navigate = useNavigate()

    telegram.BackButton.onClick(() => navigate("/settings"))

    const handleSendMessage = () => {
        if(message === ""){
            setError("Сообщение пустое");
        }else if(message.length < 10){
            setError("Сообщение меньше 10 символов")
        }else {
            // Send the message to the group chat using the Telegram API
            axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
              chat_id: "-4513046737",
              text: message,
            })
              .then(() => {
                    setError("")
                    setSuccess("Сообщение удачно отправлено")
                    setTimeout(() => {
                        setSuccess("")
                    }, (1000));
                  setMessage("")
              })
              .catch(() => {
                setError("Произошла ошибка сервера")
              })
        }
    };

    function renderError() {
        if(error === "") return ;
        return (
            <div className="content__error">
                {error}
            </div>
        )
    }

    function renderSuccess() {
        if(success === "") return ;
        return (
            <div className="content__success">
                {success}
            </div>
        )
    }

  return (
    <div className="feedback-content">
        {renderError()}
        {renderSuccess()}
        <div className="content-item">
            <p className="item__name">Сообщение обращения:</p>
            <textarea value={message} onChange={(e: any) => setMessage(e.target.value)} className="item__textarea"></textarea>
        </div>
        <button className="content__button" onClick={handleSendMessage}>
            Отправить
        </button>
    </div>
  )
}

export default FeedbackContent
