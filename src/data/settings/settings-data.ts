import { SettingsListType, SettingsValuesType } from "@/types/types";

export const SettingsList: SettingsListType[] = [
    {
        id: 1,
        value: "Русский",
        open: false,
        name: "Язык",
        id_values: 1,
        type: "dropdown"
    },
    {
        id: 2,
        value: "Высокое",
        open: false,
        name: "Качество графики",
        id_values: 2,
        type: "dropdown"
    },
    {
        id: 3,
        value: "Стандарт",
        open: false,
        name: "Тема",
        id_values: 3,
        type: "dropdown"
    },
    {
        id: 4,
        value: "Вкл.",
        open: false,
        name: "Звук",
        id_values: 4,
        type: "dropdown"
    },
    {
        id: 6,
        value: "",
        open: null,
        name: "Обратная связь",
        id_values: null,
        type: "button",
        text_button: "Связаться"
    },
    {
        id: 7,
        value: "",
        open: null,
        name: "Политика",
        id_values: null,
        type: "button",
        text_button: "Открыть"
    },
    {
        id: 8,
        value: "0.0.1 Develop",
        open: null,
        name: "Версия",
        id_values: null,
        type: "text",
    },
]

export const SettingsValuesList: SettingsValuesType[] = [
    {
        id: 1,
        values: [
            {
                id: 1,
                value: "Русский"
            },
            {
                id: 2,
                value: "Английский"
            },
            {
                id: 3,
                value: "Испанский"
            }
        ]
    },
    {
        id: 2,
        values: [
            {
                id: 1,
                value: "Высокое"
            },
            {
                id: 2,
                value: "Среднее"
            },
            {
                id: 3,
                value: "Низкое"
            }
        ]
    },
    {
        id: 3,
        values: [
            {
                id: 1,
                value: "Стандарт"
            },
        ]
    },
    {
        id: 4,
        values: [
            {
                id: 1,
                value: "Вкл."
            },
            {
                id: 2,
                value: "Выкл."
            },
        ]
    }
]
