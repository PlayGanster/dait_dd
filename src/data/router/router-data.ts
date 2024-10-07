import { RouterNavBarType, RouterType } from "@/types/types";
import React from "react";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FaMapMarkerAlt} from "react-icons/fa";
import { MdMeetingRoom, MdOutlineSwipe } from "react-icons/md";
import { RiHomeSmileFill } from "react-icons/ri";

export const RouterNavBar: RouterNavBarType[] = [
    {
        id: 1,
        path: "/",
        icon: RiHomeSmileFill,
        name: "Главная",
        active: false,
    }, {
        id: 2,
        path: "/room",
        icon: MdMeetingRoom,
        name: "Комната",
        active: false
    }, {
        id: 3,
        path: "/chats",
        icon: BsChatSquareTextFill,
        name: "Чаты",
        active: false
    }, {
        id: 4,
        path: "/swipe",
        icon: MdOutlineSwipe,
        name: "Свайп",
        active: false
    }, {
        id: 5,
        path: "/map",
        icon: FaMapMarkerAlt,
        name: "Карта",
        active: false
    }
]

const HomePage = React.lazy(() => import("@pages/home/home"));
const SettingsPage = React.lazy(() => import("@pages/settings/settings"));
const ProfilePage = React.lazy(() => import("@pages/profile/profile"));
const AnimationsPage = React.lazy(() => import("@pages/animations/animations"));
const PoliticsPage = React.lazy(() => import("@pages/politics/politics"));

export const RouterList: RouterType[] = [
    {
        id: 1,
        path: "/",
        component: HomePage
    },
    {
        id: 2,
        path: "/settings",
        component: SettingsPage
    },
    {
        id: 3,
        path: "/profile",
        component: ProfilePage
    },
    {
        id: 4,
        path: "/animations",
        component: AnimationsPage
    },
    {
        id: 5,
        path: "/politics",
        component: PoliticsPage
    }
]
