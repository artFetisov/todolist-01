import React, {FC, useState} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {allTasks, todoListsData} from "../../ui/todolist/todolist.data";
import {FilterValuesType, ITasks, ITodoItem, ITodoList} from "../../ui/todolist/todolist.types";
import {v1} from "uuid";
import {AddItemForm} from "../../ui/todolist/AddItemForm";
import {Layout} from "../../layout/Layout";
import {Grid} from "@mui/material";


export const Home: FC = () => {
    const [todoLists, setTodoLists] = useState<ITodoList[]>(todoListsData)
    const [tasks, setTasks] = useState<ITasks>(allTasks)

        function changeListTitle(todoListId: string, newTitle: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    function addTodoList(title: string) {
        const newTodoList: ITodoList = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
    }

    function removeTask(id: string, todoListId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(tl => tl.id !== id)})
    }

    function addTask(title: string, todoListId: string) {
        if (title.trim().length > 0) {
            const newTask = {
                id: v1(),
                title,
                isDone: false
            }
            setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        }
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    function changeTaskTitle(todoListId: string, taskId: string, newTitle: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    function filteredTasksHandler(tasks: ITodoItem[], filter: FilterValuesType): ITodoItem[] {
        if (filter === 'completed') return tasks.filter(t => t.isDone)
        else if (filter === 'active') return tasks.filter(t => !t.isDone)
        else return tasks
    }

    return <Layout>
        <Grid container justifyContent={'center'}>
            <AddItemForm placeholder={'Add new list'} addItem={addTodoList}/>
        </Grid>
        <Grid container columnSpacing={7}>
            {todoLists.map(({id, title, filter}) => {
                    const filteredTasks = filteredTasksHandler(tasks[id], filter)

                    return <Grid key={id + title} item>
                        <TodoList
                            id={id}
                            title={title}
                            tasks={filteredTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={filter}
                            removeTodoList={removeTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeListTitle={changeListTitle}
                        />
                    </Grid>
                }
            )}
        </Grid>
    </Layout>
}