import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './components/Error'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showNotification, setShowNotification] = useState(null)
  const [showError, setShowError] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setShowError('wrong username or password')
      handleErrorTimeout()
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleNotificationTimeout = () => {
    setTimeout(() => {
      setShowNotification(null)
    }, 3000)
  }

  const handleErrorTimeout = () => {
    setTimeout(() => {
      setShowError(null)
    }, 3000)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ title: '', author: '', url: '' })
        setShowNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        handleNotificationTimeout()
      })
      .catch(error => {
        setShowError(`Error creating blog: ${error.message}`)
        handleErrorTimeout()
      }) 
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const renderBlog = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:<input type='text' value={newBlog.title} name='title' onChange={handleInputChange} />
      </div>
      <div>
        author:<input type='text' value={newBlog.author} name='author' onChange={handleInputChange} />
      </div>
      <div>
        url:<input type='text' value={newBlog.url} name='url' onChange={handleInputChange} />
      </div>
      <button type='submit'>create</button>
    </form>
  )

  return (
    <div>
      {user === null ?
        <div>
          <Error message={showError}/>
          {loginForm()} 
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification message={showNotification}/>
          <p>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          {blogForm()}
          {renderBlog()}
        </div>
      }
    </div>
  )
}

export default App