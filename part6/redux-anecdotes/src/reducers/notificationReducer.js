import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return ''
    }
  }
})

export const { setNotification, hideNotification } = notificationSlice.actions

export const setNotificationWithTimeOut = (message, seconds) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000);
  }
}
export default notificationSlice.reducer