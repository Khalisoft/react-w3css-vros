import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {closeModal} from '../../actions/modal.actions';
import {update} from '../../actions/form.actions';

class UpdateCoordinateForm extends Component {
    constructor(props) {
        super(props);

        this.updateRateHandler = this.updateRateHandler.bind(this);
    }

    updateRateHandler() {
        const coordinate = {
            lng: lng.value,
            lat: lat.value
        };

        this.props.update(coordinate, 'mapCoordinate');
    }

    render() {
        const {closeModal, rowWidth, handleSubmit, pristine, submitting} = this.props;
        const style = {td: {paddingTop: 16, width: rowWidth}};

        return (
            <form className="rate-form w3-container" onSubmit={handleSubmit(this.updateRateHandler)}>
                <table className="w3-table w3-center">
                    <tbody>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="lng">Lng:</label>
                            </td>
                            <td className="">
                                <Field id="lng" className="w3-input" name="lng" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="lat">Lat:</label>
                            </td>
                            <td className="">
                                <Field id="lat" className="w3-input" name="lat" component="input" type="text"/>
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

UpdateCoordinateForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    rowWidth: PropTypes.number,
    update: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        initialValues: state.modal.item
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({closeModal, update}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'update-coordinate-form'
})(UpdateCoordinateForm));
