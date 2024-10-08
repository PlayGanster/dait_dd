import "@styles/pages/clothes/clothes-header.scss"
import { GiClothes } from "react-icons/gi"

const ClothesHeader = () => {
  return (
    <div className="clothes-header">
        <GiClothes size={24} fill="#9198A1" />
        Одежда
    </div>
  )
}

export default ClothesHeader
