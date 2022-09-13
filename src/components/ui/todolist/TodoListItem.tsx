import React, {ChangeEvent, FC, useCallback} from "react";
import styles from './TodoList.module.css'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TasksThunkCreators} from "../../../store/reducers/tasks/action-creators";
import {ITask, TaskStatuses} from "../../../types/task.types";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";

interface ITaskProps {
    task: ITask
    todoListId: string
}

export const TodoListItem: FC<ITaskProps> = React.memo((
    {
        task,
        todoListId,
    }) => {
    const dispatch = useTypedDispatch()

    function onRemoveHandler() {
        dispatch(TasksThunkCreators.removeTask(todoListId, task.id))
    }

    function onChangeStatus(e: ChangeEvent<HTMLInputElement>) {
        dispatch(TasksThunkCreators.updateTask(todoListId, task.id, {status: !!e.currentTarget.checked ? TaskStatuses.COMPLETED : TaskStatuses.NEW}))
    }

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(TasksThunkCreators.updateTask(todoListId, task.id, {title}))
    }, [todoListId, task.id, dispatch])

    return <li className={task.status === TaskStatuses.COMPLETED ? styles.isDone : ''}>
        <Checkbox checked={task.status === TaskStatuses.COMPLETED} onChange={onChangeStatus} size={"small"}/>
        <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler}/>
        <IconButton onClick={onRemoveHandler} color={"error"} style={{marginLeft: 'auto'}}>
            <DeleteIcon/>
        </IconButton>
    </li>
})