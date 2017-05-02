import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import forEach from 'lodash.foreach';
import uid from 'uid';
import MdCreate from 'react-icons/lib/md/create';

import {openModal} from '../actions/modal.actions';
import {UPDATE_ADDRESS} from '../helpers/constants';

// converting object into array of objects
const rows = (obj) => {
    let items = [];

    forEach(obj, (value, key) => {
        items.push({key, value});
    });

    return items;
};

// Rearrange address to match mongoose model
const flattenAddress = (obj) => {
    const {name, street, city, province, country, phone, email} = obj;
    const addressObj = {
        name: name,
        street: street,
        city: city,
        province: province,
        country: country,
        phone1: phone[0],
        phone2: phone[1],
        email: email
    };

    return addressObj;
};

/**
 * Description:
 *      tableWidth - is the overall table width
 *      colWidth - is the width of the first column and column 2 will assume the rest of the table width
 * @param {object} props 
 */
const TwoColumnsTable = (props) => {
    const {openModal, modalFor, tableWidth, colWidth, title, obj} = props;
    const style = {
        table: {maxWidth: tableWidth, margin: '0 auto'},
        col: {width: colWidth},
        btn: {float: 'right'}
    };

    const modalPayload = {
        isOpen: true,
        item: modalFor === UPDATE_ADDRESS ? flattenAddress(obj) : obj,
        modalFor: modalFor
    };

    return (
         <div className="w3-container">
            <h2 className="w3-center">{title}</h2>
            <table className="w3-table w3-striped w3-center" style={style.table}>
                <tbody>
                {
                    rows(obj).map((row) => {
                        return row.key !== 'phone' ? (
                            <tr key={uid()}>
                                <td className="w3-right-align" style={style.col}>{row.key}</td>
                                <td className="w3-text-red">{row.value}</td>
                            </tr>
                        ) : (
                            <tr key={uid()}>
                                <td className="w3-right-align" style={style.col}>{row.key}</td>
                                <td className="w3-text-red">{row.value[0]} / {row.value[1]}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <br/>
            <div  style={style.table}>
                <button onClick={openModal.bind(null, modalPayload)} className="w3-button w3-medium w3-teal" style={style.btn}><MdCreate className="md-create"/></button>
            </div>
        </div>
    );
};

TwoColumnsTable.propTypes = {
    openModal: PropTypes.func.isRequired,
    modalFor: PropTypes.string.isRequired,
    tableWidth: PropTypes.number,
    colWidth: PropTypes.number,
    title: PropTypes.string.isRequired,
    obj: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openModal
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(TwoColumnsTable);