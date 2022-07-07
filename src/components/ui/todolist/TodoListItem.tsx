import React, {FC} from "react";
import {ITodoItem} from "./todolist.types";
import {Input} from "../form-elements/Input";
import {Button} from "../form-elements/Button";

interface ITodoItemProps {
    task: ITodoItem
    removeHandler: (id: string) => void
}


export const TodoListItem: FC<ITodoItemProps> = ({task, removeHandler}) => {
    const onRemoveHandler = () => {
        removeHandler(task.id)
    }

    return <li>
        <Input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <Button children='X' onClick={onRemoveHandler}/>
    </li>
}