import { ClothesOuterwear, ClothesSneakers, ClothesTrousers } from "@/data/clothes/clothes-data"
import { ClothesType } from "@/types/types"
import "@styles/pages/clothes/clothes-content.scss"
import { useEffect, useState } from "react"
import { GiClothes } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from "react-router-dom"

const telegram = window.Telegram.WebApp

const ClothesContent = () => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState([
        {
            name: "Верх",
            path: "/clothes?filter=outerwear",
            get: "outerwear",
            active: false
        },
        {
            name: "Низ",
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
    const [clothesSelect, setClothesSelect] = useState<ClothesType | null>(null)
    const [stylePopup, setStylePopup] = useState<string>("");
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
                                    <button className="info__button" onClick={() => setClothesSelect(el)}>Посмотреть</button>
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
                                    <button className="info__button" onClick={() => setClothesSelect(el)}>Посмотреть</button>
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
                                    <button className="info__button" onClick={() => setClothesSelect(el)}>Посмотреть</button>
                                </div>
                            </div>
                        ))
                    }
                </>
            )
        }
    }

    const closePopup = () => {
        setStylePopup("--close")
        setTimeout(() => {
            setClothesSelect(null)
            setStylePopup("")
        }, 1000);
    }

    function renderPopupClothes() {
        if(clothesSelect === null) return ;
        return (
            <div className="content__popup--wrapper">
                <div className={`content__popup--content ${stylePopup}`}>
                    <div className="content__header">
                        <p className="header__name"><GiClothes size={24} fill="#9198A1" />{clothesSelect.name}</p>
                        <RxCross2 size={24} onClick={closePopup} />
                    </div>
                    <div className="content__content">
                        <div className="content__product">
                            <img className="product__img" src={clothesSelect.img} />
                            <div className="product__info">
                                <p className="info__description">{clothesSelect.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="content__buttons">
                        <button className="button-item">Предпросмотр</button>
                        <button className="button-item --select" onClick={closePopup}>Применить</button>
                    </div>
                </div>
            </div>
        )
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
        {
            renderPopupClothes()
        }
    </div>
  )
}

export default ClothesContent
