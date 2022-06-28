import React, {ChangeEvent, KeyboardEvent, FC, useState} from "react";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";

interface IAddTaskForm {
    addTask: (title: string) => void
}

export const AddTaskForm: FC<IAddTaskForm> = ({addTask}) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('')

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    return <div>
        <Input onKeyPress={onKeyPressHandler} type='text' value={newTaskTitle} onChange={onChangeTitle}
               placeholder='Enter a new task...'/>
        <Button onClick={addTaskHandler} children='+'></Button>
    </div>
}