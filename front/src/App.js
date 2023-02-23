import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './pages/app'
import Home from './pages/app/home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/app/*' element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
