import React, {ChangeEvent} from "react";
import {filterType} from "../App";
import "../App.css";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
// 3
type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTask: (id: string, todoListId: string) => void
    setFilter: (value: filterType, todolistId: string) => void
    addTask: (text: string, todoListId: string) => void
    changeIsDone: (id: string, isDone: boolean, todoListId: string) => void
    filter: filterType
    todolistId: string
    removeTodoList: (todoListId: string) => void
    taskTextChanged: (id: string, text: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

const TodoList = (props: TodoListPropsType) => {


    let tasksArray = props.tasks.map(task => {

            const onClickRemove = () => props.deleteTask(task.id, props.todolistId)

            const onClickChecked = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeIsDone(task.id, e.currentTarget.checked, props.todolistId)
            }

            const changeTask = (text: string) => {
                props.taskTextChanged(task.id, text, props.todolistId)
            }

            return (
                <li key={task.id} className={task.isDone ? 'isDone' : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={onClickChecked}/>
                    <EditableSpan title={task.title} changeTask={changeTask}/>
                    <button onClick={onClickRemove}>x</button>
                </li>
            )
        }
    )

    function addTask(value: string) {
        props.addTask(value, props.todolistId)
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todolistId, newTitle)
    }



    const onClickButtonHandlerAll = () => props.setFilter('ShowAll', props.todolistId)
    const onClickButtonHandlerActive = () => props.setFilter('Active', props.todolistId);
    const onClickButtonHandlerCompleted = () => props.setFilter('Completed', props.todolistId)

    const removeTodoList = () => {
        props.removeTodoList(props.todolistId)
    }

    return (
        <div>
            <div>
                <button onClick={removeTodoList}>x</button>
            </div>
            <strong><EditableSpan title={props.title} changeTask={changeTodoListTitle}/></strong>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <ul>
                {tasksArray}
            </ul>
            <div>
                <button className={props.filter === 'ShowAll' ? 'activeFilter' : ''}
                        onClick={onClickButtonHandlerAll}>All
                </button>
                <button className={props.filter === 'Completed' ? 'activeFilter' : ''}
                        onClick={onClickButtonHandlerCompleted}>Completed
                </button>
                <button className={props.filter === 'Active' ? 'activeFilter' : ''}
                        onClick={onClickButtonHandlerActive}>Active
                </button>
            </div>
            <div><br/><br/></div>
            {/*отступ*/}

        </div>
    )
}

export default TodoList;

