import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {TextField, Typography} from "@mui/material";

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
        return editMode ? <TextField
                autoFocus
                onKeyDown={onKeyPressHandler}
                onBlur={changeTitle}
                onChange={onChangeTitleHandler}
                value={newTitle}
                variant="standard"
            />
            : <Typography variant="h4" gutterBottom component="span" onDoubleClick={setEditModeHandler}>
                {title}
            </Typography>
    }

    return editMode ? <TextField
            autoFocus
            onKeyDown={onKeyPressHandler}
            onBlur={changeTitle}
            onChange={onChangeTitleHandler}
            value={newTitle}
            variant="standard"
        />
        : <span onDoubleClick={setEditModeHandler}>{title}</span>
}