import {todolistsAPI, TodoListType} from "../../api/todolistsAPI";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatusAC} from "../../app/appReducer";


//action creators
export const setTodolistsAC = (todolists: Array<TodoListType>) =>
    ({type: "SET_TODOLISTS", todolists} as const)

export const deleteTodolistAC = (todolistId: string) =>
    ({type: "DELETE_TODOLIST", todolistId: todolistId} as const)

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: "CHANGE_TODOLIST_TITLE", todolistId, title} as const)

export const addTodolistAC = (todolist: TodoListType) =>
    ({type: "ADD_TODOLIST", todolist} as const)

export const setTodolistLoadingAC = (status: RequestStatusType, todolistId: string) =>
    ({type: "SET_TODOLIST_LOADING", status, todolistId}) as const

export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) =>
    ({type: "CHANGE_TODOLIST_FILTER", todolistId, filter} as const)


export const todolistsInitialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state: Array<TodolistDomainType> = todolistsInitialState, action: TodolistActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case "DELETE_TODOLIST":
            return state.filter(t => t.id !== action.todolistId)

        case "CHANGE_TODOLIST_TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)

        case "ADD_TODOLIST":
            return [{...action.todolist, filter: "ShowAll", entityStatus: "idle"}, ...state]

        case "CHANGE_TODOLIST_FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)

        case "SET_TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "ShowAll", entityStatus: "idle"}))

        case "SET_TODOLIST_LOADING":
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

export const setTodolistTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC('idle'))
            dispatch(setTodolistsAC(res.data))
        })
}


// export const setTodolistsTC = () => (dispatch: Dispatch<ActionTypes>) =>
//     todolistsAPI.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data))
//         })

export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodolistLoadingAC('loading', todolistId))
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(setAppStatusAC('idle'))
            dispatch(deleteTodolistAC(todolistId))
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then((result) => {
            dispatch(setAppStatusAC('idle'))
            dispatch(addTodolistAC(result.data.data.item))
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodolistLoadingAC('loading', todolistId))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(setAppStatusAC('idle'))
            dispatch(setTodolistLoadingAC('idle', todolistId))
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}

//types
export type TodolistDomainType = TodoListType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistActionTypes =
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | AddTodolistActionType
    | DeleteTodolistActionType
    | ReturnType<typeof setTodolistLoadingAC>

export type FilterType = 'ShowAll' | 'Completed' | 'Active'