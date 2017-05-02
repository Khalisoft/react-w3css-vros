import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {closeModal} from '../../actions/modal.actions';
import {updateParagraph} from '../../actions/form.actions';

class UpdateParagraphForm extends Component {
    constructor(props) {
        super(props);
    }

    // form fields / values auto bind to the form handler
    updateParagraphHandler = (field) => {
        const paragraph = field.paragraph;
        const page = field.page;
        const index = field.i;
        
        this.props.updateParagraph(paragraph, page, index);
    }

    renderTextArea = ({ input, id, type, meta: { touched, error } }) => {
        return (
            <textarea id={id} rows="4" className="w3-input" {...input} type={type}/>
        );
    }

    render() {
        const {closeModal, rowWidth, handleSubmit, pristine, submitting} = this.props;
        const style = {
            td: {paddingTop: 16, width: rowWidth}
        };

        return (
            <form className="rate-form w3-container" onSubmit={handleSubmit(this.updateParagraphHandler)}>
                <Field id="paragraph" className="w3-input" name="paragraph" component={this.renderTextArea}/>
                <br/>
                <div className="w3-bar w3-right-align" role="group" aria-label="button group">
                    <button className="w3-button w3-blue" type="submit" disabled={pristine || submitting}>Submit</button>
                    <button onClick={closeModal} className="w3-button w3-red" type="button" >Cancel</button>
                </div>
            </form>
        );
    }
};

UpdateParagraphForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
    rowWidth: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        initialValues: state.modal.item
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({closeModal, updateParagraph}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'update-paragraph-form',
    enableReinitialize : true
})(UpdateParagraphForm));
