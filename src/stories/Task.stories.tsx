import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TodoListItem} from "../components/ui/todolist/TodoListItem";
import React from "react";
import {ReduxStoreProviderDecorator} from "./decorators";
import {TaskPriorities, TaskStatuses} from "../types/task.types";

export default {
    title: 'Example/Task',
    component: TodoListItem,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TodoListItem>;

const Template: ComponentStory<typeof TodoListItem> = (args) => <TodoListItem {...args} />;

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    todoListId: 'todoListId1',
    task: {
        id: '1', status: TaskStatuses.COMPLETED, title: 'JS', description: '',
        completed: false, priority: TaskPriorities.MIDDLE, startDate: '', deadline: '',
        todoListId: '', order: 0, addedDate: ''
    }
};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    todoListId: 'todoListId1',
    task: {
        id: '1', status: TaskStatuses.NEW, title: 'TS', description: '',
        completed: false, priority: TaskPriorities.MIDDLE, startDate: '', deadline: '',
        todoListId: '', order: 0, addedDate: ''
    }
};

