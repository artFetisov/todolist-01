import React, {FC, useState} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {tasks1} from "../../ui/todolist/todolist.data";
import {ITodoItem} from "../../ui/todolist/todolist.interface";

export type FilterValuseType = 'all' | 'active' | 'completed'

export const Home: FC = () => {
    const [tasks, setTasks] = useState<ITodoItem[]>(tasks1)
    const [filter, setFilter] = useState<FilterValuseType>('all')

    const removeHandler = (id: number) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilterHandler = (value: FilterValuseType) => {
        setFilter(value)
    }

    let filteredTasks = tasks

    if (filter === 'completed') filteredTasks = tasks.filter(t => !t.isDone)
    if (filter === 'active') filteredTasks = tasks.filter(t => t.isDone )

    return <div className="home">
        <TodoList
            title='JavaScript'
            tasks={filteredTasks}
            removeHandler={removeHandler}
            changeFilter={changeFilterHandler}
        />
    </div>
}