import React from 'react'
import {Input} from './components/Input'
import {Stats} from './components/Stats'
import {Tasks} from './components/Tasks'
import {ThemeProvider, GlobalStyles, Page} from './components/theme'
import {Header, darkModeState} from './components/Header'
import {useRecoilValue} from 'recoil'
import {StatsDerived} from './components/StatsDerived';

const Home = () => {
    return (
        <Page>
            <Header />
            <Stats />
            <Tasks />
            <Input />
            <StatsDerived />
        </Page>
    )
}

const App = () => {
    const darkMode = useRecoilValue(darkModeState) // useRecoilValue gives you only the value of the atom
    return (
        <ThemeProvider darkMode={darkMode}>
            <GlobalStyles />
            <Home />
        </ThemeProvider>
    )
}

export default App
