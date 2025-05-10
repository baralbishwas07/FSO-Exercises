import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    voteAnecdotes(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id === updatedAnecdote.id
        ? updatedAnecdote
        : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer