import React, {FC} from "react";
import {ITodoItem} from "./todolist.interface";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";

interface ITodoItemProps {
    task: ITodoItem
    removeHandler: (id: number) => void
}


export const TodoListItem: FC<ITodoItemProps> = ({task, removeHandler}) => {

    return <li>
        <Input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <Button children='X' onClick={() => removeHandler(task.id)}/>
    </li>
}