import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Home() {
  const [students, setStudents] = useState([])
  
  useEffect(()=>{
    async function fetchAllStudents(){
      try {
        const response = await axios.get('http://localhost:5000/students')
        setStudents(response.data)
      } 
      catch (error) {
        return error
      }
    }
    fetchAllStudents()
  }, [])
  
  return (
    <>
    <div className='container-fluid vh-100'>

      <h1 className='text-center mt-3 mb-5'>Registro Studenti</h1>
      
      <table className='table table-dark mt-5'>
        <thead>
          <tr>
            <th scope='col'>ID</th>
            <th scope='col'>Email</th>
            <th scope='col'>Azioni</th>
          </tr>
        </thead>
        <tbody>
        {students.map(student=>(
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.email}</td>
              <td><Link className='btn btn-primary mx-auto' to={`/vedi/${student.id}`}>Vedi dettagli</Link></td>
            </tr>
            )
          )
        }
        </tbody>
      </table>

      <Link className='btn btn-success col-12' to={'/aggiungi'}>Aggiungi nuovo studente</Link>
    </div>
  </>
)
}

export default Home
