import React, {FC} from 'react'
import burgerIcon from './burger.svg'
import s from './Header.module.css'
import {useLocation} from 'react-router-dom'
import {PATH} from '../Pages'

type PropsType = {
    handleOpen: () => void
}

export const Header: FC<PropsType> = ({ handleOpen }) => {
    const location = useLocation()
    const currentPath = location.pathname

    const pageName =
        currentPath === PATH.PRE_JUNIOR
            ? 'Pre-junior'
            : currentPath === PATH.JUNIOR
                ? 'Junior'
                : currentPath === PATH.JUNIOR_PLUS
                    ? 'Junior Plus'
                    : 'Error'

    return (
        <header id={'hw5-header'} className={s.header}>
            <div className={s.left}>
                <img
                    src={burgerIcon}
                    id={'hw5-burger-menu'}
                    className={s.burgerMenuIcon}
                    onClick={handleOpen}
                    alt={'open menu'}
                />
            </div>
            <div className={s.right}>{pageName}</div>
        </header>
    )
}
