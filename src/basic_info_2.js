import React from 'react';
import {Form} from "semantic-ui-react";


class Basic_info_2 extends React.Component {

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
            <Form>
                <Form.Field>
                    <label>Address</label>
                    <input
                        placeholder='Address'
                        onChange={this.props.handleChange('street')}
                        defaultValue={values.address.street}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Apt</label>
                    <input
                        placeholder='Apt'
                        onChange={this.props.handleChange('apt')}
                        defaultValue={values.address.apt}
                    />
                </Form.Field>
                <Form.Field>
                    <label>State</label>
                    <input
                        placeholder='State'
                        onChange={this.props.handleChange('state')}
                        defaultValue={values.address.state}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Zipcode</label>
                    <input
                        placeholder='Zipcode'
                        onChange={this.props.handleChange('zipcode')}
                        defaultValue={values.address.zipcode}
                    />
                </Form.Field>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </Form>
    );
    }
}

export default Basic_info_2;