import React, {FC, useState} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {tasks1} from "../../ui/todolist/todolist.data";
import {ITodoItem} from "../../ui/todolist/todolist.types";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

const filteredTasksHandler = (tasks: ITodoItem[], filter: FilterValuesType): ITodoItem[] => {
    if (filter === 'completed') return tasks.filter(t => t.isDone)
    else if (filter === 'active') return tasks.filter(t => !t.isDone)
    else return tasks
}

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
        if (title.trim().length > 0) {
            const newTask = {
                id: v1(),
                title,
                isDone: false
            }
            setTasks([newTask, ...tasks])
        }
    }

    let filteredTasks = filteredTasksHandler(tasks, filter)

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