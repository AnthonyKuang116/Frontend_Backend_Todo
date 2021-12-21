export const setLoggedInTrue = () => {
    return (dispatch) => {
        dispatch({
            type: true
        })
    }
}

export const setLoggedInFalse = () => {
    return (dispatch) => {
        dispatch({
            type: false
        })
    }
}