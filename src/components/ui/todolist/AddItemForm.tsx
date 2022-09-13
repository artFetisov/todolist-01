import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

interface IAddItemFormProps {
    addItem: (title: string) => void
    placeholder?: string
    isDisabled?: boolean
}

export const AddItemForm: FC<IAddItemFormProps> = React.memo(({addItem, placeholder, isDisabled}) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const isError = error.length > 0

    function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        if (error) setError('')
        setNewTaskTitle(e.currentTarget.value)
    }

    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addTaskHandler()
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

    return <Grid style={{margin: '30px'}}>
        <TextField
            disabled={isDisabled}
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
            disabled={isError || isDisabled}
            size={"medium"}
            style={{margin: 'auto'}}
        >
            Add
        </Button>
    </Grid>
})