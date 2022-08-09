import React, {ChangeEvent, FC} from "react";
import {ITodoItem} from "./todolist.types";
import styles from './TodoList.module.css'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TasksActionCreators} from "../../../store/reducers/tasks/action-creators";
import {useDispatch} from "react-redux";

interface ITodoItemProps {
    task: ITodoItem
    todoListId: string
}

export const TodoListItem: FC<ITodoItemProps> = (
    {
        task,
        todoListId,
    }) => {
    const dispatch = useDispatch()

    function onRemoveHandler() {
        dispatch(TasksActionCreators.removeTask(todoListId, task.id))
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        dispatch(TasksActionCreators.changeTaskStatus(todoListId, task.id, e.currentTarget.checked))
    }

    function changeTaskTitleHandler(title: string) {
        dispatch(TasksActionCreators.changeTaskTitle(todoListId, task.id, title))
    }

    return <li className={task.isDone ? styles.isDone : ''}>
        <Checkbox checked={task.isDone} onChange={onChangeHandler} size={"small"}/>
        <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
        <IconButton onClick={onRemoveHandler} color={"error"} style={{marginLeft: 'auto'}}>
            <DeleteIcon/>
        </IconButton>
    </li>
}