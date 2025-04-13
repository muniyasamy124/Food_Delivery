import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
    const BACKEND = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/order" element={<Order url={BACKEND}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App