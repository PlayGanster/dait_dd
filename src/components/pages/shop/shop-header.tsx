import { FaBagShopping } from "react-icons/fa6"
import { IoFilter } from "react-icons/io5"
import "@styles/pages/shop/shop-header.scss"
import { useEffect, useState } from "react"
import { FilterShopType } from "@/types/types"
import { FilterShop } from "@/data/shop/shop-data"
import { useNavigate } from "react-router-dom"

const ShopHeader = () => {
    const [openFilter, setOpenFilter] = useState<boolean>(false)
    const [filter, setFilter] = useState<FilterShopType[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const copy_filter: FilterShopType[] = [...FilterShop]
        const array_get = location.href.split("?")
        const filter_array = array_get[1].split("=")
        const filter = filter_array[1]
        copy_filter.filter((el:FilterShopType) => {
            if(el.type_filter === filter) {
                el.active = true
            }else {
                el.active = false
            }
        })
        setFilter(copy_filter)
    }, [location.href])


  return (
    <div className="shop-header">
        <p className="header__name">
            <FaBagShopping size={24} fill="#9198A1" />
            Магазин
        </p>
        <div className={`header__filter ${openFilter ? "--active" : ""}`}>
            <p className="filter__name" onClick={() => setOpenFilter(!openFilter)}><IoFilter fill="#9198A1" size={16} /> Фильтры</p>
            {
                openFilter ? (
                    <div className="filter__popup">
                        <div className="popup__header">
                            Фильтры
                        </div>
                        <div className="popup-item">
                            <p className="item__name">Тип одежды</p>
                            <div className="item__list">
                                {
                                    filter.map((el:FilterShopType, index: number) => (
                                        <div key={index} onClick={() => navigate(`/shop?filter=${el.type_filter}`)} className={`list-item ${el.active ? "--active" : ""}`}>
                                            {el.name}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : ""
            }
        </div>
    </div>
  )
}

export default ShopHeader
