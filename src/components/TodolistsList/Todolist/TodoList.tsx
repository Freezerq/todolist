import React, {useCallback, useEffect} from "react";
import "../../../app/App.css";


import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddItemForm from "../../AddItemForm/AddItemForm";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType, todolistsAPI} from "../../../api/todolistsAPI";
import {FilterType, setTodolistThunk} from "../todolistsReducer";
import {setTasksAC, setTasksTC} from "../tasksReducer";
import {useDispatch} from "react-redux";
// 3


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (todoListId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterType) => void
    addTask: (text: string, todoListId: string) => void
    updateTask: (taskId: string, todoListId: string, status: TaskStatuses) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todoListId: string) => void
    taskTextChanged: (id: string, text: string, todoListId: string) => void
    changeTodolistTitle: (todoListId: string, newTitle: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {


    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(setTasksTC(props.todolistId))
        dispatch(setTasksTC(props.todolistId))
    }, [])



    let filteredTasks = props.tasks
    if (props.filter === "Completed") {
        filteredTasks = filteredTasks.filter(t => !t.completed)
    }
    if (props.filter === "Active") {
        filteredTasks = filteredTasks.filter(t => t.completed)
    }

    let tasksArray = filteredTasks.map((task, index) => {
            return <Task task={task} deleteTask={props.deleteTask}
                         todolistId={props.todolistId} updateTask={props.updateTask}
                         taskTextChanged={props.taskTextChanged}
                         key={index}/>
        }
    )


    const addTask = useCallback((value: string) => {
        props.addTask(value, props.todolistId)
    }, [props.addTask, props.todolistId])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    }, [props.todolistId, props.changeTodolistTitle])

    const onClickButtonHandlerAll = useCallback(() => {
        props.changeTodolistFilter(props.todolistId, 'ShowAll')
    }, [])

    const onClickButtonHandlerActive = useCallback(() => {
        props.changeTodolistFilter(props.todolistId, 'Active')
    }, [])

    const onClickButtonHandlerCompleted = useCallback(() => {
        props.changeTodolistFilter(props.todolistId, 'Completed')
    }, [])


    const removeTodoList = () => {
        props.removeTodolist(props.todolistId)
    }


    return (
        <div style={{marginRight: '10px'}}>
            <div>
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <strong>
                <EditableSpan title={props.title} changeTask={changeTodoListTitle}/>
            </strong>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksArray}
            </ul>
            <div>
                <Button variant={props.filter === 'ShowAll' ? 'contained' : 'outlined'}
                        onClick={onClickButtonHandlerAll} color='success'>All</Button>
                <Button variant={props.filter === 'Completed' ? 'contained' : 'outlined'}
                        onClick={onClickButtonHandlerCompleted} color='error'>Active</Button>
                <Button variant={props.filter === 'Active' ? 'contained' : 'outlined'}
                        onClick={onClickButtonHandlerActive} color='secondary'>Completed</Button>

            </div>
            <div><br/><br/></div>
        </div>
    )
})

export default TodoList;


