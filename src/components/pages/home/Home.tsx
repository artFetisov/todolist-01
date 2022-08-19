import React, {FC, useCallback} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {AddItemForm} from "../../ui/todolist/AddItemForm";
import {Container, Grid} from "@mui/material";
import {TodoListsActionCreators} from "../../../store/reducers/todolists/action-creators";
import {useDispatch} from "react-redux";
import {NavBar} from "../../ui/navbar/NavBar";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

export const Home: FC = () => {
    const dispatch = useDispatch()
    const todoLists = useTypedSelector(state => state.todoLists)
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
                            />
                        </Grid>
                    }
                )}
            </Grid>
        </Container>
    </>
}