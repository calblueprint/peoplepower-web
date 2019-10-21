import React from 'react';


class Payment extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    finishButton = (e) => {
        e.preventDefault();
        this.props.onSubmit();
    }


    prevButton = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { values } = this.props;
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
                    <div>
                        Dividends
                        <div>
                            <label>
                                <input type="radio"
                                       name="dividends"
                                       value="yes"
                                       checked={values.dividends == "yes"}
                                       onChange={this.props.handleChange} />
                                yes
                            </label>
                        </div>
                        <div >
                            <label>
                                <input type="radio"
                                       name="dividends"
                                       value="no"
                                       checked={values.dividends == "no"}
                                       onChange={this.props.handleChange}
                                    />
                                no
                            </label>
                        </div>
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