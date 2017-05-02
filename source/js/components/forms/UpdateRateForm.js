import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {closeModal} from '../../actions/modal.actions';
import {updateRate} from '../../actions/form.actions';

class UpdateRateForm extends Component {
    constructor(props) {
        super(props);

        this.updateRateHandler = this.updateRateHandler.bind(this);
    }

    updateRateHandler() {
        const rateObj = {
            startRate: startRate.value,
            guestRate: guestRate.value,
            checkIn: checkIn.value,
            checkOut: checkOut.value
        };
        
        this.props.updateRate(rateObj);
    }

    render() {
        const {closeModal, rowWidth, handleSubmit, pristine, submitting} = this.props;
        const style = {
            td: {paddingTop: 16, width: rowWidth}
        };

        return (
            <form className="rate-form w3-container" onSubmit={handleSubmit(this.updateRateHandler)}>
                <table className="w3-table w3-center">
                    <tbody>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="startRate">Start Rate</label>
                            </td>
                            <td className="">
                                <Field id="startRate" className="w3-input" name="startRate" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="guestRate">Guest Rate</label>
                            </td>
                            <td className="">
                                <Field id="guestRate" className="w3-input" name="guestRate" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="checkIn">Check in</label>
                            </td>
                            <td className="">
                                <Field id="checkIn" className="w3-input" name="checkIn" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="checkOut">Check Out</label>
                            </td>
                            <td className="">
                                <Field id="checkOut" className="w3-input" name="checkOut" component="input" type="text"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <div className="w3-bar w3-right-align" role="group" aria-label="button group">
                    <button className="w3-button w3-blue" type="submit" disabled={pristine || submitting}>Submit</button>
                    <button onClick={closeModal} className="w3-button w3-red" type="button" >Cancel</button>
                </div>
            </form>
        );
    }
}

UpdateRateForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
    updateRate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    rowWidth: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        initialValues: state.modal.item
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({closeModal, updateRate}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'update-rate-form',
    enableReinitialize : true
})(UpdateRateForm));
