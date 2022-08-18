import React, {FC, MouseEvent, useCallback, useMemo} from "react";
import {ITodoItem} from "./todolist.types";
import {TodoListItem} from "./TodoListItem";
import {FilterValuesType} from './todolist.types'
import {AddItemForm} from "./AddItemForm";
import {btnTitles} from "./todolist.data";
import {EditableSpan} from "./EditableSpan";
import {Button, Card, Typography} from "@mui/material";
import {TasksActionCreators} from "../../../store/reducers/tasks/action-creators";
import {useDispatch} from "react-redux";
import {TodoListsActionCreators} from "../../../store/reducers/todolists/action-creators";

interface ITodoListProps {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: ITodoItem[]
}

export const TodoList: FC<ITodoListProps> = React.memo((
    {
        todoListId,
        title,
        filter,
        tasks
    }
) => {
    const dispatch = useDispatch()

    console.log('todoList is  render', todoListId, title)

    const addItem = useCallback((title: string) => {
        dispatch(TasksActionCreators.addTask(todoListId, title))
    }, [todoListId, dispatch])

    function onSetFilter(e: MouseEvent<HTMLButtonElement>) {
        dispatch(TodoListsActionCreators.changeTodoListFilter(todoListId, e.currentTarget.value as FilterValuesType))
    }

    function onRemoveTodoList() {
        dispatch(TodoListsActionCreators.removeTodoList(todoListId))
    }

    const changeListTitleHandler = useCallback((title: string) => {
        dispatch(TodoListsActionCreators.changeTodoListTitle(todoListId, title))
    }, [todoListId, dispatch])

    function filteredTasksHandler(tasks: ITodoItem[], filter: FilterValuesType): ITodoItem[] {
        if (filter === 'completed') return tasks.filter(t => t.isDone)
        else if (filter === 'active') return tasks.filter(t => !t.isDone)
        else return tasks
    }

    const filteredTasks = useMemo(() => filteredTasksHandler(tasks, filter), [filter, tasks])

    return <div style={{marginTop: '50px'}}>
        <div style={{display: 'flex', alignItems: 'start', justifyContent: 'space-between'}}>
            <EditableSpan title={title} changeTitleHandler={changeListTitleHandler} isHeading/>
            <Button onClick={onRemoveTodoList} color={'error'} variant="contained">Delete list</Button>
        </div>
        <AddItemForm
            addItem={addItem}
            placeholder={'Add new task'}
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