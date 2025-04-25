import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

    let container
    let blog 
    let loggedUser
    let mockUpdateBlog
    let mockDeleteBlog

    beforeEach(() => {
        blog = {
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

        loggedUser = {
            username: 'testuser',
            name: 'TestUser'
        }

        mockUpdateBlog = vi.fn()
        mockDeleteBlog = vi.fn()

        container = render(<Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} loggedUser={loggedUser} />).container
    })

    test('renders title and author but not url and number of likes', async () => {

        const summary = container.querySelector('.summary-blog')
        expect(summary).toHaveTextContent('Blog rendering')
        expect(summary).toHaveTextContent('Test user')
        expect(summary).not.toHaveTextContent('http://blogrendering.com')
        expect(summary).not.toHaveTextContent('19')
    })

    test('clicking a button shows the blog url and likes', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        // const details = container.querySelector('.detailed-blog')
        // expect(details).toHaveTextContent('http://blogrendering.com')
        // expect(details).toHaveTextContent('19')

        const url = screen.getByText('http://blogrendering.com')
        const likes = screen.getByText('19')
        expect(url).toBeDefined()
        expect(likes).toBeDefined()
    })

    test('event handler is called twice if like button is clicked twice', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        console.log(mockUpdateBlog.mock.calls)

        expect(mockUpdateBlog.mock.calls).toHaveLength(2)
    })

})