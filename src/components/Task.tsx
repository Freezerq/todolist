import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../state/tasksReducer";
import {log} from "util";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    todolistId: string
    changeIsDone: (id: string, isDone: boolean, todoListId: string) => void
    taskTextChanged: (id: string, text: string, todoListId: string) => void
}


export const Task = React.memo((props: TaskPropsType) => {


    const onClickRemove = useCallback(() =>  {
        props.removeTask(props.task.id, props.todolistId)},
        [props.removeTask, props.task, props.todolistId]
    )

    const onClickChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeIsDone(props.task.id, e.currentTarget.checked, props.todolistId)
    }, [props.changeIsDone, props.task.id, props.todolistId])

    const changeTask = useCallback((text: string) => {
        props.taskTextChanged(props.task.id, text, props.todolistId)
    }, [props.taskTextChanged, props.task.id, props.todolistId])


    return <li className={props.task.isDone ? 'isDone' : ''}>
        <Checkbox checked={props.task.isDone} onChange={onClickChecked}/>

        <EditableSpan title={props.task.title} changeTask={changeTask} />

        <IconButton onClick={onClickRemove} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    </li>
})