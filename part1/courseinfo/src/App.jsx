import { useState } from "react"

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({onClick,text}) => {
  return <button onClick={onClick}>{text}</button>
}

const Display = ({good,neutral,bad,all}) => {
  const average = all === 0 ? 0 : (good-bad)/all
  const positive = all === 0 ? 0 : (good/all) * 100
  return(
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => {
    setGood(good+1)
  }

  const setToNeutral = () => {
    setNeutral(neutral+1)
  }

  const setToBad = () => {
    setBad(bad+1)
  }

  return(
    <div>
      <Header text='give feedback'/>
      <Button onClick={setToGood} text='good'/>
      <Button onClick={setToNeutral} text='neutral'/>
      <Button onClick={setToBad} text='bad'/>
      <Header text='statistics'/>
      <Display good={good} neutral={neutral} bad={bad} all={good+neutral+bad}/>
    </div>
  )
}

export default App