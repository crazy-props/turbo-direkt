const SUCCESS = 'alert/SUCCESS'
const ERROR = 'alert/INTERNAL_ERROR'
const CLEAR_ERROR = 'alert/CLEAR_ERROR'

export const handleSuccess = (message) => ({
    type: SUCCESS,
    message
})

export const handleError = (error) => ({
    type: ERROR,
    error
})
export const clearError = () => ({
    type: CLEAR_ERROR
})


const initialState = {
    alert: '',
    imWithAlert: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS:
            return {
                ...state,
                alert: action.message,
                imWithAlert: true
            }
        case ERROR:
            return {
                ...state,
                alert: action.error,
                imWithAlert: true
            }
        case CLEAR_ERROR:
            return {
                ...state,
                alert: '',
                imWithAlert: false
            }
        default:
            return state
    }
}
