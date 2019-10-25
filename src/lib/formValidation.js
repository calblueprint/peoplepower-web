import React from 'react';


function formValidation(name, value) {

    switch(name){
        case "bylaw":
            if (!value) {
                return "Required";
            } else {
                return "";
            }
            break;
        case "project_group":
            if (value === "") {
                return "Please choose a group";
            } else {
                return "";
            }
            break;
        case "dividends":
            if (value === "") {
                return "Please pick one";
            } else {
                return "";
            }
            break;
        case "num_shares":
            console.log(value);
            if (value > 10) {
                return "Max number of shares is 10";
            } else if (value < 0) {
                return "Min number of shares is 0";
            } else if (value === "") {
                return "Required";
            } else {
                return "";
            }
            break;
        default:
            if (value.length === 0) {
                return "Required";
            } else {
                return "";
            }
    }
}

export default formValidation;