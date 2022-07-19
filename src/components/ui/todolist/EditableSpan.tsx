import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Input} from "../form-elements/Input";
import {Heading} from "../heading/Heading";

interface IEditableSpanProps {
    title: string
    changeTitleHandler: (title: string) => void
    isHeading?: boolean
}

export const EditableSpan: FC<IEditableSpanProps> = ({title, changeTitleHandler, isHeading}) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    function setEditModeHandler() {
        setNewTitle(title)
        setEditMode(true)
    }

    function changeTitle() {
        setEditMode(false)
        changeTitleHandler(newTitle)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            changeTitle()
        }
    }

    function onChangeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
        setNewTitle(e.currentTarget.value)
    }

    if (isHeading) {
        return editMode ? <Input
                autoFocus
                onKeyDown={onKeyPressHandler}
                onBlur={changeTitle}
                onChange={onChangeTitleHandler}
                value={newTitle}
            />
            : <Heading title={title} onDoubleClick={setEditModeHandler}></Heading>
    }

    return editMode ? <Input
            autoFocus
            onKeyDown={onKeyPressHandler}
            onBlur={changeTitle}
            onChange={onChangeTitleHandler}
            value={newTitle}
        />
        : <span onDoubleClick={setEditModeHandler}>{title}</span>
}