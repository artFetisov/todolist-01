import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Button, TextField} from "@mui/material";

interface IAddItemFormProps {
    addItem: (title: string) => void
    placeholder?: string
}

export const AddItemForm: FC<IAddItemFormProps> = ({addItem, placeholder}) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const isError = error.length > 0

    function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        if (error) setError('')
        setNewTaskTitle(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        if (e.key === 'Enter') {
            addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }

    function addTaskHandler() {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        addItem(newTaskTitle.trim())
        setNewTaskTitle('')
    }

    return <div style={{margin: '30px', display: 'flex', alignItems: 'center'}}>
        <TextField
            error={isError}
            id="outlined-basic"
            label={placeholder}
            variant="outlined"
            onKeyDown={onKeyPressHandler}
            value={newTaskTitle}
            onChange={onChangeTitle}
            helperText={error ? "Title is required" : ""}
            size={'small'}
            color={'success'}
            style={{marginRight: '10px'}}
        />
        <Button
            variant="contained"
            color="success"
            onClick={addTaskHandler}
            disabled={isError}
            size={"medium"}
        >
            Add
        </Button>
    </div>
}