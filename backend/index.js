const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('data', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :data'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
      id: 4,
      name: "Mary Poppendick",
      number: "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<div> <p>Phonebook has info for ${persons.length} people </p> <p>${Date()}</p> </div>`)
})


const generateId = () => {
  //const maxId = notes.length > 0
  //  ? Math.max(...notes.map(n => n.id))
  //  : 0
  return Math.random() * 1000000
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const match = persons.filter(person => person.name === body.name)
  if ( match.length !== 0) {
      return response.status(400).json({
          error: 'name must be unique'
      })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})