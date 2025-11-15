const express = require('express')
const app = express()
app.use(express.json())

let data =
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/api/info', (request, response) => {
    const now = new Date();

    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone
    const fullDate = `${date} ${time} ${timeZoneName}`
    const entries = data.length
    const page = `<div><p>Phonebook has info for ${entries} people</p><p>${fullDate}</p></div>`
    response.send(page)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = data.find(p => p.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  data = data.filter(p => p.id !== id) 
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  if(!request.body.name || !request.body.number) {
    return response.status(400).json({error: 'missing name or number'})
  }

  let person = data.find(p => p.name === request.body.name)
  if(person) {
    return response.status(400).json({error: 'name must be unique'})
  } else {
    const id = Math.floor(10000 * Math.random())
    const person = {id: id.toString(), ...request.body}
    data = data.concat(person)
    return response.json(data) 
  } 
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)