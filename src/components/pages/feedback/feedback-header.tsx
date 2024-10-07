import { MdFeedback } from "react-icons/md"
import "@styles/pages/feedback/feedback-header.scss"

const FeedbackHeader = () => {
  return (
    <div className="feedback-header">
        <MdFeedback size={24} fill="#9198A1" />
        Обратная связь
    </div>
  )
}

export default FeedbackHeader
