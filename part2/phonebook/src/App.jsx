import { useState } from 'react'
import { PhoneBook } from './components/phonebook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '977-9854672837', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showName, setShowName] = useState('')


  const addPhoneBook = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const phoneObject = {
        name: newName,
        number: newNumber,
        id: persons.length+1
      }
      setPersons(persons.concat(phoneObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowName = (event) => {
    setShowName(event.target.value)
  }

  const nameToShow = showName 
  ? persons.filter(person => person.name.toLowerCase().includes(showName.toLowerCase())) 
  : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={showName} onChange={handleShowName}/>
      </div>
      <h3>Add a new</h3>
      <form onSubmit={addPhoneBook}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {nameToShow.map(person => 
        <PhoneBook key={person.id} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

export default App