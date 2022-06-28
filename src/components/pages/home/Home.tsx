import React, {FC, useState} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {tasks1} from "../../ui/todolist/todolist.data";
import {ITodoItem} from "../../ui/todolist/todolist.interface";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export const Home: FC = () => {
    const [tasks, setTasks] = useState<ITodoItem[]>(tasks1)
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeHandler = (id: string) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    let filteredTasks = tasks

    if (filter === 'completed') filteredTasks = tasks.filter(t => t.isDone)
    if (filter === 'active') filteredTasks = tasks.filter(t => !t.isDone)

    return <div className="home">
        <TodoList
            title='JavaScript'
            tasks={filteredTasks}
            removeHandler={removeHandler}
            changeFilter={changeFilterHandler}
            addTask={addTask}
        />
    </div>
}