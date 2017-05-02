import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {loginUser} from '../../actions/auth.actions';

class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    handleFormSubmit = ({username, password}) => {
        this.props.loginUser({username: username.trim(), password});
    }

    renderField = ({ input, id, label, type, meta: { touched, error } }) => {
        return (
            <div>
                <label className="w3-label">{label}</label>
                <input id={id} className="w3-input" {...input} type={type}/>
            </div>
        );
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;

        return (
            <div className="login-form w3-card-4 w3-display-middle">
                <header className="w3-container">
                    <h1 className="signin-header w3-center">VROS Admin Login</h1>
                </header>
                
                <form className="" onSubmit={handleSubmit(this.handleFormSubmit)} style={{paddingBottom: 15}}>
                    <div className="w3-container">
                        <Field id="username" name="username" type="text" component={this.renderField} label="Username"/>
                        <br/><Field id="password" name="password" type="password" component={this.renderField} label="Password"/>
                    </div>
                    <br/><footer className="w3-container w3-right-align">
                        <button type="submit" className="w3-button w3-blue w3-border" >Login</button>
                        <button className="w3-button w3-blue w3-border" type="button" onClick={reset}>Clear Values</button>
                    </footer>
                </form>
                
            </div>
        );
    }
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string
};

function mapStateToProps(state) {
    return {
        errorMsg: state.auth.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loginUser
    }, dispatch);
}

const validate = (values) => {
    const errors = {};

    if(!values.username) {
        errors.username = 'Required';
    } 

    if(!values.password) {
        errors.password = 'Required';
    }

    return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'login-form',
    validate: validate
})(LoginForm));