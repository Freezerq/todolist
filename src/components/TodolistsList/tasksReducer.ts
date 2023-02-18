import {AddTodolistActionType, DeleteTodolistActionType, SetTodolistsActionType} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModel} from "../../api/todolistsAPI";
import {Dispatch} from "redux";
import {AppStoreType} from "../../app/store";

//action creators
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: "SET_TASKS", tasks, todolistId} as const)

export const deleteTaskAC = (todolistId: string, taskId: string) =>
    ({type: "DELETE_TASK", taskId, todolistId} as const)

export const addTaskAC = (task: TaskType) =>
    ({type: "ADD_TASK", task: task} as const)

export const updateTaskAC = (taskId: string, todoListId: string, model: UpdateDomainTaskModelType) =>
    ({type: "UPDATE_TASK", taskId, todoListId, model} as const)

//reducer
export const tasksInitialState: TasksStateType = {}
export const tasksReducer = (state: TasksStateType = tasksInitialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "DELETE_TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}

        case "ADD_TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case "UPDATE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        case "ADD_TODOLIST":
            return {...state, [action.todolist.id]: []}

        case "DELETE_TODOLIST":
            return {...state, [action.todolistId]: state[action.todolistId].filter(tl => tl.id !== action.todolistId)}

        case "SET_TODOLISTS": {
            const copyState = {...state}
            action.todolists.map(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case "SET_TASKS":
            return {...state, [action.todolistId]: action.tasks}

        default:
            return state

    }
}

//thunks
export const setTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(() => {
                dispatch(deleteTaskAC(todolistId, taskId))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<ActionTypes>) => {
        todolistsAPI.createTask(todolistId, title)
            .then((result) => {
                const task = result.data.data.item
                dispatch(addTaskAC(task))
            })
    }
}



export const updateTaskTC = (taskId: string, todoListId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch<ActionTypes>, getState: () => AppStoreType) => {
        const state = getState();
        const task = state.tasks[todoListId].find(task => task.id === taskId)

        if (task) {
            const apiModel: UpdateTaskModel = {
                title: task.title,
                priority: task.priority,
                deadline: task.deadline,
                description: task.description,
                startDate: task.startDate,
                status: task.status,
                ...domainModel
            }
            todolistsAPI.updateTask(todoListId, taskId, apiModel)
                .then((result) => {
                    dispatch(updateTaskAC(taskId, todoListId, result.data.data.item))
                })
        }
    }
}

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


type ActionTypes =
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | DeleteTodolistActionType
    | SetTodolistsActionType


export type TasksStateType = {
    [key: string]: Array<TaskType>
}
