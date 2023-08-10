import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hometown from './pages/Hometown';
function App() {
 

  return (
    <>
<BrowserRouter>
<Routes>
<Route path='/' element={<Hometown/>} />
</Routes>
  </BrowserRouter>
    </>
  )
}

export default App
