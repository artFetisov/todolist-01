import React, {ChangeEvent, FC, useCallback} from "react";
import styles from './TodoList.module.css'
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ITask, TaskStatuses} from "../../../types/task.types";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {removeTaskTC, updateTaskTC} from "../../../store/tasks/tasks.actions";

interface ITaskProps {
    task: ITask
    todoListId: string
}

export const TodoListItem: FC<ITaskProps> = React.memo((
        {
            task,
            todoListId,
        }) => {
        const dispatch = useAppDispatch()
        const isDisabled = task.entityStatus === 'loading'

        function onRemoveHandler() {
            dispatch(removeTaskTC({todoListId, taskId: task.id}))
        }

        function onChangeStatus(e: ChangeEvent<HTMLInputElement>) {
            dispatch(updateTaskTC({
                todoListId,
                taskId: task.id,
                newObj: {status: !!e.currentTarget.checked ? TaskStatuses.COMPLETED : TaskStatuses.NEW}
            }))
        }

        const changeTaskTitleHandler = useCallback((title: string) => {
            dispatch(updateTaskTC({todoListId, taskId: task.id, newObj: {title}}))
        }, [todoListId, task.id, dispatch])

        return <li className={task.status === TaskStatuses.COMPLETED ? styles.isDone : ''}>
            <Checkbox checked={task.status === TaskStatuses.COMPLETED} onChange={onChangeStatus} size={"small"}
                      disabled={isDisabled}/>
            <EditableSpan title={task.title} changeTitleHandler={changeTaskTitleHandler} isDisabled={isDisabled}/>
            <IconButton disabled={isDisabled} onClick={onRemoveHandler} color={"error"} style={{marginLeft: 'auto'}}>
                <DeleteIcon/>
            </IconButton>
        </li>
    }
)