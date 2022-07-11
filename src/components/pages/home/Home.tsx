import React, {FC, useState} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {allTasks, todoListsData} from "../../ui/todolist/todolist.data";
import {FilterValuesType, ITasks, ITodoItem, ITodoList} from "../../ui/todolist/todolist.types";
import {v1} from "uuid";


export const Home: FC = () => {
    const [todoLists, setTodoLists] = useState<ITodoList[]>(todoListsData)
    const [tasks, setTasks] = useState<ITasks>(allTasks)


    function removeHandler(id: string, todoListId: string) {
        const filteredTasks = tasks[todoListId].filter(t => t.id !== id)
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})
    }


    function addTask(title: string, todoListId: string) {
        if (title.trim().length > 0) {
            const newTask = {
                id: v1(),
                title,
                isDone: false
            }
            const newTasks = [newTask, ...tasks[todoListId]]
            tasks[todoListId] = newTasks
            setTasks({...tasks})
        }
    }

    function changeFilterHandler(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(list => list.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }

    }


    function changeTask(taskId: string, isDone: boolean, todoListId: string) {
        const task = tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function remodeTodoList(todoListId: string) {
        const filteredTodoLists = todoLists.filter(list => list.id !== todoListId)
        setTodoLists([...filteredTodoLists])
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function filteredTasksHandler(tasks: ITodoItem[], filter: FilterValuesType): ITodoItem[] {
        if (filter === 'completed') return tasks.filter(t => t.isDone)
        else if (filter === 'active') return tasks.filter(t => !t.isDone)
        else return tasks
    }

    return <div className="home">
        {todoLists.map(({id, title, filter}) => {
                const filteredTasks = filteredTasksHandler(tasks[id], filter)

                return <TodoList
                    key={id + title}
                    id={id}
                    title={title}
                    tasks={filteredTasks}
                    removeHandler={removeHandler}
                    changeFilter={changeFilterHandler}
                    addTask={addTask}
                    changeTask={changeTask}
                    filter={filter}
                    removeTodoList={remodeTodoList}
                />
            }
        )}
    </div>
}