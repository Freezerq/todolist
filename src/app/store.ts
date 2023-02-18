import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {tasksReducer} from "../components/TodolistsList/tasksReducer";
import {todolistsReducer} from "../components/TodolistsList/todolistsReducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export type AppStoreType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store