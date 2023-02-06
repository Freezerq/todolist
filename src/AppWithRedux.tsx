import React, {useCallback, useReducer} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddItemForm from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container} from "@mui/material";
import Grid from '@mui/material/Grid';
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistACreator,
    todolistsInitialState,
    todolistsReducer, TodolistType,
}
    from "./state/todolistsReducer";
import {
    addTaskAC,
    changeIsDoneAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksInitialState,
    tasksReducer, TasksStateType
}
    from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./state/store";


export type FilterType = 'ShowAll' | 'Completed' | 'Active'

function AppWithRedux() {


    const dispatch = useDispatch()
    const todolists = useSelector<AppStoreType, Array<TodolistType>>((store) => store.todolists)

    const tasks = useSelector<AppStoreType, TasksStateType>((store) => store.tasks)

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const addTask = useCallback((text: string, todoListId: string) => {
        dispatch(addTaskAC(text, todoListId))
    }, [dispatch])

    const changeIsDone = useCallback((id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeIsDoneAC(id, todoListId, isDone))
    }, [dispatch])

    const taskTextChanged = useCallback((id: string, text: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(id, todoListId, text))
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListId: string)  => {
        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch])

    const changeTodolistFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistACreator(todolistId))
    }, [dispatch])


    return (

        <div className="App">
            <Container fixed>

                <ButtonAppBar/>

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
                            removeTask={removeTask}
                            changeTodolistFilter={changeTodolistFilter}
                            addTask={addTask}
                            changeIsDone={changeIsDone}
                            removeTodolist={removeTodolist}
                            taskTextChanged={taskTextChanged}
                            changeTodolistTitle={changeTodolistTitle}
                        />)}
                </Grid>


            </Container>

        </div>
    );
}

export default AppWithRedux;


