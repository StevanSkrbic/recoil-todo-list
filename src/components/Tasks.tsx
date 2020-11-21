import React from 'react'
import {atom, useRecoilValue} from 'recoil'
import {Task} from './Task'

export const tasksState = atom<number[]>({
    key: 'tasks',
    default: [], // array of numerical ids
})

export const Tasks: React.FC = () => {
    const tasks = useRecoilValue(tasksState)

    return (
        <div>
            {tasks.map((id) => (
                <Task id={id} key={id} />
            ))}
        </div>
    )
}
