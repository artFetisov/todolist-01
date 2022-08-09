import React, {FC, MouseEvent} from "react";
import {ITodoItem} from "./todolist.types";
import {TodoListItem} from "./TodoListItem";
import {FilterValuesType} from './todolist.types'
import {AddItemForm} from "./AddItemForm";
import {btnTitles} from "./todolist.data";
import {EditableSpan} from "./EditableSpan";
import {Button, Card, Typography} from "@mui/material";
import {TasksActionCreators} from "../../../store/reducers/tasks/action-creators";
import {useDispatch, useSelector} from "react-redux";
import {TodoListsActionCreators} from "../../../store/reducers/todolists/action-creators";
import {AppRootState} from "../../../store";
import {ITasksState} from "../../../store/reducers/tasks/types";

interface ITodoListProps {
    todoListId: string
    title: string
    filter: FilterValuesType
}

export const TodoList: FC<ITodoListProps> = (
    {
        todoListId,
        title,
        filter,
    }
) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, ITasksState>(state => state.tasks)

    function addItem(title: string) {
        if (title.trim().length > 0) {
            dispatch(TasksActionCreators.addTask(todoListId, title))
        }
    }

    function onSetFilter(e: MouseEvent<HTMLButtonElement>) {
        dispatch(TodoListsActionCreators.changeTodoListFilter(todoListId, e.currentTarget.value as FilterValuesType))
    }

    function onRemoveTodoList() {
        dispatch(TodoListsActionCreators.removeTodoList(todoListId))
    }

    function changeListTitleHandler(title: string) {
        dispatch(TodoListsActionCreators.changeTodoListTitle(todoListId, title))
    }

    function filteredTasksHandler(tasks: ITodoItem[], filter: FilterValuesType): ITodoItem[] {
        if (filter === 'completed') return tasks.filter(t => t.isDone)
        else if (filter === 'active') return tasks.filter(t => !t.isDone)
        else return tasks
    }

    const filteredTasks = filteredTasksHandler(tasks[todoListId], filter)

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
}