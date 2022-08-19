import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AddItemForm} from "../components/ui/todolist/AddItemForm";

export default {
    title: 'Example/AddItemForm',
    component: AddItemForm,
    argTypes: {addItem: {action: 'clicked'}},
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormTask = Template.bind({});
AddItemFormTask.args = {
    placeholder: 'Add new task',
};

export const AddItemFormTodoList = Template.bind({});
AddItemFormTodoList.args = {
    placeholder: 'Add new todo list',
};
