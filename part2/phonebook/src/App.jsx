import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ name, number, id, handleDelete}) => {
  return(
    <> 
      <p>{name} {number} <button onClick={(e) => handleDelete(e, id)}>delete</button></p>
    </>
  )
}

const Numbers = ({ persons, filter, handleDelete}) => {
  filter = filter.toLowerCase()
  if(filter !== '') {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().startsWith(filter))
    return(
      <>
        {
          filteredPersons.map((person) => <Person key={person.id} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete}/>)
        }
      </>
    )
  }

  return(
    <>
      {
        persons.map((person) => <Person key={person.id} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete}/>)
      }
    </> 
  )
}

const Filter = ({ newFilter, handleFilterChange}) => {
  return(
    <div>
      filter shown with
      <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({handleSubmit, newName, handleChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={handleChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Notification = ({ message, flag }) => {
  if (message === null) {
    return null
  }

  const successStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
  }

  const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
  }

  
  if(flag) {
    return (
      <div style={successStyle}>
        {message}
      </div>
    ) 
  } else {
    return(
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
  
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    personService
    .getAll()
    .then((data) => setPersons(data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    let update = false
    let isNew = true
    let id = undefined
    if(persons.find((person) => person.name === newName)) {
      update = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      id = persons.find(p => p.name === newName).id
      console.log('here')
      isNew = false
    }

    console.log(update)

    if(update) {
      const newPerson = {name: newName, number: newNumber} 
      console.log(update)
      personService
        .updatePerson(id, newPerson)
        .then(personObj => {
          const data = persons.filter(p => p.name !== personObj.name).concat(personObj)
          setPersons(data)
          setNewNumber('')
          setNewName('')
          setMessage(`Updated ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(err => {
          setMessage(`Information of ${newName} has already been removed from the server`)
          setFlag(false)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        }) 
    } else {
      setNewNumber('')
      setNewName('')
    }

    if(isNew && !update) {
      const newPerson = {name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(personObj => {
          setMessage(`Added ${newName}`)
          setFlag(true)
          setPersons(persons.concat(personObj))
          setNewNumber('')
          setNewName('')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (event, id) => {
    event.preventDefault()
    personService.deletePerson(id)
    .then((res) => {
      // console.log('res', res)
      const filteredPersons = persons.filter(person => person.id !== id)
      setPersons(filteredPersons)
    })
  }        

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification flag={flag} message={message}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Numbers handleDelete={handleDelete} persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App