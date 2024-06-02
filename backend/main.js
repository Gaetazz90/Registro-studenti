const express = require('express')
const app = express()

const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "students-list"
})

const cors = require('cors')
app.use(cors())

app.use(express.json())


app.get('/', (req,res)=>{
    res.send("Benvenuto nel backend")
})

app.get('/students', (req,res)=>{
    const q = "SELECT * FROM register"
    db.query(q, (error, data)=>{
        if(error){
            return error
        }
        return res.json(data)
    })
})

app.get('/view_student/:id', (req,res)=>{
    const id = req.params.id
    const q = "SELECT * FROM register WHERE `id` = ?"
    db.query(q, [id], (error, data)=>{
        if(error){
            return error
        }
        return res.json(data)
    })
})

app.post('/add_student', (req,res)=>{
    const q = "INSERT INTO register (`email`, `nome`, `cognome`, `età`, `genere`) VALUES (?)"
    const values = [
        req.body.email,
        req.body.nome,
        req.body.cognome,
        req.body.età,
        req.body.genere
    ]
    db.query(q, [values], (error,data)=>{
        if(error){
            return error
        }
        return res.json(data)
    })
})

app.put('/update_student/:id', (req,res)=>{
    const id = req.params.id
    const q = " UPDATE register SET `email`= ?, `nome`= ?, `cognome`= ?, `età`= ?, `genere`= WHERE id = ? "
    const values = [
        req.body.email,
        req.body.nome,
        req.body.cognome,
        req.body.età,
        req.body.genere,
        id
    ]
    db.query(q, [values], (error,data)=>{
        if(error){
            return error
        }
        return res.json(data)
    })
})

app.delete('/delete_student/:id', (req,res)=>{
    const id = req.params.id
    const q = "DELETE FROM register WHERE `id` = ?"
    db.query(q, [id], (error,data)=>{
        if(error){
            return error
        }
        return res.json(data)
    })
    
})




app.listen(5000, ()=>{
    console.log('Server connected')
})