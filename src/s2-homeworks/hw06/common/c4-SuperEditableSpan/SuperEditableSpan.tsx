import React, {DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useEffect, useState,} from 'react'
import s from './SuperEditableSpan.module.css'
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText'
import editIcon from './editIcon.svg'

// Типи пропсів
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement>

type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanProps?: DefaultSpanPropsType & { defaultText?: string }
}

const LOCAL_STORAGE_KEY = 'super-editable-span-value'

const SuperEditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,
        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(localStorage.getItem(LOCAL_STORAGE_KEY) || restProps.value as string || '')

    const { children, onDoubleClick, className, defaultText, ...restSpanProps } =
    spanProps || {}

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, value) // Зберігаємо значення при кожній зміні
    }, [value])

    const onEnterCallback = () => {
        setEditMode(false)
        onEnter?.()
    }

    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        onBlur?.(e)
    }

    const onDoubleClickCallBack = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        setEditMode(true)
        onDoubleClick?.(e)
    }

    const saveToLocalStorage = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, value)
    }

    const restoreFromLocalStorage = () => {
        const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY) || defaultText || ''
        setValue(savedValue)
    }

    const spanClassName = `${s.span} ${className || ''}`

    return (
        <div>
            {editMode ? (
                <SuperInputText
                    autoFocus={autoFocus || true}
                    onBlur={onBlurCallback}
                    onEnter={onEnterCallback}
                    className={s.input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...restProps}
                />
            ) : (
                <div className={s.spanBlock}>
                    <img
                        src={editIcon}
                        className={s.pen}
                        alt={'edit'}
                    />
                    <span
                        id="hw6-editable-span"
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}
                        {...restSpanProps}
                    >
                        {value || defaultText}
                    </span>
                </div>
            )}
            <div className={s.buttonsContainer}>
                <button id="hw6-save" onClick={saveToLocalStorage}>Save to ls</button>
                <button id="hw6-restore" onClick={restoreFromLocalStorage}>Get from ls</button>
            </div>
        </div>
    )
}

export default SuperEditableSpan
