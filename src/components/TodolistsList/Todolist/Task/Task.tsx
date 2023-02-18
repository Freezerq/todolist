import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "../../../../api/todolistsAPI";

type TaskPropsType = {
    task: TaskType
    deleteTask: (todoListId: string, taskId: string) => void
    todolistId: string
    updateTask: (taskId: string, todoListId: string, status: TaskStatuses) => void
    taskTextChanged: (id: string, text: string, todoListId: string) => void
}


export const Task = React.memo((props: TaskPropsType) => {


    const onClickRemove = useCallback(() =>  {
        props.deleteTask(props.todolistId, props.task.id)},
        [props.deleteTask, props.todolistId, props.task.id]
    )

    const onClickChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let st = props.task.status === 2? 1 : 2
        props.updateTask(props.task.id, props.todolistId, st)
    }, [props.updateTask, props.task.id, props.todolistId, props.task.status])

    const changeTask = useCallback((text: string) => {
        props.taskTextChanged(props.task.id, text, props.todolistId)
    }, [props.taskTextChanged, props.task.id, props.todolistId])


    return <li className={props.task.status === 2 ? 'isDone' : ''}>
        <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onClickChecked}/>

        <EditableSpan title={props.task.title} changeTask={changeTask} />

        <IconButton onClick={onClickRemove} aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    </li>
})