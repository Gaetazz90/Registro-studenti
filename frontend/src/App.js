import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Read from './pages/Read';
import Update from './pages/Update';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/aggiungi' element={<Create/>}/>
            <Route path='/vedi/:id' element={<Read/>}/>
            <Route path='/modifica/:id' element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

