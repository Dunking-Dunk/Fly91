import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Main from './pages/main'
import Rflight from './pages/employee/review/flight'
import Rhotel from './pages/employee/review/hotel'
import Rcab from './pages/employee/review/cab'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login/*' element={<Login />} />
        <Route path='/*' element={<Main />} />
        <Route path='/rflight' element={<Rflight />} />
        <Route path='/rhotel' element={<Rhotel />} />
        <Route path='/rcab' element={<Rcab />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
