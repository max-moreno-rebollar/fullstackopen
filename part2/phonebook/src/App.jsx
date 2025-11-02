import { useState } from 'react'

const Person = ({ name, number}) => {
  return(
    <p>{name} {number}</p>
  )
}

const Numbers = ({ persons, filter }) => {
  filter = filter.toLowerCase()
  if(filter !== '') {
    let filteredPersons = persons.filter((person) => person.name.toLowerCase().startsWith(filter))
    return(
      <>
        {
          filteredPersons.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)
        }
      </>
    )
  }

  return(
  <>
    {
      persons.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      let newPersons = persons.concat({name: newName, number: newNumber})
      setPersons(newPersons)
    }

    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Numbers persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App