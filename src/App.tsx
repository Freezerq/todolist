import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import todoList from "./components/TodoList";


export type TodolistType = {
    id: string
    title: string
    filter: filterType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type filterType = 'ShowAll' | 'Completed' | 'Active'

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redax", isDone: true},
            {id: v1(), title: "VanillaJs", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Anime", isDone: false},
            {id: v1(), title: "Фарго", isDone: true},
            {id: v1(), title: "Форсаж", isDone: true},
            {id: v1(), title: "Avatar", isDone: true},
            {id: v1(), title: "UFC", isDone: false},
        ]
    })


    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What To Learn', filter: 'ShowAll'},
        {id: todolistId2, title: 'What To Watch', filter: 'ShowAll'}
    ])


    function addTask(text: string, todoListId: string) {
        let newTask = {id: v1(), title: text, isDone: false}
        tasks[todoListId].push(newTask)
        setTasks({...tasks})
    }


    const changeIsDone = (id: string, isDone: boolean, todoListId: string) => {
        let newTask = tasks[todoListId].find(t => t.id === id)
        if (newTask) {
            newTask.isDone = isDone;
            setTasks({...tasks})
        }
    }

    const taskTextChanged = (id: string, text: string, todoListId: string) => {
        let newTask = tasks[todoListId].find(t => t.id === id)
        console.log(text)
        if (newTask) {
            newTask.title = text;
            setTasks({...tasks})
        }
    }

    function deleteTask(id: string, todoListId: string) {
        tasks[todoListId] = tasks[todoListId].filter(task => task.id !== id)
        setTasks({...tasks})
    }

    function removeTodoList(todolistId: string) {
        let filteredTodolists = todolists.filter(t => t.id !== todolistId)
        setTodolists([...filteredTodolists])
        delete tasks[todolistId]
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        let findTodoList = todolists.find(tl => tl.id === todoListId)
        if (findTodoList) {
            findTodoList.title = newTitle
            setTodolists([...todolists])
        }

    }

    // function addTodoList(tl: TodolistType) {
    //     setTodolists([...todolists, tl])
    //     let copyTasks = {...tasks}
    //     copyTasks[tl.id] = [{id: v1(), title: "First task", isDone: false}]
    //     setTasks({...copyTasks})
    // }

    function addTodoList(text: string) {
        let todoList: TodolistType = {
            id: v1(),
            title: text,
            filter: "ShowAll"
        }
        setTodolists([...todolists, todoList])
        setTasks({
            ...tasks,
            [todoList.id]: []
        })
    }


    return (
        <div className="App">

            {
                todolists.map(t => {
                    let filteredTasks = [...tasks[t.id]]

                    let setFilter = (value: filterType, todolistId: string) => {
                        const todolist = todolists.find(t => t.id === todolistId)
                        if (todolist) {
                            todolist.filter = value
                            setTodolists([...todolists])
                        }
                    }
                    switch (t.filter) {
                        case 'ShowAll': {
                            break;
                        }
                        case 'Completed': {
                            filteredTasks = filteredTasks.filter(t => t.isDone)
                            break;
                        }
                        case 'Active': {
                            filteredTasks = filteredTasks.filter(t => !t.isDone)
                            break;
                        }
                    }

                    return <TodoList key={t.id}
                                     title={t.title}
                                     filter={t.filter}
                                     todolistId={t.id}
                                     tasks={filteredTasks}
                                     deleteTask={deleteTask}
                                     setFilter={setFilter}
                                     addTask={addTask}
                                     changeIsDone={changeIsDone}
                                     removeTodoList={removeTodoList}
                                     taskTextChanged={taskTextChanged}
                                     changeTodoListTitle={changeTodoListTitle}
                    />
                })}
            <div><AddItemForm addItem={addTodoList}/></div>
        </div>
    );
}

export default App;


