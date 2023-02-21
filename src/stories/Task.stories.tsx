import React from 'react';
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../components/TodolistsList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolistsAPI";


export default {
    title: 'Task Component',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    // },
} //as ComponentMeta<typeof AddItemForm>;
const todolistId1 = '1'
const removeTaskCallBack = action('removeTaskCallBack was pressed')
const changeIsDoneCallBack = action('removeTaskCallBack was pressed')
const taskTextChangedCallBack = action('removeTaskCallBack was pressed')

export const TaskBaseExample = (props: any) => {
    return <>
        <Task task={ {title: "Eblanstvovat`", id: "Task Id - 2", status: TaskStatuses.New,
            todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
            description: '', order: 0, priority: TaskPriorities.High} } deleteTask={removeTaskCallBack}
              todolistId={'TodolistId1'} updateTask={changeIsDoneCallBack}
              taskTextChanged={taskTextChangedCallBack}
        />

        <Task task={ {title: "Hey", id: "Task Id - 666", status: TaskStatuses.New,
            todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
            description: '', order: 0, priority: TaskPriorities.High} } deleteTask={removeTaskCallBack}
              todolistId={'TodolistId2'} updateTask={changeIsDoneCallBack}
              taskTextChanged={taskTextChangedCallBack}
        />
    </>
}