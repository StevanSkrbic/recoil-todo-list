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

const Stat: React.FC<{label: string; value: string | number}> = ({
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

const Container = styled(Card)`
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 20px;
`

const tasksCompleteSelector = selector({ // each time I enter or one of the tasks changes our selectors run
    key: 'tasksComplete',
    get: ({get}) => {
        const tasksIds = get(tasksState)
        const tasks = tasksIds.map((id) => {
            return get(taskState(id))
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


export const Stats: React.FC = () => {
    const tasksComplete = useRecoilValue(tasksCompleteSelector) // u can pass either a selector or atom into useRecoilValue or useRecoilState
    const tasksRemaining = useRecoilValue(tasksRemaningSelector) // u can pass either a selector or atom into useRecoilValue or useRecoilState

    return (
        <Container>
            <Stat label="Tasks Complete" value={tasksComplete} />
            <Divider />
            <Stat label="Tasks Remaining" value={tasksRemaining} />
        </Container>
    )
}

// Use simple DERIVED state using RECOIL
