import { useState } from 'react'

const Person = ({ name }) => {
  return(
    <p>{name}</p>
  )
}

const Numbers = ({ persons }) => {
  return(
  <>
    <h2>Numbers</h2>
    {
      persons.map((person) => <Person key={person.name} name={person.name}/>)
    }
  </> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    let newPersons = persons.concat({name: newName})
    setPersons(newPersons)
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons}/>
    </div>
  )
}

export default App