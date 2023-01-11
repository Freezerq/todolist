import React, {ChangeEvent, useState} from "react";

export type EditableSpanPropsType = {
    title: string
    changeTask: (text: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [inputField, setInputField] = useState('')
    const [editMode, setEditMode] = useState(false)

    const doubleClickHandler = () => {
        setEditMode(true)
        setInputField(props.title)
    }
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputField(e.currentTarget.value)

    }
    const inputOnBlurHandler = () => {
        setEditMode(false)
        props.changeTask(inputField)
    }

    if (editMode) {
        return <input onBlur={inputOnBlurHandler} value={inputField} onChange={inputOnChangeHandler} autoFocus/>
    } else {
        return <span onDoubleClick={doubleClickHandler}>{props.title}</span>
    }

}