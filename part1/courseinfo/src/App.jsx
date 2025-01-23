import { useState } from "react"

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({onClick,text}) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({text,value}) => {
  return <p>{text} {value}</p>
}

const Statistics = ({good,neutral,bad,all}) => {
  const average = all === 0 ? 0 : (good-bad)/all
  const positive = all === 0 ? 0 : (good/all) * 100 + ' %'

  if(good ===0 && neutral ===0 && bad === 0){
    return <p>No feedback given</p>
  }

  return(
    <div>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive}/>
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good+1)

  const setToNeutral = () => setNeutral(neutral+1)

  const setToBad = () => setBad(bad+1)

  return(
    <div>
      <Header text='give feedback'/>
      <Button onClick={setToGood} text='good'/>
      <Button onClick={setToNeutral} text='neutral'/>
      <Button onClick={setToBad} text='bad'/>
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad}/>
    </div>
  )
}

export default App