import React, {useState} from 'react'
import styled from 'styled-components'
import {
    Container as TaskContainer,
    TextStyle as TaskTextStyle,
    taskState,
} from './Task'
import {useRecoilState, useRecoilCallback} from 'recoil'
import {tasksState} from './Tasks'

const InsertInput = styled.input`
    width: 100%;
    height: 100%;
    appearance: none;
    border: 0;
    background-color: transparent;
    outline: none;
    -webkit-appearance: textfield;
    ${TaskTextStyle};

    ::-webkit-search-decoration,
    ::-webkit-search-cancel-button {
        -webkit-appearance: none;
    }
`

export const Input: React.FC = () => {
    const [label, setLabel] = useState('')
    const [tasks] = useRecoilState(tasksState)
    const insertTask = useRecoilCallback(({set}) => {
        // set()/reset() callbacks to update the current global state. The provided Snapshot represents the state when the callback is called,
        // set atom values
        return (label: string) => {
            const newTaskId = tasks.length
            set(tasksState, [...tasks, newTaskId]) // adding new task as tasks.length, which is only one higher than current
            set(taskState(newTaskId), {
                label: label,
                complete: false,
            })
        }
    })

    return (
        <TaskContainer>
            <InsertInput
                placeholder="Insert a new task..."
                type="search"
                autoComplete="off"
                value={label}
                onChange={({currentTarget}) => {
                    setLabel(currentTarget.value)
                }}
                onKeyUp={({keyCode}) => {
                    if (keyCode === 13) {
                        insertTask(label)
                        setLabel('')
                    }
                }}
            />
        </TaskContainer>
    )
}
