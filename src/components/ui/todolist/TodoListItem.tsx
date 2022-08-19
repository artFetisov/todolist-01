import React, {ChangeEvent, FC, useCallback} from "react";
import styles from './TodoList.module.css'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TasksActionCreators} from "../../../store/reducers/tasks/action-creators";
import {useDispatch} from "react-redux";
import {ITask, TaskStatuses} from "../../../types/task.types";

interface ITaskProps {
    task: ITask
    todoListId: string
}

export const TodoListItem: FC<ITaskProps> = React.memo((
    {
        task,
        todoListId,
    }) => {
    const dispatch = useDispatch()
    console.log('todoList Item is render')

    function onRemoveHandler() {
        dispatch(TasksActionCreators.removeTask(todoListId, task.id))
    }

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        dispatch(TasksActionCreators.changeTaskStatus(todoListId, task.id, !!e.currentTarget.checked ? TaskStatuses.COMPLETED : TaskStatuses.NEW))
    }

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(TasksActionCreators.changeTaskTitle(todoListId, task.id, title))
    }, [todoListId, task.id, dispatch])

    return <li className={task.status === TaskStatuses.COMPLETED ? styles.isDone : ''}>
        <Checkbox checked={task.status === TaskStatuses.COMPLETED} onChange={onChangeHandler} size={"small"}/>
        <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
        <IconButton onClick={onRemoveHandler} color={"error"} style={{marginLeft: 'auto'}}>
            <DeleteIcon/>
        </IconButton>
    </li>
})