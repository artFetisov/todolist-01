import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";
import styles from './TodoList.module.css'

interface IAddTaskForm {
    addTask: (title: string) => void
}

export const AddTaskForm: FC<IAddTaskForm> = ({addTask}) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const isError = error.length > 0

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError('')
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        if (e.key === 'Enter') {
            addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        addTask(newTaskTitle.trim())
        setNewTaskTitle('')
    }

    return <div>
        <Input onKeyPress={onKeyPressHandler} type='text' value={newTaskTitle} onChange={onChangeTitle}
               placeholder='Enter a new task...'/>
        <Button onClick={addTaskHandler} children='+' disabled={isError}></Button>
        {error && <div className={styles.error}>{error}</div>}
    </div>
}