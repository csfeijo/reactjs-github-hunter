import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import Menu from './components/Menu'
import Home from './pages/Home'
import Hunt from './pages/Hunt'

function App() {
  return (
    <BrowserRouter>
      <h1>GitHub Hunter</h1>
      <Menu />

      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
        </Route>
        <Route path='/hunt' element={<Hunt />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
