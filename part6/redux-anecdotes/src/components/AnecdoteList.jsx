import { useSelector, useDispatch } from "react-redux"
import { voteAnecdotes } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeOut } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {

    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes
            .filter(anecdote =>
                anecdote.content.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        const updatedAnecdote = await anecdoteService.update(anecdote)
        dispatch(voteAnecdotes(updatedAnecdote))
        dispatch(setNotificationWithTimeOut(`you voted '${anecdote.content}'`,5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList