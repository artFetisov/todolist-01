import React, {FC, MouseEvent, useCallback, useEffect, useMemo} from "react";
import {TodoListItem} from "./TodoListItem";
import {AddItemForm} from "./AddItemForm";
import {btnTitles} from "./todolist.data";
import {EditableSpan} from "./EditableSpan";
import {Button, Card, Typography} from "@mui/material";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {FilterValuesType} from "../../../types/todo-list.types";
import {ITask, TaskStatuses} from "../../../types/task.types";
import {RequestStatusType} from "../../../types/app.types";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {changeTodoListFilter} from "../../../store/todolists/todolists.slice";
import {TasksThunkCreators} from "../../../store/tasks/tasks.actions";
import {TodoListsThunksCreators} from "../../../store/todolists/todolists.actions";

interface ITodoListProps {
    todoListId: string
    title: string
    filter: FilterValuesType
    listStatus: RequestStatusType
}

function filteredTasksHandler(tasks: ITask[], filter: FilterValuesType): ITask[] {
    if (filter === 'completed') return tasks.filter(t => t.status === TaskStatuses.COMPLETED)
    else if (filter === 'active') return tasks.filter(t => t.status === TaskStatuses.NEW)
    else return tasks
}

export const TodoList: FC<ITodoListProps> = React.memo((
    {
        todoListId,
        title,
        filter,
        listStatus
    }
) => {
    const dispatch = useAppDispatch()
    const tasks = useTypedSelector(state => state.tasks[todoListId])
    const isDisabled = listStatus === 'loading'

    useEffect(() => {
        dispatch(TasksThunkCreators.fetchTasks(todoListId))
    }, [])

    const addItem = useCallback((title: string) => {
        dispatch(TasksThunkCreators.createTask(todoListId, title))
    }, [todoListId, dispatch])

    function onSetFilter(e: MouseEvent<HTMLButtonElement>) {
        dispatch(changeTodoListFilter({todoListId, newFilter: e.currentTarget.value as FilterValuesType}))
    }

    function onRemoveTodoList() {
        dispatch(TodoListsThunksCreators.removeTodoList(todoListId))
    }

    const changeListTitleHandler = useCallback((title: string) => {
        dispatch(TodoListsThunksCreators.changeTitleTodoList(todoListId, title))
    }, [todoListId, dispatch])

    const filteredTasks = useMemo(() => filteredTasksHandler(tasks, filter), [filter, tasks])

    return <div style={{marginTop: '50px'}}>
        <div style={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
            <EditableSpan title={title} changeTitleHandler={changeListTitleHandler} isHeading isDisabled={isDisabled}/>
            <Button onClick={onRemoveTodoList} color={'error'} variant="contained" disabled={isDisabled}>Delete
                list</Button>
        </div>
        <AddItemForm
            addItem={addItem}
            placeholder={'Add new task'}
            isDisabled={isDisabled}
        />
        <Card>
            <ul>
                {filteredTasks.length > 0 ? filteredTasks.map(task => <TodoListItem
                        todoListId={todoListId}
                        task={task}
                        key={task.id}
                    />
                ) : <Typography variant="h6">Tasks not found</Typography>}
            </ul>

        </Card>
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
            {btnTitles.map(title => <Button
                    onClick={onSetFilter}
                    value={title.toLowerCase()}
                    key={title}
                    variant={title.toLowerCase() === filter ? 'contained' : 'outlined'}
                >
                    {title}
                </Button>
            )}
        </div>
    </div>
})