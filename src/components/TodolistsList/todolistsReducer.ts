import {v1} from "uuid";
import {todolistsAPI, TodoListType} from "../../api/todolistsAPI";
import {Dispatch} from "redux";

// export const todolistId1 = v1()
// export const todolistId2 = v1()





//action creators
export const setTodolistsAC = (todolists: Array<TodoListType>) => ({type: "SET_TODOLISTS", todolists}) as const

export const deleteTodolistAC = (todolistId: string) => ({type: "DELETE_TODOLIST", todolistId: todolistId}) as const

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    todolistId,
    title
}) as const

export const addTodolistAC = (todolist: TodoListType) => ({type: "ADD_TODOLIST", todolist}) as const

export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => ({
    type: "CHANGE_TODOLIST_FILTER",
    todolistId,
    filter
}) as const


export const todolistsInitialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state: Array<TodolistDomainType> = todolistsInitialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "DELETE_TODOLIST":
            return state.filter(t => t.id !== action.todolistId)

        case "CHANGE_TODOLIST_TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)

        case "ADD_TODOLIST":
            return [{...action.todolist, filter: "ShowAll"}, ...state]

        case "CHANGE_TODOLIST_FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)

        case "SET_TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "ShowAll"}))

        default:
            return state
    }
}


export const setTodolistThunk = (dispatch: Dispatch<ActionTypes>) =>
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))

// export const setTodolistsTC = () => (dispatch: Dispatch<ActionTypes>) =>
//     todolistsAPI.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data))
//         })

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionTypes>) =>
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(deleteTodolistAC(todolistId))
        })

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionTypes>) =>
    todolistsAPI.createTodolist(title)
        .then((result) => {
            dispatch(addTodolistAC(result.data.data.item))
        })

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) =>
    todolistsAPI.updateTodolist(todolistId, title)
        .then((result) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })


//types
export type TodolistDomainType = TodoListType & {
    filter: FilterType
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionTypes =
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | AddTodolistActionType
    | DeleteTodolistActionType

export type FilterType = 'ShowAll' | 'Completed' | 'Active'