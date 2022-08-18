import React, {FC, useCallback} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {AddItemForm} from "../../ui/todolist/AddItemForm";
import {Container, Grid} from "@mui/material";
import {TodoListsActionCreators} from "../../../store/reducers/todolists/action-creators";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../store";
import {ITodoListState} from "../../../store/reducers/todolists/types";
import {NavBar} from "../../ui/navbar/NavBar";
import {ITasksState} from "../../../store/reducers/tasks/types";

export const Home: FC = () => {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, ITodoListState[]>(state => state.todoLists)
    const tasks = useSelector<AppRootState, ITasksState>(state => state.tasks)
    console.log('Home is render')

    const addTodoList = useCallback((title: string) => {
        dispatch(TodoListsActionCreators.addTodoList(title))
    }, [dispatch])

    return <>
        <NavBar/>
        <Container>
            <Grid container justifyContent={'center'}>
                <AddItemForm placeholder={'Add new list'} addItem={addTodoList}/>
            </Grid>
            <Grid container columnSpacing={7}>
                {todoLists.map((tl) => {
                        return <Grid key={tl.id + tl.title} item>
                            <TodoList
                                todoListId={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                tasks={tasks[tl.id]}
                            />
                        </Grid>
                    }
                )}
            </Grid>
        </Container>
    </>
}