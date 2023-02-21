import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {TaskActionTypes, tasksReducer} from "../components/TodolistsList/tasksReducer";
import {TodolistActionTypes, todolistsReducer} from "../components/TodolistsList/todolistsReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppReducerActionsType, appReducer} from "./appReducer";

export const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer,
        app: appReducer
    }
)

export type AppStoreType = ReturnType<typeof store.getState>
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = ThunkDispatch<AppStoreType, unknown, AppActionTypes>

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppActionTypes = TodolistActionTypes | TaskActionTypes | AppReducerActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AnyAction>

export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector