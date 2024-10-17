import { FilterShopType } from "@/types/types";

export const FilterShop: FilterShopType[] = [
    {
        id: 1,
        name: "Все",
        active: true,
        type_filter: "all"
    },
    {
        id: 2,
        name: "Верх",
        active: false,
        type_filter: "outerwear"
    },
    {
        id: 3,
        name: "Низ",
        active: false,
        type_filter: "trousers"
    },
    {
        id: 4,
        name: "Обувь",
        active: false,
        type_filter: "sneakers"
    }
]
