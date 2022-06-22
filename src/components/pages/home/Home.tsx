import React, {FC} from "react";
import {TodoList} from "../../ui/todolist/TodoList";
import {tasks2, tasks1} from "../../ui/todolist/todolist.data";

export const Home: FC = () => {
    return <div className="home">
        <TodoList title='JavaScript' tasks={tasks2}/>
        <TodoList title='NodeJS' tasks={tasks2}/>
        <TodoList title='SCSS' tasks={tasks1}/>
    </div>
}