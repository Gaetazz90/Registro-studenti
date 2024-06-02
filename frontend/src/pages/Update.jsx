import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'

function Update() {
  const [data, setData] = useState([])
  const {id} = useParams()

  const navigate = useNavigate()
  
  useEffect(()=>{
    async function fetchStudent(id){
      try {
        const response = await axios.get(`http://localhost:5000/view_student/${id}`)
        setData(response.data)
      } 
      catch (error) {
        return error
      }
    }
    fetchStudent(id)
  }, [id])

  function addInput(e){
    setData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  async function updateStudent(e){
    e.preventDefault()
    try {
      await axios.put(`http://localhost:5000/update_student/${id}`, data)
      navigate('/')
    } 
    catch (error) {
      return error
    }
  }

  return (
    <>
      <h1 className='text-center my-3'> Modifica studente </h1>
      <div className='container-fluid vh-100'>
        <div className='row d-flex justify-content-center'>
          <div className='col-4'>
            {data.map((student)=>{
              return(
            <form>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input value={student.email} type='email' name='email' id='email' className='form-control' onChange={addInput}/>
              </div>
              <div className='form-group'>
                <label htmlFor='nome'>Nome</label>
                <input value={student.nome} type='text' name='nome' id='nome' className='form-control' onChange={addInput}/>
              </div>
              <div className='form-group'>
                <label htmlFor='cognome'>Cognome</label>
                <input value={student.cognome} type='text' name='cognome' id='cognome' className='form-control' onChange={addInput}/>
              </div>
              <div className='form-group'>
                <label htmlFor='età'>Età</label>
                <input value={student.età} type='number' name='età' id='età' className='form-control' onChange={addInput}/>
              </div>
              <div className='form-group'>
                <label htmlFor='genere'>Genere</label>
                <input value={student.genere} type='text' name='genere' id='genere' className='form-control' onChange={addInput}/>
              </div>
              <button type='submit' className='btn btn-success mt-5' onClick={updateStudent}>Modifica</button>
            </form>
              )
            })}
            <Link className='btn btn-primary mt-5' to={'/'}>Torna alla home</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Update
