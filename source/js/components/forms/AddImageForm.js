import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import {closeModal} from '../../actions/modal.actions';
import {uploadImage} from '../../actions/form.actions';

class AddImageForm extends Component {
    constructor(props) {
        super(props);
    }

    onFormSubmit = ({filename, caption, gallery}) => {
        const {uploadImage} = this.props;
        const formData = new FormData();

        formData.append('filename', filename[0]);
        formData.append('gallery', gallery);
        formData.append('caption', caption ? caption : '');
        
        uploadImage(formData);
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

    renderDropzoneComponent(field) {
        const {input, name, label, meta: {touched, error, dirty}} = field;
        const files = input.value;

        return (
            <div className={(touched || dirty) && error ? 'w3-text-red' : ''}>
                <Dropzone className="react-dropzone"
                    name={name}
                    onDrop={(filesToUpload) => input.onChange(filesToUpload)}>
                    {
                        files && Array.isArray(files) ?
                            (
                                <div className="react-dropzone-field">
                                    { files.map((file) => file.name )}
                                </div>
                            ) :
                            (
                                <div className="react-dropzone-field-init w3-opacity">
                                    drop files here, or click to browse
                                </div>
                            )
                    }
                </Dropzone>
                {dirty && error && (<div className="w3-text-red">{error}</div>)}
            </div>
        );
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, invalid, closeModal} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onFormSubmit)} className="add-image-form w3-container">
                <Field id="gallery" name="gallery" component="input" type="hidden"/>
                <Field id="filename" name="filename" type="text" component={this.renderDropzoneComponent} label="Filename"/>
                <br/>
                <Field id="caption" name="caption" type="text" component={this.renderField} label="Caption"/>
           
                <div className="w3-bar w3-right-align">
                    <button type="submit" className="w3-button w3-medium w3-blue" disabled={pristine || invalid || submitting}>Submit</button>
                    <button className="w3-button w3-medium w3-red" type="button" disabled={pristine || submitting} onClick={reset}>Clear</button>
                    <button onClick={closeModal} type="button" className="w3-button w3-medium w3-grey" disabled={submitting}>Cancel</button>
                </div>
            </form>
        );
    }
}

AddImageForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        initialValues: {gallery: state.modal.galleryType}
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal,
        uploadImage
    }, dispatch);
};

const validate = (values) => {
    const errors = {};
    const reg = /\.(jpeg|jpg|png|gif|bmp)$/;

    if (!values.filename) {
        errors.filename = 'Required';
    } else if (values.filename[0].name.length > 0 && !reg.test(values.filename[0].name)) {
        errors.filename = 'Only file end with .jpg | .jpeg | .png';
    }

    return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'add-image-form',
    enableReinitialize : true,
    validate
})(AddImageForm));