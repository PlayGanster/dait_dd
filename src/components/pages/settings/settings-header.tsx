import "@styles/pages/settings/settings-header.scss"
import { IoIosSettings } from "react-icons/io"

const SettingsHeader = () => {
  return (
    <div className="settings-header">
        <IoIosSettings size={24} fill="#9198A1" />
        Настройки
    </div>
  )
}

export default SettingsHeader
