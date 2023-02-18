import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../TodolistsList/Todolist/Task/Task";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}

const changeCallBack = action('changeCallBack was pressed')


export const EditableSpanBaseExample = (props: any) => {
    return <>
        <EditableSpan title={'RAZ RAZ'} changeTask={changeCallBack}/>
        </>
}