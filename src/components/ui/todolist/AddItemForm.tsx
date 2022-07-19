import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";
import styles from './TodoList.module.css'

interface IAddItemFormProps {
    addItem: (title: string) => void
    placeholder: string
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

    return <div>
        <Input onKeyDown={onKeyPressHandler} type='text' value={newTaskTitle} onChange={onChangeTitle}
               placeholder={placeholder}/>
        <Button onClick={addTaskHandler} children='+' disabled={isError}></Button>
        {error && <div className={styles.error}>{error}</div>}
    </div>
}