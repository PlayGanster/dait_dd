import { SettingsList, SettingsValuesList } from "@/data/settings/settings-data"
import { idUserTelegram, url_api } from "@/data/site/site-data"
import { useAppSelector } from "@/redux/store"
import { SettingsListType, SettingsValueType, SettingsValuesType } from "@/types/types"
import "@styles/pages/settings/settings-content.scss"
import axios from "axios"
import { useEffect, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const telegram = window.Telegram.WebApp

const SettingsContent = () => {
    const [list, setList] = useState<SettingsListType[]>([])
    const user = useAppSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        const copy = [...SettingsList]
        copy.filter((el: SettingsListType) => {
            if(el.id === 1) el.value = user.language
            if(el.id === 2) el.value = user.graphics
            if(el.id === 3) el.value = user.theme
            if(el.id === 4) el.value = user.sound
        })
        setList(copy)
        telegram.BackButton.show()
    }, [])

    telegram.BackButton.onClick(() => navigate("/"))

    function openDropdown(id: number) {
        const copy: SettingsListType[] = [...list];
        copy.filter((el: SettingsListType) => {
            if(el.id === id) el.open = !el.open
            else el.open = false
        })
        setList(copy)
    }

    function selectValue(value: string, id: number, event: any) {
        event.stopPropagation()
        const copy:SettingsListType[] = [...list];
        copy.filter((el: SettingsListType) => {
            if(el.id === id){
                el.value = value;
                el.open = false;
            }
        })
        axios.post(`${url_api}user/changeSettings`, {language: copy[0].value, graphics: copy[1].value, theme: copy[2].value, sound: copy[3].value, id_telegram: idUserTelegram}).then((response:any) => {console.log(response.data)})
        setList(copy)
    }

  return (
    <div className="settings-content">
        {
            list && list.map((el: SettingsListType, index: number) => {
                if(el.type === "dropdown"){
                    return (
                        <div className="content-item" key={index}>
                            <p className="item__name">{el.name}</p>
                            <div className={`item__dropdown ${el.open ? "--active" : ""}`} onClick={() => openDropdown(el.id)}>
                                <p className="dropdown__value">{el.value} {el.open ? (<IoIosArrowUp size={18}  />) : (<IoIosArrowDown size={18}  />)}</p>
                                {
                                    el.open ?
                                    SettingsValuesList && SettingsValuesList.map((el_values: SettingsValuesType, index: number) => {
                                        if(el_values.id === el.id_values){
                                            return (
                                                <div className="dropdown__list" key={index}>
                                                    {
                                                        el_values.values && el_values.values.map((el_item:SettingsValueType, index: number) => (
                                                            <div className="list-item" key={index} onClick={(event: any) => selectValue(el_item.value, el.id, event)}>
                                                                {el_item.value}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    })
                                    : ""
                                }
                            </div>
                        </div>
                    )
                }else if(el.type === "button"){
                    return (
                        <div className="content-item">
                            <p className="item__name">{el.name}</p>
                            <button className="item__button" onClick={() => {
                                if(el.href_button !== undefined) navigate(el.href_button)
                            }} disabled={!el.active_button}>
                                {el.text_button}
                            </button>
                        </div>
                    )
                }else if(el.type === "text"){
                    return (
                        <div className="content-item">
                            <p className="item__name">{el.name}</p>
                            <p className="item__value">{el.value}</p>
                        </div>
                    )
                }
            })
        }
    </div>
  )
}

export default SettingsContent
