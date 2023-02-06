import {combineReducers, legacy_createStore as createStore} from 'redux'
import {tasksReducer, TasksStateType, TaskType} from "./tasksReducer";
import {todolistsInitialState, todolistsReducer, TodolistType} from "./todolistsReducer";

export const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)


export type AppStoreType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store