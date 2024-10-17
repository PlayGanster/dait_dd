import { url_api } from "@/data/site/site-data";
import { setDataUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import "@styles/pages/profile/profile-content.scss"
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const telegram = window.Telegram.WebApp

const ProfileContent = () => {
    const user = useAppSelector(state => state.user)
    const [name, setName] = useState<string>(user.name);
    const [surname, setSurname] = useState<string>(user.surname);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const id = telegram.initDataUnsafe.user?.id
    // const [about, setAbout] = useState<string>("");
    // const [profileFile, setProfileFile] = useState<{files: string}>({files: ''})

    const handleFileChange = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        telegram.BackButton.show()
    }, [])

    useEffect(() => {
        setName(user.name)
        setSurname(user.surname)
    }, [user])

    telegram.BackButton.onClick(() => navigate("/"));

    // const onChangeProfileFile = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const file = (e.target as HTMLInputElement).files;
    //     console.log(file);
    // };

    function updateUser() {
        if(name === "" || surname === ""){
            setError("Есть пустые поля!")
        }else {
            const formData = new FormData();
            formData.append('file', selectedFile);
            axios.post(`${url_api}user/uploadAvatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            })
            .then((response:any) => {
                const img = response.data.img
                if(response.data.code === "200") {
                    axios.post(`${url_api}user/updateInfo`, {name: name, surname: surname, id_telegram: id, img: img}).then((responsee:any) => {
                        if(responsee.data === true){
                            dispatch(setDataUser({data: {name: name, surname: surname, balance: user.balance, img: img, profile_ready: 1}}))
                        }
                        setError("")
                        setSuccess("Удачно изменили данные")
                        setTimeout(() => {
                            setSuccess("")
                        }, (1000));
                    }).catch(() => {
                        setError("Произошла ошибка сервера")
                    })
                }
            })
            .catch(() => {
                setError("Произошла ошибка сервера")
            });
        }
    }

    function renderError() {
        if(error === "") return ;
        return (
            <div className="content__error">
                {error}
            </div>
        )
    }

    function renderSuccess() {
        if(success === "") return ;
        return (
            <div className="content__success">
                {success}
            </div>
        )
    }

    return (
        <div className="profile-content">
            {renderError()}
            {renderSuccess()}
            <div className="content-item">
                <p className="item__name">Имя:</p>
                <input className="item__input" value={name} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
                <p className="item__description">Вы можете указать любое имя, но лучше указать реальное</p>
            </div>
            <div className="content-item">
                <p className="item__name">Фамилия:</p>
                <input className="item__input" value={surname} onInput={(event: React.ChangeEvent<HTMLInputElement>) => setSurname(event.target.value)} />
                <p className="item__description">Вы можете указать любую фамилию, но лучше указать реальную</p>
            </div>
            <div className="content-item">
                <p className="item__name">Фото профиля:</p>
                <input className="item__input"
                type='file'
                id='photo'
                name='photo'
                accept='image/png, image/jpeg'
                onChange={handleFileChange}
                />
                <p className="item__description">Вы можете указать любое фото, но лучше указать реальное</p>
            </div>
            <button className="content__button" onClick={() => updateUser()}>
                Сохранить
            </button>
        </div>
    )
}

export default ProfileContent
