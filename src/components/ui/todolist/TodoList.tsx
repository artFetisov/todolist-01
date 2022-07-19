import React, {FC, MouseEvent} from "react";
import {ITodoItem} from "./todolist.types";
import {TodoListItem} from "./TodoListItem";
import {Button} from "../form-elements/Button";
import {FilterValuesType} from './todolist.types'
import {AddItemForm} from "./AddItemForm";
import {btnTitles} from "./todolist.data";
import styles from './TodoList.module.css'
import {EditableSpan} from "./EditableSpan";

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

    return <div className="App">
        <div>
            <EditableSpan title={title} changeTitleHandler={changeListTitleHandler} isHeading/>
            <Button onClick={onRemoveTodoList}>Delete List</Button>
            <AddItemForm
                addItem={addItem}
                placeholder={'Add a new task'}
            />
            <ul>
                {tasks.length > 0 ? tasks.map(task => <TodoListItem
                        todoListId={id}
                        task={task}
                        key={task.id}
                        removeHandler={removeHandler}
                        changeTask={changeTask}
                        changeTaskTitle={changeTaskTitle}
                    />
                ) : <div><b>Tasks not found</b></div>}
            </ul>
            <div>
                {btnTitles.map(title => <Button
                        onClick={onSetFilter}
                        value={title.toLowerCase()}
                        children={title}
                        className={title.toLowerCase() === filter ? styles.btnActive : ''}
                        key={title}
                    />
                )}
            </div>
        </div>
    </div>
}