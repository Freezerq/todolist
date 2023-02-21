import {ResponseType} from "../api/todolistsAPI";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app/appReducer";

export const handleServerError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetwork = (error: any, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('idle'))
}