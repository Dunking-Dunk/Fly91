import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./pages/employee";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Error from "./pages/error";
import Rflight from './pages/employee/review/flight'
import Rhotel from './pages/employee/review/hotel'
import Rcab from './pages/employee/review/cab'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login/*" element={<Login />} />
          <Route path="/*" element={<Employee />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/error" element={<Error />} />
          <Route path='/rflight' element={<Rflight />} />
        <Route path='/rhotel' element={<Rhotel />} />
        <Route path='/rcab' element={<Rcab />} />
        </Routes>
      </BrowserRouter>
    </>
  );

export default App;
