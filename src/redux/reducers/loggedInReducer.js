const loggedInReducer = (state = {loggedIn: false}, action) => {
    switch(action.type){
        case true:
            return {loggedIn: state.loggedIn = true}
        case false:
            return {loggedIn: state.loggedIn = false}
        default:
            return state;
    }
}

export default loggedInReducer;