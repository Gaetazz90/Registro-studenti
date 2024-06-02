import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create() {
  
  const [values, setValues] = useState({
    email: "",
    nome: "",
    cognome: "",
    età: null,
    genere: ""
  })

  const navigate = useNavigate()

  function addInput(e){
    setValues((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  async function addStudent(e){
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/add_student', values)
      navigate('/')
    } 
    catch (error) {
      return error
    }
  }

  return (
    <>
      <h1 className='text-center my-3'> Aggiungi studente </h1>
      <div className='container-fluid vh-100'>
        <div className='row d-flex justify-content-center'>
          <div className='col-4'>
            <form>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' className='form-control' onChange={addInput}/>
              </div>
              <div className='form-group'>
                <label htmlFor='nome'>Nome</label>
                <input type='text' name='nome' id='nome' className='form-control' onChange={addInput}/>
              </div>
              <div className='form-group'>
                <label htmlFor='cognome'>Cognome</label>
                <input type='text' name='cognome' id='cognome' className='form-control' onChange={addInput}/>
              </div>
              <div className='form-group'>
                <label htmlFor='età'>Età</label>
                <input type='number' name='età' id='età' className='form-control' onChange={addInput}/>
              </div>
              <div className='form-group'>
                <label htmlFor='genere'>Genere</label>
                <input type='text' name='genere' id='genere' className='form-control' onChange={addInput}/>
              </div>
              <button type='submit' className='btn btn-success mt-5' onClick={addStudent}>Crea</button>
            </form>
            <Link className='btn btn-primary mt-5' to={'/'}>Torna alla home</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create
