import React, {FC, MouseEvent} from "react";
import {ITodoItem} from "./todolist.types";
import {TodoListItem} from "./TodoListItem";
import {FilterValuesType} from './todolist.types'
import {AddItemForm} from "./AddItemForm";
import {btnTitles} from "./todolist.data";
import styles from './TodoList.module.css'
import {EditableSpan} from "./EditableSpan";
import {Button, Card, Typography} from "@mui/material";

interface ITodoListProps {
    id: string
    title: string
    tasks: ITodoItem[]
    removeHandler: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTask: (taskId: string, isDone: boolean, todoListid: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeListTitle: (todoListId: string, newTitle: string) => void
}

export const TodoList: FC<ITodoListProps> = (
    {
        id,
        title,
        tasks,
        removeHandler,
        changeFilter,
        addTask,
        changeTask,
        filter,
        removeTodoList,
        changeTaskTitle,
        changeListTitle
    }
) => {
    function addItem(title: string) {
        addTask(title, id)
    }

    function onSetFilter(e: MouseEvent<HTMLButtonElement>) {
        changeFilter(e.currentTarget.value as FilterValuesType, id)
    }

    function onRemoveTodoList() {
        removeTodoList(id)
    }

    function changeListTitleHandler(title: string) {
        changeListTitle(id, title)
    }

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
                {tasks.length > 0 ? tasks.map(task => <TodoListItem
                        todoListId={id}
                        task={task}
                        key={task.id}
                        removeHandler={removeHandler}
                        changeTask={changeTask}
                        changeTaskTitle={changeTaskTitle}
                    />
                ) : <Typography variant="h6">Tasks not found</Typography>}
            </ul>

        </Card>
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
            {btnTitles.map(title => <Button
                    onClick={onSetFilter}
                    value={title.toLowerCase()}
                    className={title.toLowerCase() === filter ? styles.btnActive : ''}
                    key={title}
                    variant={title.toLowerCase() === filter ? 'contained' : 'outlined'}
                >
                    {title}
                </Button>
            )}
        </div>
    </div>
}