import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC, deleteTodolistTC,
    FilterType,
    setTodolistThunk,
    TodolistDomainType
} from "./todolistsReducer";
import {addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from "./tasksReducer";
import {TaskStatuses} from "../../api/todolistsAPI";
import Grid from "@mui/material/Grid";
import AddItemForm from "../AddItemForm/AddItemForm";
import TodoList from "./Todolist/TodoList";

const TodolistsList = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppStoreType, Array<TodolistDomainType>>((store) => store.todolists)


    useEffect(() => {
        // dispatch(setTodolistsTC())
        setTodolistThunk(dispatch)

    }, [])


    const tasks = useSelector<AppStoreType, TasksStateType>((store) => store.tasks)

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(title, todoListId))
    }, [dispatch])

    const updateTask = useCallback((taskId: string, todoListId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(taskId, todoListId, {status}))
    }, [dispatch])

    const taskTextChanged = useCallback((id: string, title: string, todoListId: string) => {
        dispatch(updateTaskTC(id, todoListId, {title}))
    }, [dispatch])

    const deleteTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(deleteTaskTC(todoListId, taskId))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])


    return (
        <>
            <Grid container style={{paddingBottom: '20px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container>
                {todolists.map((t) =>

                    <TodoList
                        title={t.title}
                        tasks={tasks[t.id]}
                        filter={t.filter}
                        todolistId={t.id}
                        deleteTask={deleteTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        updateTask={updateTask}
                        removeTodolist={removeTodolist}
                        taskTextChanged={taskTextChanged}
                        changeTodolistTitle={changeTodolistTitle}
                    />)}
            </Grid>
        </>
    )
}
export default TodolistsList;