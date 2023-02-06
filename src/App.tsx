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
    todolistsReducer,
}
    from "./state/todolistsReducer";
import {
    addTaskAC,
    changeIsDoneAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksInitialState,
    tasksReducer
}
    from "./state/tasksReducer";


export type FilterType = 'ShowAll' | 'Completed' | 'Active'

function App() {


    const [todolists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, todolistsInitialState)
    const [tasks, dispatchToTaskReducer] = useReducer(tasksReducer, tasksInitialState)


    function addTask(text: string, todoListId: string) {
        dispatchToTaskReducer(addTaskAC(text, todoListId))
    }


    const changeIsDone = (id: string, isDone: boolean, todoListId: string) => {
        dispatchToTaskReducer(changeIsDoneAC(id, todoListId, isDone))
    }

    const taskTextChanged = (id: string, text: string, todoListId: string) => {
        dispatchToTaskReducer(changeTaskTitleAC(id, todoListId, text))
    }

    function removeTask(id: string, todoListId: string) {
        dispatchToTaskReducer(removeTaskAC(id, todoListId))
    }


    const addTodoList = useCallback((title: string) => {
        dispatchToTaskReducer(addTodolistAC(title))
        dispatchToTodoListsReducer(addTodolistAC(title))
    }, [])

    function changeTodolistFilter(todolistId: string, filter: FilterType) {
        dispatchToTodoListsReducer(changeTodolistFilterAC(todolistId, filter))
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        dispatchToTodoListsReducer(changeTodolistTitleAC(todolistId, title))
    }

    function removeTodolist(todolistId: string) {
        dispatchToTodoListsReducer(removeTodolistACreator(todolistId))
    }


    return (

        <div className="App">
            <Container fixed>
                <ButtonAppBar/>
                <Grid container style={{paddingBottom: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container>
                    {
                        todolists.map((t) =>
                            <TodoList
                                title={t.title}
                                tasks={tasks[t.id]}
                                removeTask={removeTask}
                                changeTodolistFilter={changeTodolistFilter}
                                addTask={addTask}
                                changeIsDone={changeIsDone}
                                filter={t.filter}
                                todolistId={t.id}
                                removeTodolist={removeTodolist}
                                taskTextChanged={taskTextChanged}
                                changeTodolistTitle={changeTodolistTitle}
                            />)}
                </Grid>
            </Container>

        </div>
    );
}

export default App;


