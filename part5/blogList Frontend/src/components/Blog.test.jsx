import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and number of likes', () => {
    const blog = {
        id: '1',
        title: 'Blog rendering',
        author: 'Test user',
        url: 'http://blogrendering.com',
        likes: 19,
        user: {
            id: '123',
            username: 'testuser',
            name: 'TestUser'
        }
    }

    const loggedUser = {
        username: 'testuser',
        name: 'TestUser'
    }

    const mockUpdateBlog = vi.fn()
    const mockDeleteBlog = vi.fn()

    const { container } = render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} loggedUser={loggedUser} />)

    const summary = container.querySelector('.summary-blog')
    expect(summary).toHaveTextContent('Blog rendering')
    expect(summary).toHaveTextContent('Test user')
    expect(summary).not.toHaveTextContent('http://blogrendering.com')
    expect(summary).not.toHaveTextContent('19')
})