import React, {useEffect, useState} from 'react';
import {todolistsAPI, TodoListType, UpdateTaskModel} from "../api/todolistsAPI";

export default {
    title: 'API'
}


export const TodolistsApiStoriesGET = () => {
    const [state, setState] = useState<Array<TodoListType>>([]);

    useEffect(() => {
        todolistsAPI.getTodolists().then(res => {
            setState(res.data)
        })
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};


export const TodolistsApiStoriesPOST = () => {
    const [state, setState] = useState<any>();

    useEffect(() => {
        todolistsAPI.createTodolist('NEW TLLLLL').then(res => {
            console.log(res.data)
        })
    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};

export const TodolistsApiStoriesDELETE = () => {
    const [state, setState] = useState<any>();
    const todolistId = 'c4fd3dd2-b739-4bfd-ab18-c1cb1879500e'
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId).then(res => {
            console.log(res.status)
        })

    }, [])

    return (
        <div>
            check console
        </div>
    );
};


export const TodolistsApiStoriesPUT = () => {
    const [state, setState] = useState<any>();
    const todolistId = '925fff39-8410-42f2-a821-627a0130bd6d'
    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, '4L').then(res => {
            console.log(res.status)
        })

    }, [])

    return (
        <div>
            check console
        </div>
    );
};

export const TasksApiStoriesGet = () => {
    const [state, setState] = useState<any>();
    const todolistId = '2ecc9485-3525-4537-ae0c-1ee53c4eb41a'
    useEffect(() => {
        todolistsAPI.getTasks(todolistId).then(res => {
            setState(res.data.items)
        })

    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};

export const TasksApiStoriesDelete = () => {
    const [state, setState] = useState<any>();
    const todolistId = '2ecc9485-3525-4537-ae0c-1ee53c4eb41a'
    const taskId = ''
    useEffect(() => {
        todolistsAPI.deleteTask(todolistId, taskId).then(res => {
            console.log(res.data.data)
        })

    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};

export const TasksApiStoriesCreate = () => {
    const [state, setState] = useState<any>();
    const todolistId = '2ecc9485-3525-4537-ae0c-1ee53c4eb41a'
    const taskId = ''
    useEffect(() => {
        todolistsAPI.createTask(todolistId, 'TASK HUL').then(res => {
            console.log(res.data.data.item)
        })

    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};



export const TasksApiStoriesUpdate = () => {
    const [state, setState] = useState<any>();
    const todolistId = '2ecc9485-3525-4537-ae0c-1ee53c4eb41a'
    const taskId = 'c3aa163f-6e50-4d33-b714-dbbd6e6c9b5e'
    const task: UpdateTaskModel = {
        title: 'WP',
        description: '',
        status: 0,
        priority: 0,
        startDate: '',
        deadline: '',
    }
    useEffect(() => {
        todolistsAPI.updateTask(todolistId, taskId, task).then(res => {
            console.log(res.data)
        })

    }, [])

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    );
};



