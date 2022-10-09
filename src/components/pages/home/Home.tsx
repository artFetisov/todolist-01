import React, {FC, useCallback, useEffect} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {AddItemForm} from "../../ui/todolist/AddItemForm";
import {Container, Grid, LinearProgress} from "@mui/material";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import styles from '../../../App.module.scss';
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {createTodoListTC, fetchTodoListsTC} from "../../../store/todolists/todolists.actions";

export const Home: FC = () => {
    const dispatch = useAppDispatch()
    const status = useTypedSelector(state => state.app.status)
    const todoLists = useTypedSelector(state => state.todoLists)

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListTC(title))
    }, [dispatch])

    return <div>
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
        </Container>
    </div>
}