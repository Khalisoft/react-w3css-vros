import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';

import {FORMSPREE_URL, EMAIL_REGEX, GRECAPTCHA_SITE_KEY} from '../../helpers/constants';

class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.gRecaptchaValue = null;
        this.grecaptchaObject = null;
    }

    onSubmitHandler = () => {
        const config = {
            headers: {'Content-Type': 'application/json'}
        };

        const formData = {
            username: username.value,
            email: email.value,
            subject: subject.value,
            message: message.value
        };

        // the form will only get submitted if the ggogle confirm that the submitter is not a bot
        if(this.gRecaptchaValue) {
            return axios
                .post('http://localhost:3000/api/contact-form', {gRecaptchaValue: this.gRecaptchaValue}, config)
                .then((response) => {
                    if(response.data.isHuman) {
                        this.sendEmail(formData);
                    }
                })
                .catch((err) => {
                    // console.info(`Error: Unable to send email - ${err}`);
                    toastr.error(`Error: Unable to send email - ${err}`);
                });
        }

        toastr.error('Prove that you are not a robot');

        return false;
    }

    sendEmail(formValues) {
        return axios
            .post(FORMSPREE_URL, formValues)
            .then((response) => {
                this.resetHandler();
                toastr.success(response.data.success);
            })
            .catch((err) => {
                // console.info(`Unable to send email: ${err}`);
                toastr.error(`Unable to send email: ${err}`);
            });
    }

    resetHandler = () => {
        this.props.reset();
        this.grecaptchaObject.reset();
        this.gRecaptchaValue = null;
    }

    renderField = (field) => {
        const {input, id, label, type, meta: { touched, error }} = field;
        return (
            <div> 
                <input id={id} className="w3-input" {...input} placeholder={label} type={type} required/>
                {touched && error ? <label className="w3-label w3-text-red">{error}</label> : <br/>}
            </div>
        );
    }

    renderTextArea = ({ input, id, label, type, meta: { touched, error } }) => {
        return (
            <textarea id={id} rows="4" className="w3-input" {...input} placeholder={label} type={type}/>
        );
    }

    // use by recaptcha component
    // grecaptcha is a value generated by recaptcha component
    // grecaptchaObject contains - reset method
    onChangeHandler = (value) => {
        this.gRecaptchaValue = value;
        this.grecaptchaObject = grecaptcha;
    }

    render() {
        const {handleSubmit, pristine, valid, submitting, reset} = this.props;
        
        return (
            <div className="form-contact-us">
                <form onSubmit={handleSubmit(this.onSubmitHandler)}>
                    <Field id="username" name="username" type="text" component={this.renderField} label="Username"/>
                    <Field id="email" name="email" type="email" component={this.renderField} label="Email"/>
                    <Field id="subject" name="subject" type="text" component={this.renderField} label="Subject"/>
                    <Field id="message" name="message" type="textarea" component={this.renderTextArea} label="Message"/>
                    <br/>
                    <ReCAPTCHA
                            id="captcha"
                            onChange={this.onChangeHandler}
                            className="captcha"
                            ref="recaptcha"
                            sitekey={GRECAPTCHA_SITE_KEY}/>
                    <br/>
                    <div>
                        <button className="w3-button w3-blue w3-border" type="submit" disabled={pristine || submitting || !valid}>Submit</button>
                        <button className="w3-button w3-red w3-border" type="button" disabled={pristine || submitting} onClick={this.resetHandler}>Reset</button>
                    </div>
                </form>
            </div>
        );
    }
}

ContactForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired
};

const validate = (values) => {
    const errors = {};

    if(!values.username) {
        errors.username = 'Required';
    } else if(values.username.trim().length < 2) {
        errors.username = 'Must be at least 3 characters.';
    }

    if(!values.email) {
        errors.email = 'Required';
    } else if(!EMAIL_REGEX.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if(!values.subject) {
        errors.subject = 'Required';
    } else if(values.subject.trim().length < 3) {
        errors.subject = 'Must be at least 3 characters.';
    }

    if(!values.message) {
        errors.message = 'Required';
    }

    return errors;
};

export default reduxForm({
    form: 'contact-form',
    validate
})(ContactForm);
