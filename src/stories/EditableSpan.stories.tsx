import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {EditableSpan} from "../components/ui/todolist/EditableSpan";

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
    argTypes: {changeTitleHandler: {action: 'changed'}},
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    title: 'Buy strings',
};

export const EditableHeadingExample = Template.bind({});
EditableHeadingExample.args = {
    title: 'Buy strings',
    isHeading: true
};
