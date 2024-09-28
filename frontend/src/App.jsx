import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Employee from './pages/employee'
import Admin from './pages/admin'
import Login from './pages/login'
import ServiceForm from './components/form/employee/serviceforms/ServiceForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login/*' element={<Login />} />
          <Route path='/*' element={<Employee />} />
          <Route path='/admin/*' element={<Admin />} />
          <Route path='/serviceform'  element={<ServiceForm />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
