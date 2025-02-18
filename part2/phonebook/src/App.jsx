import { useEffect, useState } from 'react'
import phoneService from './services/phonebook'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showName, setShowName] = useState('')

  useEffect(() => {
    phoneService
    .getAll()
    .then(phoneDetails => {
      setPersons(phoneDetails)
    })
  }, []);

  const addPhoneBook = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      const existingPerson = persons.find(p => p.name === newName)
      const choice = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(choice){
        const changedNumber = {...existingPerson, number: newNumber}

        phoneService
        .update(existingPerson.id, changedNumber)
        .then(returnedDetails => {
          setPersons(persons.map(p => p.id === existingPerson.id? returnedDetails : p))
      })
        .catch(error => {
          alert(`Failed to update ${existingPerson.name}`, error.message)
        })
        phoneService
        .getAll()
        .then(data => {
          setPersons(data)
        })
      }

    } else {
      const phoneObject = {
        name: newName,
        number: newNumber
      }
      phoneService
      .create(phoneObject)
      .then(returnedDetails => {
        setPersons(persons.concat(returnedDetails))
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePhoneBook = id => {
    const person = persons.find(p => p.id === id)
    const choice = window.confirm(`Delete ${person.name} ?`)
    if(choice){
      phoneService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(`Error deleting ${person.name}:`, error.message)
      })
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

      <Filter showName={showName} handleNameChange={handleShowName}/>

      <h3>Add a new</h3>

      <PersonForm
        addPhoneBook={addPhoneBook}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons nameToShow={nameToShow} deletePhoneBook={deletePhoneBook}/>
    </div>
  )
}

export default App