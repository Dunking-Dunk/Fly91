import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Employee from './pages/employee'
import Admin from './pages/admin'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Employee/>}/>
        <Route path='/admin/*' element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App
