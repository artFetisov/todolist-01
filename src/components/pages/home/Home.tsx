import React, {FC, useReducer,} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {allTasks, todoListsData} from "../../ui/todolist/todolist.data";
import {FilterValuesType, ITodoItem,} from "../../ui/todolist/todolist.types";
import {AddItemForm} from "../../ui/todolist/AddItemForm";
import {Layout} from "../../layout/Layout";
import {Grid} from "@mui/material";
import todoListsReducer from "../../../store/todolists";
import tasksReducer from "../../../store/tasks";
import {TodoListsActionCreators} from "../../../store/todolists/action-creators";
import {TasksActionCreators} from "../../../store/tasks/action-creators";


export const Home: FC = () => {
    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, todoListsData)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, allTasks)

    function changeListTitle(todoListId: string, newTitle: string) {
        dispatchTodoLists(TodoListsActionCreators.changeTodoListTitle(todoListId, newTitle))
    }

    function removeTodoList(todoListId: string) {
        dispatchTodoLists(TodoListsActionCreators.removeTodoList(todoListId))
        dispatchTasks(TodoListsActionCreators.removeTodoList(todoListId))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchTodoLists(TodoListsActionCreators.changeTodoListFilter(todoListId, value))
    }

    function addTodoList(title: string) {
        const action = TodoListsActionCreators.addTodoList(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function removeTask(id: string, todoListId: string) {
        dispatchTasks(TasksActionCreators.removeTask(todoListId, id))
    }

    function addTask(title: string, todoListId: string) {
        if (title.trim().length > 0) {
            dispatchTasks(TasksActionCreators.addTask(todoListId, title))
        }
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchTasks(TasksActionCreators.changeTaskStatus(todoListId, taskId, isDone))
    }

    function changeTaskTitle(todoListId: string, taskId: string, newTitle: string) {
        dispatchTasks(TasksActionCreators.changeTaskTitle(todoListId, taskId, newTitle))
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