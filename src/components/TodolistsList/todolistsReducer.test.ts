import {setTodolistsAC, TodolistDomainType, todolistsReducer} from "./todolistsReducer";

let startState: Array<TodolistDomainType> = []

beforeEach( () => {
    let todolistId1 = "11111"
    let todolistId2 = "22222"
    startState = [
        {id: todolistId1, title: 'What To Learn', filter: 'ShowAll', order: 0, addedDate: '', entityStatus: "idle"},
        {id: todolistId2, title: 'What To Watch', filter: 'ShowAll', order: 0, addedDate: '', entityStatus: "idle"}
    ]
})

test( "Set Todolists to start state", () => {
    let endState: Array<TodolistDomainType> = todolistsReducer([], setTodolistsAC(startState))
    expect(endState.length === 2)
    expect(endState[0].title === 'What To Learn')
    expect(startState !== endState)
    expect(startState[0].filter === 'ShowAll')
})




export {}