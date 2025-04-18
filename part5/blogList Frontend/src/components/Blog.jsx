import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {

    const { id, ...blogWithoutId } = blog

    const updatedBlog = {
      ...blogWithoutId,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlog(blog.id, updatedBlog)
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} {blog.author}<button onClick={() => setDetailsVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.user ? blog.user.username : 'Unknown user'}</div>
      </div>
    </div> 
  )
}

export default Blog