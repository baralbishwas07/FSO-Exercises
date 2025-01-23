import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const DisplayAnecdotes = ({anecdotes,selected}) => <p>{anecdotes[selected]}</p>

const DisplayVotes = ({votes,selected}) => <p>has {votes[selected]} votes</p>

const DisplayMostVoted = ({anecdotes,votes,findMostVoted}) => {
   const mostVotedAnecdotes = findMostVoted(votes)
   if(Math.max(...votes) === 0){
    return <p>No votings done</p>
   }
   return(
    <div>
      <DisplayAnecdotes anecdotes={anecdotes} selected={mostVotedAnecdotes}/>
      <DisplayVotes votes={votes} selected={mostVotedAnecdotes}/>
    </div>
   )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const setToVotes = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  const findMostVoted = (votes) => {
    let mostVote = votes[0]
    let mostVotedIndex = 0
    votes.forEach((vote,index) => {
      if(vote > mostVote){
        mostVote = vote
        mostVotedIndex = index
      }
    })
    return mostVotedIndex
  }

  const setToSelected = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <DisplayAnecdotes anecdotes={anecdotes} selected={selected}/>
      <DisplayVotes votes={votes} selected={selected}/>
      <Button onClick={setToVotes} text='vote'/>
      <Button onClick={setToSelected} text='next anecdote'/>
      <Header text='Anecdote with most votes'/>
      <DisplayMostVoted anecdotes={anecdotes} votes={votes} findMostVoted={findMostVoted}/>
    </div>
  )
}

export default App