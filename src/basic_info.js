import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { throws } from 'assert';


class Basic_info extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    nextButton = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    render(){
        const { values } = this.props;
        return(
            <Form>
                <Form.Field>
                    <label>First Name</label>
                    <input
                        placeholder='First Name'
                        onChange={this.props.handleChange('fname')}
                        defaultValue={values.fname}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        placeholder='Last Name'
                        onChange={this.props.handleChange('lname')}
                        defaultValue={values.lname}
                    />
                </Form.Field>
                {/*<Form.Field>*/}
                {/*    <label>Email</label>*/}
                {/*    <input*/}
                {/*        placeholder='Email'*/}
                {/*        onChange={this.props.handleChange('email')}*/}
                {/*        defaultValue={values.email}*/}
                {/*    />*/}
                {/*</Form.Field>*/}
                {/*<Form.Field>*/}
                {/*    <label>Password</label>*/}
                {/*    <input*/}
                {/*        placeholder='Password'*/}
                {/*        onChange={this.props.handleChange('password')}*/}
                {/*        defaultValue={values.password}*/}
                {/*    />*/}
                {/*</Form.Field>*/}
                {/*<Form.field>*/}
                {/*    <label>Confirm Password</label>*/}
                {/*    <input*/}
                {/*        placeholder='Confirm Password'*/}
                {/*    />*/}
                {/*</Form.field>*/}
                <button onClick={this.nextButton}>Next</button>
            </Form>
        );
    }
}

export default Basic_info;