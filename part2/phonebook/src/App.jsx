import { useState } from 'react'
import { PhoneBook } from './components/phonebook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addPhoneBook = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const phoneObject = {
      name: newName,
    }
    setPersons(persons.concat(phoneObject))
    setNewName('')
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhoneBook}>
        <div>
          name: <input value={newName} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <PhoneBook key={person.name} name={person.name}/>
      )}
      <div>
        debug: {newName}
      </div>
    </div>
  )
}

export default App