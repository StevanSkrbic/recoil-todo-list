import React from 'react'
import {useRecoilValue} from 'recoil'
import {Container,Stat, tasksCompleteSelector} from './Stats';

export const StatsDerived: React.FC = () => {
    const tasksComplete = useRecoilValue(tasksCompleteSelector) // u can pass either a selector or atom into useRecoilValue or useRecoilState

    return (
        <Container>
            <Stat label="Tasks Complete" value={tasksComplete} />
        </Container>
    )
}
