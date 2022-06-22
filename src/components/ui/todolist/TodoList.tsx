import React, {FC} from "react";
import {Heading} from "../heading/Heading";
import {ITodoItem} from "./todolist.interface";
import {TodoListItem} from "./TodoListItem";

interface ITodoListProps {
    title: string
    tasks: ITodoItem[]
}

export const TodoList: FC<ITodoListProps> = ({title, tasks}) => {
    return <div className="App">
        <div>
            <Heading title={title}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks ? tasks.map(task => <TodoListItem task={task} key={task.id}/>) : <div>Tasks not found...</div>}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    </div>
}