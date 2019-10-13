import React from 'react';
import {Form} from 'semantic-ui-react';
import {formValidation} from "./formValidarion";


class Payment extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    finishButton = (e) => {
        e.preventDefault();
        this.props.onSubmit();
        //do some function for finishing the onboarding process ? what do we want the next step to be
    }


    prevButton = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { values } = this.props;
        return(
            <div>
                {/*
                    how do we want to implement paying into the website
                    paypal only has the paypal button as an option as far as a I know*
                */}
                <form>
                    <div>
                        <label>Number of Shares</label>
                        <input
                            name="num_shared"
                            placeholder=''
                            onChange={this.props.handleChange}
                            defaultValue={values.num_shares}
                        />
                    </div>
                    <div>
                        <option value='yes'>yes</option>
                        <option value='no'>no</option>
                    </div>
                    <div label='Payment Information'>
                    </div>
                </form>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.finishButton}>Finish</button>
            </div>
        );
    }
}

export default Payment;