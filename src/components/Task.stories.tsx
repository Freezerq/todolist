import React from 'react';
import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";


export default {
    title: 'Task Component',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    // },
} //as ComponentMeta<typeof AddItemForm>;

const removeTaskCallBack = action('removeTaskCallBack was pressed')
const changeIsDoneCallBack = action('removeTaskCallBack was pressed')
const taskTextChangedCallBack = action('removeTaskCallBack was pressed')

export const TaskBaseExample = (props: any) => {
    return <>
        <Task task={ {title: "Eblanstvovat`", id: "Task Id - 2", isDone: false } } removeTask={removeTaskCallBack}
              todolistId={'TodolistId1'} changeIsDone={changeIsDoneCallBack}
              taskTextChanged={taskTextChangedCallBack}
        />

        <Task task={ {title: "Hey", id: "Task Id - 666", isDone: true } } removeTask={removeTaskCallBack}
              todolistId={'TodolistId2'} changeIsDone={changeIsDoneCallBack}
              taskTextChanged={taskTextChangedCallBack}
        />
    </>
}