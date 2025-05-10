import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotificationWithTimeOut } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(anecdote))
        dispatch(setNotificationWithTimeOut(`you created '${content}'`, 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm