import React from 'react';
import handleErrorChange from './onboarding';

export function formValidation(input, value) {

    if (value.length == 0){
        return 'Required';
    }
    switch(input) {
        case 'email':
            return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'Invalid Email';
        case 'password':
            if (value.length < 6){
                return 'Password is too short';
            } else {
                return value.matches(/(?=.*[0-9])/) ? '' : 'Password must include a number';
            }
    }

}