import {addTodolistAC, removeTodolistACreator, todolistId1, todolistId2} from "./todolistsReducer";
import {
    addTaskAC,
    changeIsDoneAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasksReducer";


test("REMOVE TASK TESTING", () => {
        const startState: TasksStateType = {
            [todolistId1]: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "Redax", isDone: true},
                {id: '5', title: "VanillaJs", isDone: false},
            ],
            [todolistId2]: [
                {id: '1', title: "Anime", isDone: false},
                {id: '2', title: "Фарго", isDone: true},
                {id: '3', title: "Форсаж", isDone: true},
                {id: '4', title: "Avatar", isDone: true},
                {id: '5', title: "UFC", isDone: false},
            ]
        }

        const action = removeTaskAC('2', todolistId2)
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId1].length).toBe(5)
        expect(endState[todolistId2].length).toBe(4)

    }
)


test("ADD TASK TESTING", () => {

        const startState: TasksStateType = {
            [todolistId1]: [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "Redax", isDone: true},
                {id: '5', title: "VanillaJs", isDone: false},
            ],
            [todolistId2]: [
                {id: '1', title: "Anime", isDone: false},
                {id: '2', title: "Фарго", isDone: true},
                {id: '3', title: "Форсаж", isDone: true},
                {id: '4', title: "Avatar", isDone: true},
                {id: '5', title: "UFC", isDone: false},
            ]
        }

        const action = addTaskAC('TEST', todolistId2)
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId1].length).toBe(5)
        expect(endState[todolistId1][0].title).not.toBe('TEST')


        expect(endState[todolistId2].length).toBe(6)
        expect(endState[todolistId2][0].title).toBe('TEST')

    }
)


test("CHANGING IS DONE TESTING", () => {

        const startState: TasksStateType = {
            [todolistId1]: [
                {id: '1', title: "HTML&CSS", isDone: false},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "Redax", isDone: true},
                {id: '5', title: "VanillaJs", isDone: false},
            ],
            [todolistId2]: [
                {id: '1', title: "Anime", isDone: false},
                {id: '2', title: "Фарго", isDone: true},
                {id: '3', title: "Форсаж", isDone: true},
                {id: '4', title: "Avatar", isDone: true},
                {id: '5', title: "UFC", isDone: false},
            ]
        }

        const action = changeIsDoneAC('1', todolistId2, true)
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId1].length).toBe(5)
        expect(endState[todolistId1][0].isDone).toBe(false)


        expect(endState[todolistId2][0].isDone).toBe(true)
        expect(endState[todolistId2].length).toBe(5)

    }
)


test("CHANGING TITLE OF TASK TESTING", () => {

        const startState: TasksStateType = {
            [todolistId1]: [
                {id: '1', title: "HTML&CSS", isDone: false},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "Redax", isDone: true},
                {id: '5', title: "VanillaJs", isDone: false},
            ],
            [todolistId2]: [
                {id: '1', title: "Anime", isDone: false},
                {id: '2', title: "Фарго", isDone: true},
                {id: '3', title: "Форсаж", isDone: true},
                {id: '4', title: "Avatar", isDone: true},
                {id: '5', title: "UFC", isDone: false},
            ]
        }

        const action = changeTaskTitleAC('1', todolistId2, "TESTING")
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId1][0].title).toBe("HTML&CSS")
        expect(endState[todolistId1].length).toBe(5)


        expect(endState[todolistId2][0].title).toBe('TESTING')
        expect(endState[todolistId2].length).toBe(5)

    }
)

test("NEW TODOLIST WAS ADDED, SO NEW TASK ARRAY SHOULD BE ADDED TOO", () => {

        const startState: TasksStateType = {
            [todolistId1]: [
                {id: '1', title: "HTML&CSS", isDone: false},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
                {id: '4', title: "Redax", isDone: true},
                {id: '5', title: "VanillaJs", isDone: false},
            ],
            [todolistId2]: [
                {id: '1', title: "Anime", isDone: false},
                {id: '2', title: "Фарго", isDone: true},
                {id: '3', title: "Форсаж", isDone: true},
                {id: '4', title: "Avatar", isDone: true},
                {id: '5', title: "UFC", isDone: false},
            ]
        }

        const action = addTodolistAC('YOYO')
        const endState = tasksReducer(startState, action)

        // expect(endState['v1()'].length).toBe(0)
        expect(endState[todolistId1].length).toBe(5)


        const keys = Object.keys(endState)
        expect(keys.length).toBe(3)
        keys.map(k => k !== todolistId1 && k !== todolistId2)

    }
)

test("PROPERTY WITH TODOLISTID SHOULD BE DELETED", () => {

        const startState: TasksStateType = {
            [todolistId1]: [
                {id: '1', title: "HTML&CSS", isDone: false},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},
            ],
            [todolistId2]: [
                {id: '1', title: "Anime", isDone: false},
                {id: '2', title: "Фарго", isDone: true},
                {id: '5', title: "UFC", isDone: false},
            ]
        }
        const keysBeforeDelete = Object.keys(startState)
        expect(keysBeforeDelete.length).toBe(2)
        console.log([...keysBeforeDelete])

        const action = removeTodolistACreator(todolistId2)
        const endState = tasksReducer(startState, action)


        const keys = Object.keys(endState)
        expect(keys.length).toBe(1)
        console.log([...keys])

    }
)