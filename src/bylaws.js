import React from 'react';
import {Form, Checkbox} from "semantic-ui-react";


class Bylaws extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    nextButton = (e) => {
        e.preventDefault();
        if (!this.props.values.bylaw){
            this.props.callBackBylawValidation();
        } else {
            this.props.nextStep();
        }
    }


    prevButton = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }



    render(){
        const { values } = this.props;
        const { errors } = values;
        return(
            <form>
                <div>
                    <input
                        type="checkbox"
                        name="bylaw"
                        onChange={this.props.handleClick}
                        checked={this.props.values.bylaw}/>
                    Agree
                    {!values.bylaw && <div>{errors.bylaw}</div>}
                </div>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </form>
    );
    }
}

export default Bylaws;