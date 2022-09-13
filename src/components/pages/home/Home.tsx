import React, {FC, useCallback, useEffect} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {AddItemForm} from "../../ui/todolist/AddItemForm";
import {Container, Grid, LinearProgress} from "@mui/material";
import {TodoListsThunksCreators} from "../../../store/reducers/todolists/action-creators";
import {NavBar} from "../../ui/navbar/NavBar";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {CustomizedSnackBar} from "../../ui/snack-bar/SnackBar";
import styles from '../../../App.module.scss';
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";

export const Home: FC = () => {
    const dispatch = useTypedDispatch()
    const status = useTypedSelector(state => state.app.status)
    const todoLists = useTypedSelector(state => state.todoLists)

    useEffect(() => {
        dispatch(TodoListsThunksCreators.fetchTodoLists())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(TodoListsThunksCreators.createTodoList(title))
    }, [dispatch])

    return <>
        <NavBar/>
        <div className={styles.progressWrapper}>
            {status === 'loading' && <LinearProgress/>}
        </div>
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
                                listStatus={tl.listStatus}
                            />
                        </Grid>
                    }
                )}
            </Grid>
            <CustomizedSnackBar/>
        </Container>
    </>
}