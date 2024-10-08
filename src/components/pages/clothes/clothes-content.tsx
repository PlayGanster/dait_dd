import { ClothesOuterwear, ClothesSneakers, ClothesTrousers } from "@/data/clothes/clothes-data"
import { ClothesType } from "@/types/types"
import "@styles/pages/clothes/clothes-content.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const telegram = window.Telegram.WebApp

const ClothesContent = () => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState([
        {
            name: "Верхняя одежда",
            path: "/clothes?filter=outerwear",
            get: "outerwear",
            active: false
        },
        {
            name: "Брюки",
            path: "/clothes?filter=trousers",
            get: "trousers",
            active: false
        },
        {
            name: "Обувь",
            path: "/clothes?filter=sneakers",
            get: "sneakers",
            active: false
        }
    ])
    const [clothesOuterwear, setClothesOuterwear] = useState<ClothesType[]>([])
    const [clothesTrousers, setClothesTrousers] = useState<ClothesType[]>([])
    const [clothesSneakers, setClothesSneakers] = useState<ClothesType[]>([])
    useEffect(() => {
        const array_get = location.href.split("?")
        const filter_array = array_get[1].split("=")
        const filter = filter_array[1]
        const copy = [...menu]
        setClothesOuterwear(ClothesOuterwear)
        setClothesTrousers(ClothesTrousers)
        setClothesSneakers(ClothesSneakers)
        telegram.BackButton.show()
        copy.filter((el: any) => {
            if(el.get === filter) el.active = true
            else el.active = false
        })
        setMenu(copy)
    }, [location.href])

    telegram.BackButton.onClick(() => navigate("/"))


    function renderClothes() {
        const array_get = location.href.split("?")
        const filter_array = array_get[1].split("=")
        const filter = filter_array[1]
        if(filter === "outerwear") {
            return (
                <>
                    {
                        clothesOuterwear && clothesOuterwear.map((el: ClothesType, index: number) => (
                            <div className="list-item" key={index}>
                                <img className="item__img" src={el.img} />
                                <div className="item__info">
                                    <p className="info__name">{el.name}</p>
                                    <p className="info__description">{el.description}</p>
                                    <button className="info__button">Посмотреть</button>
                                </div>
                            </div>
                        ))
                    }
                </>
            )
        }else if(filter === "trousers") {
            return (
                <>
                    {
                        clothesTrousers && clothesTrousers.map((el: ClothesType, index: number) => (
                            <div className="list-item" key={index}>
                                <img className="item__img" src={el.img} />
                                <div className="item__info">
                                    <p className="info__name">{el.name}</p>
                                    <p className="info__description">{el.description}</p>
                                    <button className="info__button">Посмотреть</button>
                                </div>
                            </div>
                        ))
                    }
                </>
            )
        }else if(filter === "sneakers") {
            return (
                <>
                    {
                        clothesSneakers && clothesSneakers.map((el: ClothesType, index: number) => (
                            <div className="list-item" key={index}>
                                <img className="item__img" src={el.img} />
                                <div className="item__info">
                                    <p className="info__name">{el.name}</p>
                                    <p className="info__description">{el.description}</p>
                                    <button className="info__button">Посмотреть</button>
                                </div>
                            </div>
                        ))
                    }
                </>
            )
        }
    }

  return (
    <div className="clothes-content">
        <ul className="content__menu">
            {
                menu && menu.map((el: any, index: number) => (
                    <li className={`menu-item ${el.active ? "--active" : ""}`} key={index} onClick={() => navigate(el.path)}>{el.name}</li>
                ))
            }
        </ul>
        <div className="content__list">
            {renderClothes()}
        </div>
    </div>
  )
}

export default ClothesContent
