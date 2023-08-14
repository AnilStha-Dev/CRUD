import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import LectureAdd from "./pages/LectureAdd";
import EditLecturePage from "./pages/EditLecturePage";
import SecureRoute from "./Routes/SecureRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          <Route path="" element={<SecureRoute/>}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/add" element={<LectureAdd />} />
          <Route path="/home/:id" element={<EditLecturePage />} /> 
          </Route>

          
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
