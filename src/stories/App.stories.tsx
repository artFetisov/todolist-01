import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TodoListItem} from "../components/ui/todolist/TodoListItem";
import React from "react";
import {ReduxStoreProviderDecorator} from "./decorators";
import {Home} from "../components/pages/home/Home";

export default {
    title: 'Example/App',
    component: Home,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

export const App = Template.bind({});
App.args = {};

