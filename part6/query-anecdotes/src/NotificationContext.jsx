import PropTypes from 'prop-types'
import { useReducer, createContext } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.payload
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

NotificationContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default NotificationContext