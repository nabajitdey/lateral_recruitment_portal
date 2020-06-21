export const login = (data) => {
    return{
        type : 'SIGN_IN',
        data : data
    };
};

export const logout = () => {
    return{
        type : 'SIGN_OUT',
        data : null
    };
};

export const islogin = () => {
    return{
        type : 'IS_SIGN_IN',
        
    };
};

export const islogout = () => {
    return{
        type : 'IS_SIGN_OUT',
    };
};
