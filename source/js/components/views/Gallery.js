import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import chunk from 'lodash.chunk';
import uid from 'uid';

import {store} from '../../index';
import {OPEN_MODAL} from '../../actions/action.types';
import {openModal} from '../../actions/modal.actions';
import {getImagesPerRow} from '../../helpers/screen.js';
import {LIGHTBOX, X_SMALL_SCREEN} from '../../helpers/constants'

const onClickHandler = (src) => {
    document.getElementById("img01").src = src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    // captionText.innerHTML = element.alt;
};

const renderImageDivs = (images, openModal, imagesPerRow, screenSize) => {
    const style = {
        width:"100%"
    };

    const imageDivs = images.map((image, i) => {
        const payload = {
            isOpen: true,
            item: image.MD,
            modalFor: LIGHTBOX
        };

        return (
            <div key={uid(10)} 
                className={`w3-col s6 m${12/imagesPerRow}`}
                style={{width: screenSize === X_SMALL_SCREEN ? '100%' : 'block'}}>
                <img 
                    onClick={openModal.bind(null, payload)} 
                    src={screenSize === X_SMALL_SCREEN ? image.thumbnail_mobile : image.thumbnail} 
                    style={style} 
                    className="w3-hover-opacity" alt=""/>
            </div>
        );
    });

    const rowsOfImages = chunk(imageDivs, imagesPerRow);

    return rowsOfImages;
};

const renderRows = (rowsOfImages) => {
    const rows = rowsOfImages.map((rowOfImages, i) => {
        return (
            <div key={uid(10)} className={`w3-row-padding w3-center ${i > 0 ? "w3-section" : ""}`}>
                {[...rowOfImages]}
            </div>
        );
    });  

    return rows;
};

// openModal is from props which generate by dispatcher
const Gallery = ({images, openModal, screen}) => {
    const imagesPerRow = getImagesPerRow(screen.size);
    const rowsOfImages = renderImageDivs(images, openModal, imagesPerRow, screen.size);
    const rows = renderRows(rowsOfImages);
    
    return (
        <div id="gallery" className="w3-content w3-padding-32 section">
            {[...rows]}
        </div>
    );
};

Gallery.PropTypes = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
    screen: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        screen: state.screen
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({openModal}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);