//app-reducer.tsx


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null
}

type InitialStateType = {
    status: RequestStatusType,
    error: null | string
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_ERROR":
            return {...state, error: action.error}
        case "SET_STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppErrorAC = (error: null | string) => ({type: 'SET_ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET_STATUS', status} as const)

export type AppReducerActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
