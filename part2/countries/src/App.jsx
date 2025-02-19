import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountry from './components/ShowCountry'

const App = () => {

  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [showMessage, setShowMessage] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {

    if(value){
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        const resultingCountries = response.data.filter(country => 
          country.name.common.toLowerCase().includes(value.toLowerCase()))

        if(resultingCountries.length === 1){
          setShowCountry(resultingCountries[0])
          setCountries([])
          setShowMessage('')

        } else if(resultingCountries.length > 10){
          setCountries([])
          setShowMessage("Too many matches, specify another filter")
          setShowCountry(null)

        } else {
          setCountries(resultingCountries)
          setShowMessage("")
          setShowCountry(null)
        }
      })
      .catch((error) => {
        alert("Error occured while searching for countries:", error.message)
      })
    } else {
      setCountries([])
      setShowMessage('')
      setShowCountry(null)
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange}/>
      </form>

      <p>{showMessage}</p>

      {showCountry ? (
        <ShowCountry country={showCountry}/>
      ) : (
        countries.map(country => (
          <p key={country.cca2}>{country.name.common}</p>
        ))
      )}

    </div>
  )
}

export default App