import React from 'react';
import formValidation from "../../lib/formValidation";


class Payment extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    finishButton = (e) => {
        e.preventDefault();
        const { values } = this.props;
        let fields = ['num_shares', 'dividends'];
        let errors = [];

        for (var i = 0; i < fields.length; i++){
            let errorMessage = formValidation(fields[i], values[fields[1]]);
            this.props.values.errors[fields[i]] = errorMessage;
            if (errorMessage !== "") {
                errors.push(errorMessage);
            }
        }
        console.log(errors);
        if (!(errors && errors.length > 0)) {
            this.props.onSubmit();
        } else {
            this.forceUpdate();
        }
    }


    prevButton = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { values } = this.props;
        const { errors } = this.props.values;
        return(
            <div>
                <form>
                    <div>
                        <label>Number of Shares</label>
                        <input
                            name="num_shares"
                            placeholder=''
                            onChange={this.props.handleChange}
                            defaultValue={values.num_shares}
                        />
                    </div>
                    <div>{errors.num_shares ? errors.num_shares: '\u00A0'}</div>
                    <div>
                        Dividends
                        <div>
                            <label>
                                <input type="radio"
                                       name="dividends"
                                       value="yes"
                                       checked={values.dividends === "yes"}
                                       onChange={this.props.handleChange} />
                                yes
                            </label>
                        </div>
                        <div >
                            <label>
                                <input type="radio"
                                       name="dividends"
                                       value="no"
                                       checked={values.dividends === "no"}
                                       onChange={this.props.handleChange}
                                    />
                                no
                            </label>
                        </div>
                    </div>
                    <div>{errors.dividends ? errors.dividends: '\u00A0'}</div>
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