import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MdDelete from 'react-icons/lib/md/delete';
import MdCreate from 'react-icons/lib/md/create';
import SortableGridItem from './SortableGridItem';
import chunk from 'lodash.chunk';
import uid from 'uid';

import {UPDATE_CAPTION} from '../../helpers/constants';
import {deleteImage, updateListOrder} from '../../actions/form.actions';
import {openModal} from '../../actions/modal.actions';

class SortableGird extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            draggingIndex: null
        };
    }

    updateState = (obj) => {
        this.setState(obj);
    }

    updateCaptionHandler = (item, galleryType) => {
        const {openModal} = this.props;
        const payload = {
            isOpen: true,
            item: item,
            modalFor: UPDATE_CAPTION,
            galleryType: galleryType
        };
        
        openModal(payload);
    }

    renderCard = (item) => {
        const {deleteImage, images, galleryType} = this.props;
        return (
            <div className="card w3-card-2 card-item">
                <div className="drag-handle"></div>
                <div className="card-img">
                    <img src={item.thumbnail} />
                </div>
                <div className="btn-group">
                    <button onClick={this.updateCaptionHandler.bind(null, item, galleryType)} className="w3-button w3-medium w3-teal">
                        <MdCreate width="2rem" height="2rem" className="md-create"/>
                    </button>
                    <button onClick={deleteImage.bind(null, images, item._id, galleryType)} className="w3-button w3-medium w3-red">
                        <MdDelete width="2rem" height="2rem" className="md-delete"/>
                    </button>
                </div>
                
            </div>
        );
    }

    render() {
        const {images, updateListOrder, galleryType} = this.props;
        const imagesPerRow = 3;
        
        const gridItems = images.map(function (item, i) {
            return (
                <SortableGridItem
                    key={i}
                    updateState={this.updateState}
                    items={images}
                    draggingIndex={this.state.draggingIndex}
                    sortId={i}
                    galleryType={galleryType}
                    updateListOrder={updateListOrder}
                    outline="grid">{this.renderCard(item)}</SortableGridItem>
            );
        }, this);
        
        const rowsOfImages = chunk(gridItems, imagesPerRow);

        return (
            <section className="w3-content sortable-grid">
                {gridItems}
            </section>
        );
    }
}

SortableGird.propTypes = {
    images: PropTypes.array.isRequired,
    galleryType: PropTypes.string.isRequired,
    deleteImage: PropTypes.func.isRequired,
    updateListOrder: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteImage, 
        updateListOrder,
        openModal
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(SortableGird);