import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistId1,
    todolistId2,
    TodolistType
} from "./todolistsReducer";
import {v1} from "uuid";




export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksInitialState:TasksStateType  = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redax", isDone: true},
        {id: v1(), title: "VanillaJs", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "Anime", isDone: false},
        {id: v1(), title: "Фарго", isDone: true},
        {id: v1(), title: "Форсаж", isDone: true},
        {id: v1(), title: "Avatar", isDone: true},
        {id: v1(), title: "UFC", isDone: false},
    ]
}

type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskId: string
    todoListId: string
}

export const removeTaskAC = (taskId: string, todoListId: string):RemoveTaskActionType => {
    return {
        type: "REMOVE_TASK",
        taskId: taskId,
        todoListId: todoListId
    }
}

type AddTaskActionType = {
    type: "ADD_TASK"
    title: string
    todoListId: string
}


export const addTaskAC = (title: string, todoListId: string):AddTaskActionType => {
    return {

        type: "ADD_TASK",
        title: title,
        todoListId: todoListId
    }
}



type ChangeIsDoneActionType = {
    type: "CHANGE_IS_DONE"
    taskId: string
    todoListId: string
    isDone: boolean
}


export const changeIsDoneAC = (taskId: string, todoListId: string, isDone: boolean):ChangeIsDoneActionType => {
    return {
        type: "CHANGE_IS_DONE",
        taskId: taskId,
        todoListId: todoListId,
        isDone: isDone
    }
}


type ChangeTaskTitleActionType = {
    type: "CHANGE_TITLE"
    taskId: string
    todoListId: string
    title: string
}


export const changeTaskTitleAC = (taskId: string, todoListId: string, title: string):ChangeTaskTitleActionType => {
    return {
        type: "CHANGE_TITLE",
        taskId: taskId,
        todoListId: todoListId,
        title: title
    }
}

type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeIsDoneActionType | ChangeTaskTitleActionType |
AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType = tasksInitialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
            }

        case "ADD_TASK":
            return {
                ...state,
                [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
            }

        case "CHANGE_IS_DONE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
            }

        case "CHANGE_TITLE":
            console.log(action.title)

            let copy = {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => task.id === action.taskId ? {...task, title: action.title} : task)
            }
            console.log(copy)

            return copy
        case "ADD_TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE_TODOLIST":
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        default:
            return state

    }

}
