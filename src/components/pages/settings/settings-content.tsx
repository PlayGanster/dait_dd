import { SettingsList, SettingsValuesList } from "@/data/settings/settings-data"
import { SettingsListType, SettingsValueType, SettingsValuesType } from "@/types/types"
import "@styles/pages/settings/settings-content.scss"
import { useEffect, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const SettingsContent = () => {
    const [list, setList] = useState<SettingsListType[]>([])

    useEffect(() => {
        setList(SettingsList)
    }, [])

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
                            <div className="item__dropdown" onClick={() => openDropdown(el.id)}>
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
                            <button className="item__button">
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
