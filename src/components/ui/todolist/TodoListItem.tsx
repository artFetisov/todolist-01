import React, {ChangeEvent, FC} from "react";
import {ITodoItem} from "./todolist.types";
import styles from './TodoList.module.css'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface ITodoItemProps {
    task: ITodoItem
    removeHandler: (id: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    todoListId: string
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
}

export const TodoListItem: FC<ITodoItemProps> = (
    {
        task,
        removeHandler,
        changeTaskStatus,
        todoListId,
        changeTaskTitle
    }) => {

    function onRemoveHandler() {
        removeHandler(task.id, todoListId)
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        changeTaskStatus(task.id, e.currentTarget.checked, todoListId)
    }

    function changeTaskTitleHandler(title: string) {
        changeTaskTitle(todoListId, task.id, title)
    }

    return <li className={task.isDone ? styles.isDone : ''}>
        <Checkbox checked={task.isDone} onChange={onChangeHandler} size={"small"}/>
        <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
        <IconButton onClick={onRemoveHandler} color={"error"} style={{marginLeft: 'auto'}}>
            <DeleteIcon/>
        </IconButton>
    </li>
}