import "@styles/pages/profile/profile-content.scss"
import { useState } from "react"

const ProfileContent = () => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [about, setAbout] = useState<string>("");
    const [profileFile, setProfileFile] = useState<{files: string}>({files: ''})

    const onChangeProfileFile = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const file = (e.target as HTMLInputElement).files;
        console.log(file);
    };

    return (
        <div className="profile-content">
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
                onChange={onChangeProfileFile}
                />
                <p className="item__description">Вы можете указать любое фото, но лучше указать реальное</p>
            </div>
            <button className="content__button">
                Сохранить
            </button>
        </div>
    )
}

export default ProfileContent
