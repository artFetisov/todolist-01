import React, {FC, MouseEvent} from "react";
import {Heading} from "../heading/Heading";
import {ITodoItem} from "./todolist.types";
import {TodoListItem} from "./TodoListItem";
import {Button} from "../form-elements/Button";
import {FilterValuesType} from "../../pages/home/Home";
import {AddTaskForm} from "./AddTaskForm";
import {btnTitles} from "./todolist.data";
import styles from './TodoList.module.css'

interface ITodoListProps {
    title: string
    tasks: ITodoItem[]
    removeHandler: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTask: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const TodoList: FC<ITodoListProps> = (
    {
        title,
        tasks,
        removeHandler,
        changeFilter,
        addTask,
        changeTask,
        filter
    }
) => {
    const onSetFilter = (e: MouseEvent<HTMLButtonElement>) => {
        changeFilter(e.currentTarget.value as FilterValuesType)
    }


    return <div className="App">
        <div>
            <Heading title={title}/>
            <AddTaskForm addTask={addTask}/>
            <ul>
                {tasks.length > 0 ? tasks.map(task => <TodoListItem
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