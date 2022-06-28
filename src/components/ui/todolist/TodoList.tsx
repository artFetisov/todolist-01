import React, {FC} from "react";
import {Heading} from "../heading/Heading";
import {ITodoItem} from "./todolist.interface";
import {TodoListItem} from "./TodoListItem";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";
import {FilterValuseType} from "../../pages/home/Home";

interface ITodoListProps {
    title: string
    tasks: ITodoItem[]
    removeHandler: (id: number) => void
    changeFilter: (value: FilterValuseType) => void
}

export const TodoList: FC<ITodoListProps> = ({title, tasks, removeHandler, changeFilter}) => {
    return <div className="App">
        <div>
            <Heading title={title}/>
            <div>
                <Input type='text'/>
                <Button children='+'/>
            </div>
            <ul>
                {tasks ? tasks.map(task => <TodoListItem task={task} key={task.id} removeHandler={removeHandler}/>) :
                    <div>Tasks not found...</div>}
            </ul>
            <div>
                <Button children="All" onClick={() => changeFilter('all')}/>
                <Button children="Active" onClick={() => changeFilter('active')}/>
                <Button children="Completed" onClick={() => changeFilter('completed')}/>
            </div>
        </div>
    </div>
}