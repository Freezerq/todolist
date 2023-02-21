import React, {useCallback, useEffect} from "react";
import "../../../app/App.css";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddItemForm from "../../AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolistsAPI";
import {FilterType, TodolistDomainType} from "../todolistsReducer";
import {setTasksTC} from "../tasksReducer";
import {useAppDispatch} from "../../../app/store";
// 3


type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    deleteTask: (todoListId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterType) => void
    addTask: (text: string, todoListId: string) => void
    updateTask: (taskId: string, todoListId: string, status: TaskStatuses) => void
    removeTodolist: (todoListId: string) => void
    taskTextChanged: (id: string, text: string, todoListId: string) => void
    changeTodolistTitle: (todoListId: string, newTitle: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasksTC(props.todolist.id))
    }, [])


    let filteredTasks = props.tasks
    if (props.todolist.filter === "Completed") {
        filteredTasks = filteredTasks.filter(t => t.status !== TaskStatuses.Completed)
    }
    if (props.todolist.filter === "Active") {
        filteredTasks = filteredTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    let tasksArray = filteredTasks.map((task, index) => {
            return <Task task={task} deleteTask={props.deleteTask}
                         todolistId={props.todolist.id} updateTask={props.updateTask}
                         taskTextChanged={props.taskTextChanged}
                         key={index}/>
        }
    )


    const addTask = useCallback((value: string) => {
        props.addTask(value, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.todolist.id, props.changeTodolistTitle])

    const onClickButtonHandlerAll = useCallback(() => {
        props.changeTodolistFilter(props.todolist.id, 'ShowAll')
    }, [])

    const onClickButtonHandlerActive = useCallback(() => {
        props.changeTodolistFilter(props.todolist.id, 'Active')
    }, [])

    const onClickButtonHandlerCompleted = useCallback(() => {
        props.changeTodolistFilter(props.todolist.id, 'Completed')
    }, [])


    const removeTodoList = () => {
        props.removeTodolist(props.todolist.id)
    }


    return (
        <div style={{marginRight: '10px'}}>
            <div>
                <IconButton aria-label="delete" onClick={removeTodoList} disabled={props.todolist.entityStatus === "loading"}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <strong>
                <EditableSpan title={props.todolist.title} changeTask={changeTodoListTitle}
                              disabled={props.todolist.entityStatus === "loading"}/>
            </strong>
            <div>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            </div>
            <ul>
                {tasksArray}
            </ul>
            <div>
                <Button variant={props.todolist.filter === 'ShowAll' ? 'contained' : 'outlined'}
                        onClick={onClickButtonHandlerAll} color='success'>All</Button>
                <Button variant={props.todolist.filter === 'Completed' ? 'contained' : 'outlined'}
                        onClick={onClickButtonHandlerCompleted} color='error'>Active</Button>
                <Button variant={props.todolist.filter === 'Active' ? 'contained' : 'outlined'}
                        onClick={onClickButtonHandlerActive} color='secondary'>Completed</Button>

            </div>
            <div><br/><br/></div>
        </div>
    )
})

export default TodoList;


