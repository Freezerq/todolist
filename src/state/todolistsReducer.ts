import {FilterType} from "../App";
import {v1} from "uuid";

export const todolistId1 = v1()
export const todolistId2 = v1()

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}





export const todolistsInitialState: Array<TodolistType> = [
    {id: todolistId1, title: 'What To Learn', filter: 'ShowAll'},
    {id: todolistId2, title: 'What To Watch', filter: 'ShowAll'}
]

type ActionTypes = RemoveTodolistActionType | ChangeTodolistTitleActionType | AddTodolistActionType | ChangeTodolistFilterActionType


export type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE"
    todolistId: string
    title: string
}

export type AddTodolistActionType = {
    type: "ADD_TODOLIST"
    todolistId: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    todolistId: string
    filter: FilterType
}

export const removeTodolistACreator = (todolistId: string):RemoveTodolistActionType => {
    return {
        type: "REMOVE_TODOLIST",
        todolistId: todolistId
    }
}

export const changeTodolistTitleAC = (todolistId: string, title: string):ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        todolistId: todolistId,
        title: title
    }
}

export const addTodolistAC = (title: string):AddTodolistActionType => {
    return {
        type: "ADD_TODOLIST",
        todolistId: v1(),
        title: title,
    }
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterType):ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        todolistId: todolistId,
        filter: filter
    }
}

export const todolistsReducer = (state: Array<TodolistType> = todolistsInitialState, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(t => t.id !== action.todolistId)

        case "CHANGE_TODOLIST_TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)

        case "ADD_TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: "ShowAll"}]

        case "CHANGE_TODOLIST_FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)

        default:
            return state
    }

}