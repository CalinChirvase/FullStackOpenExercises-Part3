const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const Person = require('./models/person')

//logger
morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})

//api routes
app.use(morgan(':method :url :response-time :data'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(request.params.id).then(preson => {
    response.json(person)
  })
})

app.get('/info', (req, res) => {
    res.send(`<div> <p>Phonebook has info for ${persons.length} people </p> <p>${Date()}</p> </div>`)
})


const generateId = () => {
  return Math.random() * 1000000
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  //const match = persons.filter(person => person.name === body.name)
  //if ( match.length !== 0) {
   //   return response.status(400).json({
    //      error: 'name must be unique'
    //  })
  //}

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  })

person.save().then(savedPerson => {
  response.json(savedPerson)
})
  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})