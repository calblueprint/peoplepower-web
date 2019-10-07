import React from 'react';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        // alert("A name was submitted: " + this.state.value);
        // let path = `/home`;
        // this.props.history.push(path);
        this.props.history.push("/home");
        evt.preventDefault();
    }
    
    render() {
        return (
            <div>     
                <h1>Login to People Power</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    Username
                    <br />
                    <input type="text" name="firstname" />
                    <br />
                    Password
                    <br />
                    <input type="text" name="lastname" />
                    <br />
                    <button className="primary-button" type="submit">
                        Login
                    </button>
                </form>
            </div>
        );
    }

}
export default Login;