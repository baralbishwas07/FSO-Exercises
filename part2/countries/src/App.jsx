import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountry from './components/ShowCountry'
import ShowCountries from './components/ShowCountries'
import Weather from './components/Weather'

const App = () => {

  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [showMessage, setShowMessage] = useState('')
  const [showCountry, setShowCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if(showCountry){
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${showCountry.capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        alert('Error fetching weather:', error.message)
      })
    }
  }, [showCountry])

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

  const handleShow = (country) => {
    setShowCountry(country)
    setWeather(null)
  }

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange}/>
      </form>

      <p>{showMessage}</p>

      {showCountry ? (
        <div>
          <ShowCountry country={showCountry}/>
          <Weather country={showCountry} weather={weather}/>
        </div>
      ) : (
        <ShowCountries countries={countries} handleShow={handleShow}/>
      )}

    </div>
  )
}

export default App