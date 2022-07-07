import React, {FC} from "react";
import {Heading} from "../heading/Heading";
import {ITodoItem} from "./todolist.types";
import {TodoListItem} from "./TodoListItem";
import {Button} from "../form-elements/Button";
import {FilterValuesType} from "../../pages/home/Home";
import {AddTaskForm} from "./AddTaskForm";

interface ITodoListProps {
    title: string
    tasks: ITodoItem[]
    removeHandler: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodoList: FC<ITodoListProps> = ({title, tasks, removeHandler, changeFilter, addTask}) => {
    const onAllClickhandler = () => {
        changeFilter('all')
    }

    const onActiveClickhandler = () => {
        changeFilter('active')
    }

    const onCompletedClickhandler = () => {
        changeFilter('completed')
    }


    return <div className="App">
        <div>
            <Heading title={title}/>
            <AddTaskForm addTask={addTask}/>
            <ul>
                {tasks ? tasks.map(task => <TodoListItem task={task} key={task.id} removeHandler={removeHandler}/>) :
                    <div>Tasks not found...</div>}
            </ul>
            <div>
                <Button children="All" onClick={onAllClickhandler}/>
                <Button children="Active" onClick={onActiveClickhandler}/>
                <Button children="Completed" onClick={onCompletedClickhandler}/>
            </div>
        </div>
    </div>
}