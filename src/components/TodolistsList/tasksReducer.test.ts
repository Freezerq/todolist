import {addTodolistAC, deleteTodolistAC, todolistId1, todolistId2} from "./todolistsReducer";
import {
    addTaskAC,
    updateTaskAC,
    changeTaskTitleAC,
    deleteTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasksReducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolistsAPI";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.New, completed: false,
                todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.High
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.New, completed: false,
                todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.High
            },
        ],
        [todolistId2]: [
            {
                id: v1(), title: "Anime", status: TaskStatuses.New, completed: false,
                todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.High
            },
            {
                id: v1(), title: "Фарго", status: TaskStatuses.New, completed: false,
                todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                description: '', order: 0, priority: TaskPriorities.High
            },
        ]
    }
})


test("REMOVE TASK TESTING", () => {

        const action = deleteTaskAC('2', todolistId2)
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId1].length).toBe(5)
        expect(endState[todolistId2].length).toBe(4)

    }
)


test("ADD TASK TESTING", () => {

        const startState: TasksStateType = {
            [todolistId1]: [
                {
                    id: v1(), title: "HTML&CSS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "JS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
            ],
            [todolistId2]: [
                {
                    id: v1(), title: "Anime", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "Фарго", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
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
                {
                    id: v1(), title: "HTML&CSS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "JS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
            ],
            [todolistId2]: [
                {
                    id: v1(), title: "Anime", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "Фарго", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
            ]
        }

        const action = updateTaskAC('1', todolistId2, true)
        const endState = tasksReducer(startState, action)

        expect(endState[todolistId1].length).toBe(5)
        expect(endState[todolistId1][0].completed).toBe(false)


        expect(endState[todolistId2][0].completed).toBe(true)
        expect(endState[todolistId2].length).toBe(5)

    }
)


test("CHANGING TITLE OF TASK TESTING", () => {

        const startState: TasksStateType = {
            [todolistId1]: [
                {
                    id: v1(), title: "HTML&CSS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "JS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
            ],
            [todolistId2]: [
                {
                    id: v1(), title: "Anime", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "Фарго", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
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
                {
                    id: v1(), title: "HTML&CSS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "JS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
            ],
            [todolistId2]: [
                {
                    id: v1(), title: "Anime", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "Фарго", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
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
                {
                    id: v1(), title: "HTML&CSS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "JS", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId1, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
            ],
            [todolistId2]: [
                {
                    id: v1(), title: "Anime", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
                {
                    id: v1(), title: "Фарго", status: TaskStatuses.New, completed: false,
                    todoListId: todolistId2, addedDate: '', startDate: '', deadline: '',
                    description: '', order: 0, priority: TaskPriorities.High
                },
            ]
        }
        const keysBeforeDelete = Object.keys(startState)
        expect(keysBeforeDelete.length).toBe(2)
        console.log([...keysBeforeDelete])

        const action = deleteTodolistAC(todolistId2)
        const endState = tasksReducer(startState, action)


        const keys = Object.keys(endState)
        expect(keys.length).toBe(1)
        console.log([...keys])

    }
)