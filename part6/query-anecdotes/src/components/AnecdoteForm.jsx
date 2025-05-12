import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../request"
import { useNotificationDispatch } from "../useNotification"

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))

      dispatch({ type: 'NOTIFICATION', payload: `You created '${newAnecdote.content}'` })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    },
    onError: (error) => {
      dispatch({ type: 'NOTIFICATION', payload: error.response.data.error })
      setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
