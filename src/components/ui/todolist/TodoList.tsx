import React, {FC, MouseEvent} from "react";
import {Heading} from "../heading/Heading";
import {ITodoItem} from "./todolist.types";
import {TodoListItem} from "./TodoListItem";
import {Button} from "../form-elements/Button";
import {FilterValuesType} from './todolist.types'
import {AddTaskForm} from "./AddTaskForm";
import {btnTitles} from "./todolist.data";
import styles from './TodoList.module.css'

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
        removeTodoList
    }
) => {
    function onSetFilter(e: MouseEvent<HTMLButtonElement>) {
        changeFilter(e.currentTarget.value as FilterValuesType, id)
    }

    function onRemoveTodoList() {
        removeTodoList(id)
    }

    return <div className="App">
        <div>
            <Heading title={title}/>
            <Button onClick={onRemoveTodoList}>Delete List</Button>
            <AddTaskForm
                addTask={addTask}
                todoListId={id}
            />
            <ul>
                {tasks.length > 0 ? tasks.map(task => <TodoListItem
                        todoListId={id}
                        task={task}
                        key={task.id}
                        removeHandler={removeHandler}
                        changeTask={changeTask}
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