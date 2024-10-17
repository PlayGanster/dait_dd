import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type NameType = string
type SurnameType = string
type BalanceType = number
type ImgType = string
type ProfileReady = number | null
type LanguageType = string
type GraphicsType = string
type ThemeType = string
type SoundType = string
type farmOnlineType = boolean

export interface UserState {
    name: NameType,
    surname: SurnameType,
    balance: BalanceType,
    img: ImgType,
    profile_ready: ProfileReady,
    language: LanguageType,
    graphics: GraphicsType,
    theme: ThemeType,
    sound: SoundType,
    farmOnline: farmOnlineType
}

const initialState: UserState = {
    name: "",
    surname: "",
    balance: 0,
    img: "",
    profile_ready: null,
    language: "",
    graphics: "",
    theme: "",
    sound: "",
    farmOnline: false
}

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
        setDataUser: (state, action: PayloadAction<{data: any}>) => {
            state.name = action.payload.data.name
            state.surname = action.payload.data.surname
            state.balance = action.payload.data.balance
            state.img = action.payload.data.img
            state.profile_ready = action.payload.data.profile_ready
		},
        setSettings: (state, action: PayloadAction<{data: {language: LanguageType, graphics: GraphicsType, theme: ThemeType, sound: SoundType}}>) => {
            state.language = action.payload.data.language
            state.graphics = action.payload.data.graphics
            state.theme = action.payload.data.theme
            state.sound = action.payload.data.sound
		},
        setFarmOnline: (state, action: PayloadAction<{data: {farmOnline: boolean}}>) => {
            state.farmOnline = action.payload.data.farmOnline
		},
        setBalance: (state, action: PayloadAction<{data: {balance: number}}>) => {
            state.balance = action.payload.data.balance
		},
	}
})

export default UserSlice.reducer
export const {setDataUser, setSettings, setFarmOnline, setBalance} = UserSlice.actions
