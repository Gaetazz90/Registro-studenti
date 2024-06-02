import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import {Link, useNavigate} from 'react-router-dom'


function Read() {
  const [students, setStudents] = useState([])
  const {id} = useParams()

  const navigate = useNavigate()
  
  useEffect(()=>{
    async function fetchStudent(id){
      try {
        const response = await axios.get(`http://localhost:5000/view_student/${id}`)
        setStudents(response.data)
      } 
      catch (error) {
        return error
      }
    }
    fetchStudent(id)
  }, [id])

  async function deleteStudent(id){
    try {
      await axios.delete(`http://localhost:5000/delete_student/${id}`)
      navigate('/')
    } 
    catch (error) {
      return error
    }
  }

  return (
    <>
      <div className='container'>
        <h2 className='text-center'> Dettaglio Studente</h2>
        {students.map(student=>(
          <ul class="list-group" key={student.id}>
            <li class="list-group-item list-group-item-secondary"><strong>N° matricola:  </strong>{student.id}</li>
            <li class="list-group-item list-group-item-secondary"><strong>Email:  </strong>{student.email}</li>
            <li class="list-group-item list-group-item-secondary"><strong>Nome: </strong>{student.nome}</li>
            <li class="list-group-item list-group-item-secondary"><strong>Cognome:  </strong>{student.cognome}</li>
            <li class="list-group-item list-group-item-secondary"><strong>Età:  </strong>{student.età}</li>
            <li class="list-group-item list-group-item-secondary"><strong>Sesso:  </strong>{student.genere}</li>
            <div className='row mt-3 d-flex justify-content-center'>
              <div className='col-3'>
                <button className='btn btn-danger' onClick={ () => deleteStudent(student.id)}>Elimina Studente</button>
              </div>
              <div className='col-3'>
                <Link className='btn btn-warning' to={`/modifica/${student.id}`}>Modifica studente</Link>
              </div>
            </div>
        </ul>
        ))}
        <Link className='btn btn-primary mt-5 mx-auto' to={'/'}>Torna alla home</Link>
      </div>
    </>
  )
}

export default Read
