import { FC } from "react"

export interface RouterNavBarType {
    id: number,
    path: string,
    icon: any,
    name: string,
    active: boolean
}

export interface RouterType {
    id: number,
    path: string,
    component: FC
}

export interface CoinNumbersType {
    id: number,
    content: number,
    x_position: number,
    y_position: number
}

export interface SettingsListType {
    id: number,
    value: string,
    open: boolean | null,
    name: string,
    id_values: number | null,
    type: string,
    text_button?:string,
    href_button?:string,
    active_button?: boolean
}

export interface SettingsValueType {
    id: number,
    value: string
}

export interface SettingsValuesType {
    id: number,
    values: SettingsValueType[],
}

export interface ClothesType {
    id: number,
    open: boolean,
    name: string,
    img: any,
    description: string
}

export interface FilterShopType {
    id: number,
    name: string,
    active: boolean
    type_filter: string
}
