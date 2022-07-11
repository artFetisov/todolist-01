import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";
import styles from './TodoList.module.css'

interface IAddTaskForm {
    addTask: (title: string, todoListId: string) => void
    todoListId: string
}

export const AddTaskForm: FC<IAddTaskForm> = ({addTask, todoListId}) => {
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
            addTask(newTaskTitle.trim(), todoListId)
            setNewTaskTitle('')
        }
    }

    function addTaskHandler() {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            return
        }
        addTask(newTaskTitle.trim(), todoListId)
        setNewTaskTitle('')
    }

    return <div>
        <Input onKeyDown={onKeyPressHandler} type='text' value={newTaskTitle} onChange={onChangeTitle}
               placeholder='Enter a new task...'/>
        <Button onClick={addTaskHandler} children='+' disabled={isError}></Button>
        {error && <div className={styles.error}>{error}</div>}
    </div>
}