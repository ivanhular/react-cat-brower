import React from 'react'
import './App.css'
import { Container } from 'react-bootstrap'
import { GlobalProvider } from './context/Provider'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import BreedScreen from './screens/BreedScreen'

const App = () => {
  return (
    <GlobalProvider>
      <div className='App'>
        <Container>
          <Router>
            <Route path='/' component={HomeScreen} exact />
            {/* <Route path='/breed' component={HomeScreen} exact /> */}
            <Route path='/:id' component={BreedScreen} exact />
          </Router>
        </Container>
      </div>
    </GlobalProvider>
  )
}

export default App
