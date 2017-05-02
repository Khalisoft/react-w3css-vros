import axios from 'axios';

import {AUTH_USER, UNAUTH_USER} from '../actions/action.types';

export function loginUser({username, password}) {
    const config = {
        headers: {'Content-Type': 'application/json'}
    };

    return (dispatch) => {
        axios
            .post('http://localhost:3000/users/authenticate', {username, password}, config)
            .then((response) => {
                const {success, msg, token} = response.data;
                
                if(success) {
                    localStorage.setItem('token', token);
                    // if user exist than update state 'authenticated'
                    dispatch({type: AUTH_USER});
                    console.log("You are now login");
                } else {
                    console.log(msg);
                }
            })
            .catch((err) => {
                console.log(`${err}`);
            });
    };
}