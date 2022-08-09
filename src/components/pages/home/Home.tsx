import React, {FC} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {AddItemForm} from "../../ui/todolist/AddItemForm";
import {Layout} from "../../layout/Layout";
import {Grid} from "@mui/material";
import {TodoListsActionCreators} from "../../../store/reducers/todolists/action-creators";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../store";
import {ITodoListState} from "../../../store/reducers/todolists/types";

export const Home: FC = () => {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, ITodoListState[]>(state => state.todoLists)

    function addTodoList(title: string) {
        dispatch(TodoListsActionCreators.addTodoList(title))
    }

    return <Layout>
        <Grid container justifyContent={'center'}>
            <AddItemForm placeholder={'Add new list'} addItem={addTodoList}/>
        </Grid>
        <Grid container columnSpacing={7}>
            {todoLists.map(({id, title, filter}) => {
                    return <Grid key={id + title} item>
                        <TodoList
                            todoListId={id}
                            title={title}
                            filter={filter}
                        />
                    </Grid>
                }
            )}
        </Grid>
    </Layout>
}