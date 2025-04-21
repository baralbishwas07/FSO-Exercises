import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Error from './components/Error'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {

  const blogFormRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [showNotification, setShowNotification] = useState(null)
  const [showError, setShowError] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setShowNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        handleNotificationTimeout()
      })
      .catch(error => {
        setShowError(`Error creating blog: ${error.message}`)
        handleErrorTimeout()
      })
  }

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        const updatedBlog = blogs.map(blog => blog.id !== id ? blog : returnedBlog)
        setBlogs(updatedBlog.sort((a, b) => b.likes - a.likes))
      })
      .catch(error => {
        setShowError('Failed to update blog: ', error.message)
        handleErrorTimeout()
      })
  }

  const deleteBlog = (blogToDelete) => {
    const confirmDelete = window.confirm(
      `Remove ${blogToDelete.title} by ${blogToDelete.author}?`
    )

    if (!confirmDelete) return

    blogService
      .remove(blogToDelete.id)
      .then(() => {
        setShowNotification(`Blog "${blogToDelete.title}" deleted successfully`)
        handleNotificationTimeout()

        const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
        setBlogs(updatedBlogs)
      })
      .catch(error => {
        setShowError(`Failed to delete "${blogToDelete.title}"` + error.response.data.error)
        handleErrorTimeout()
      })
  }


  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      {showError && <Error message={showError} />}
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
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} loggedUser={user}/>
      )}
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {user === null ?
        <div>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Notification message={showNotification} />
          {showError && <Error message={showError} />}
          <p>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {renderBlog()}
        </div>
      }
    </div>
  )
}

export default App