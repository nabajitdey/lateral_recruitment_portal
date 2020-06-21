const userInfoReducer = (state= null,action) =>{
    switch(action.type){
        case 'SIGN_IN':
            return action.data;
        case 'SIGN_OUT':
            return null;
        default:
            return state;
    }
}

export default userInfoReducer;