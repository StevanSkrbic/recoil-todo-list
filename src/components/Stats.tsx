import React from 'react'
import {Card} from './Card'
import styled from 'styled-components'
import {selector, useRecoilValue} from 'recoil'
import {tasksState} from './Tasks'
import {taskState} from './Task'

const StatContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme.text};
`

const StatValue = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 5px;
`

const StatLabel = styled.div`
    font-size: 11px;
    text-transform: uppercase;
`

export const Stat: React.FC<{label: string; value: string | number}> = ({
    label,
    value,
}) => {
    return (
        <StatContainer>
            <StatValue>{value}</StatValue>
            <StatLabel>{label}</StatLabel>
        </StatContainer>
    )
}

const Divider = styled.div`
    width: 1px;
    height: 42px;
    background-color: ${(props) => props.theme.text};
    opacity: 0.3;
`

export const Container = styled(Card)`
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px;
`

export const tasksCompleteSelector = selector({ // each time I enter or one of the tasks changes our selectors run
    key: 'tasksComplete',
    get: ({get}) => { // returns recoil value
        const tasksIds = get(tasksState) // will take the value of tasksState atom
        const tasks = tasksIds.map((id) => {
            return get(taskState(id)) // will take the value of taskState atomFamily by id
        })
        return tasks.filter(task => task.complete).length
    },
})

const tasksRemaningSelector = selector({ // each time I enter or one of the tasks changes our selectors run
    key: 'tasksRemaining',
    get: ({get}) => {
        const tasksIds = get(tasksState)
        const tasks = tasksIds.map((id) => {
            return get(taskState(id))
        })
        return tasks.filter(task => !task.complete).length
    },
})

const StatsComplete: React.FC = () => {
    const tasksComplete = useRecoilValue(tasksCompleteSelector) // u can pass either a selector or atom into useRecoilValue or useRecoilState

    return (
            <Stat label="Tasks Complete" value={tasksComplete} />
    )
}

const StatsRemaining: React.FC = () => {
    const tasksRemaining = useRecoilValue(tasksRemaningSelector) // u can pass either a selector or atom into useRecoilValue or useRecoilState

    return (
        <Stat label="Tasks Remaining" value={tasksRemaining} />
    )
}

export const Stats: React.FC = () => {

    return (
        <Container>
            <StatsComplete />
            <Divider />
            <StatsRemaining />
        </Container>
    )
}

// Use simple DERIVED state using RECOIL
// its a great contendor to current state management
