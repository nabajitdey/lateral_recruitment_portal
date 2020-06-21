const loggedReducer = (state=false, action) => {
    switch ( action.type ){
        case 'IS_SIGN_IN':
            return true;
        case 'IS_SIGN_OUT':
            return false;
        default:
            return state;
    }
};

export default loggedReducer;