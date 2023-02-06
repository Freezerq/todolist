import React from 'react';
import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    // },
} //as ComponentMeta<typeof AddItemForm>;

const callBack = action('Button was pressed inside a form')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={(text) => {callBack(text)}} />
}