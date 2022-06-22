import React, {FC} from "react";
import {ITodoItem} from "./todolist.interface";
import {Input} from "../form-elements/Input";

export const TodoListItem: FC<{ task: ITodoItem }> = ({task: {title, isDone}}) => {

    return <li>
        <Input type="checkbox" checked={isDone}/>
        <span>{title}</span>
    </li>
}