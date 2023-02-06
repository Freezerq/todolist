import React, {useCallback} from "react";
import {FilterType} from "../App";
import "../App.css";


import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddItemForm from "./AddItemForm";
import {Task} from "./Task";
// 3
type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string, todoListId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterType) => void
    addTask: (text: string, todoListId: string) => void
    changeIsDone: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterType
    todolistId: string
    removeTodolist: (todoListId: string) => void
    taskTextChanged: (id: string, text: string, todoListId: string) => void
    changeTodolistTitle: (todoListId: string, newTitle: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
    let filteredTasks = props.tasks
    if (props.filter === "Completed") {
        filteredTasks = filteredTasks.filter(t => !t.isDone)
    }
    if (props.filter === "Active") {
        filteredTasks = filteredTasks.filter(t => t.isDone)
    }

    let tasksArray = filteredTasks.map((task, index) => {
            return <Task task={task} removeTask={props.removeTask}
                         todolistId={props.todolistId} changeIsDone={props.changeIsDone}
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
        <div>
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

                {/*<button className={props.filter === 'ShowAll' ? 'activeFilter' : ''}*/}
                {/*        onClick={onClickButtonHandlerAll}>All*/}
                {/*</button>*/}
                {/*<button className={props.filter === 'Completed' ? 'activeFilter' : ''}*/}
                {/*        onClick={onClickButtonHandlerCompleted}>Completed*/}
                {/*</button>*/}
                {/*<button className={props.filter === 'Active' ? 'activeFilter' : ''}*/}
                {/*        onClick={onClickButtonHandlerActive}>Active*/}
                {/*</button>*/}
            </div>
            <div><br/><br/></div>
            {/*отступ*/}

        </div>
    )
})

export default TodoList;


