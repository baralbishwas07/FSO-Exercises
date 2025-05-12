import axios from 'axios'
import { useActionState } from 'react'
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdotes = anecdote =>
  axios.post(baseUrl, anecdote).then(res => res.data)

export const updateAnecdotes = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)