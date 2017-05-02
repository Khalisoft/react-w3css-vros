import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {closeModal} from '../../actions/modal.actions';
import {update} from '../../actions/form.actions';

class UpdateAddressForm extends Component {
    constructor(props) {
        super(props);

        this.updateAddressHandler = this.updateAddressHandler.bind(this);
    }

    updateAddressHandler() {
        const addressObj = {
            name: propertyname.value,
            street: street.value,
            city: city.value,
            province: province.value,
            country: country.value,
            phone: [phone1.value, phone2.value],
            email: emailaddress.value
        };

        this.props.update(addressObj, 'address');
    }

    render() {
        const {closeModal, rowWidth, handleSubmit, pristine, submitting} = this.props;
        const style = {
            td: {paddingTop: 16, width: rowWidth}
        };

        return (
            <form className="address-form w3-container" onSubmit={handleSubmit(this.updateAddressHandler)}>
                <table className="w3-table w3-center">
                    <tbody>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="name">Name</label>
                            </td>
                            <td className="">
                                <Field id="propertyname" className="w3-input" name="name" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="street">Street</label>
                            </td>
                            <td className="">
                                <Field id="street" className="w3-input" name="street" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="city">City</label>
                            </td>
                            <td className="">
                                <Field id="city" className="w3-input" name="city" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="province">Province</label>
                            </td>
                            <td className="">
                                <Field id="province" className="w3-input" name="province" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="country">Country</label>
                            </td>
                            <td className="">
                                <Field id="country" className="w3-input" name="country" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="phone1">Phone 1</label>
                            </td>
                            <td className="">
                                <Field id="phone1" className="w3-input" name="phone1" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="phone2">Phone 2</label>
                            </td>
                            <td className="">
                                <Field id="phone2" className="w3-input" name="phone2" component="input" type="text"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="w3-right-align" style={style.td}>
                                <label className="w3-label" htmlFor="email">Email</label>
                            </td>
                            <td className="">
                                <Field id="emailaddress" className="w3-input" name="email" component="input" type="text"/>
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

UpdateAddressForm.propTypes = {
    closeModal: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
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
    return bindActionCreators({closeModal, update}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'update-address-form'
})(UpdateAddressForm));
