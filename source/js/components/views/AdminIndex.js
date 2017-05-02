import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr';
import debounce from 'lodash.debounce';

import {getScreenSize} from '../../helpers/screen';
import {SMALL_SCREEN} from '../../helpers/constants';
import {menu} from '../../helpers/constants';
import MainTab from '../../components/MainTab';
import Navbar from '../Navbar';
import LoginForm from '../forms/LoginForm';
import SortableGrid from '../../components/sortableGrid/SortableGrid';
import {toggleSidebar} from '../../components/tabs/tabHelpers';
import W3Modal from '../W3Modal';
import AddImageForm from '../forms/AddImageForm';
import UpdateCaptionForm from '../../components/forms/UpdateCaptionForm';
import UpdateRateForm from '../forms/UpdateRateForm';
import UpdateAddressForm from '../forms/UpdateAddressForm';
import UpdateCoordinateForm from '../forms/UpdateCoordinateForm';
import UpdateParagraphForm from '../forms/UpdateParagraphForm';
import TwoColumnsTable from '../TwoColumnsTable.js';
import {
    ADD_IMAGE, 
    UPDATE_CAPTION, 
    UPDATE_ADDRESS, 
    UPDATE_RATE, 
    UPDATE_MAP_COORDINATE,
    UPDATE_PARAGRAPH
} from '../../helpers/constants';

class AdminIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screenSize: getScreenSize(window.innerWidth)
        };
    }

    renderModal = () => {
        let title, Form, formProps;
        const {isOpen, galleryType, modalFor, item} = this.props.modal;
        
        if(isOpen) {
            console.info("Openning modal");
            switch(modalFor) {
                case ADD_IMAGE:
                    title = "Add New Image";
                    Form = AddImageForm;
                    formProps = {};
                    break;
                case UPDATE_CAPTION:
                    title = 'Update Image Caption';
                    Form = UpdateCaptionForm;
                    formProps = {item};
                    break;
                case UPDATE_ADDRESS:
                    title = 'Update Address';
                    Form = UpdateAddressForm;
                    formProps = {item, rowWidth: 80};
                    break;
                case UPDATE_RATE:
                    title = 'Update Rate';
                    Form = UpdateRateForm;
                    formProps = {item, rowWidth: 110};
                    break;
                case UPDATE_MAP_COORDINATE:
                    title = 'Update Map Coordinate';
                    Form = UpdateCoordinateForm;
                    formProps = {item, rowWidth: 50};
                    break;
                case UPDATE_PARAGRAPH:
                    title = 'Update Paragraph';
                    Form = UpdateParagraphForm;
                    formProps = {item};
                    break;
                default:
                    title = "No matched form";
            }

            return <W3Modal>
                    <h2 className="w3-center">{title}</h2>
                    <Form galleryType={galleryType}
                        close-modal={this.closeModal}
                        {...formProps}/>
                </W3Modal>;
        }

        return '';
    }

    onResizeHandler = () => {
        this.setState({screenSize: getScreenSize(window.innerWidth)});
    }

    componentDidMount() {
        addEventListener('resize', debounce(() => {
            this.onResizeHandler();
        }, 100));
    }

    render() {
        const {authenticated, data} = this.props;
        
        return authenticated ? (
            <section id="vros-admin" className="wrapper w3-padding-64">
                <Navbar toggleSlidebar={toggleSidebar.bind(null, 'main-tab', 130)} isAdmin={true} menuItems={menu.admin} branding={menu.branding}/>
                <div className="w3-content">
                    <MainTab data={data.toJS()} screenSize={this.state.screenSize}/>
                </div>
                {this.renderModal()}
            </section>
        )
        : (
            <section id="vros-admin" className="wrapper w3-display-container" style={{height: window.innerHeight}}>
                <LoginForm/>
            </section>
        );
    }
}

AdminIndex.propTypes = {
    data: PropTypes.object.isRequired,
    authenticated: PropTypes.bool,
    modal: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        modal: state.modal
    };
};

export default connect(mapStateToProps, null)(AdminIndex);