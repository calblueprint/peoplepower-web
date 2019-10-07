import React from 'react';
import {Form} from 'semantic-ui-react';


class Payment extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    nextButton = (e) => {
        e.preventDefault();
        this.props.nextStep();
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
                <Form>
                    <Form.Field>
                        <label>Number of Shares</label>
                        <input
                            placeholder=''
                            onChange={this.props.handleChange('num_shared')}
                            defaultValue={values.num_shares}
                        />
                    </Form.Field>
                    <Form.Field label='Dividends' control='select'>
                        <option value='yes'>yes</option>
                        <option value='no'>no</option>
                    </Form.Field>
                    <Form.Field label='Payment Information'>
                        =
                    </Form.Field>
                </Form>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </div>
        );
    }
}

export default Payment;