import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TabBorderBottom, TabLinkBorderBottom, TabPanel} from '../components/tabs';
import SortableGrid from '../components/sortableGrid/SortableGrid';
import AddImageForm from '../components/forms/AddImageForm';
import MdAddAPhoto from 'react-icons/lib/md/add-a-photo';

import {openModal} from '../actions/modal.actions';
import {ADD_IMAGE, SMALL_SCREEN} from '../helpers/constants';
import {openBorderTab} from '../components/tabs/tabHelpers';

const addNewImageHandler = (openModal, galleryType) => {
    const payload = {
        isOpen: true,
        item: null,
        modalFor: ADD_IMAGE,
        galleryType: galleryType
    };
    
    openModal(payload);
};

const renderGallery = (title, openModal, images, galleryType) => {
    return (
        <div>
            <h2 className="w3-center">{title}</h2>
            <button className="w3-button w3-large" onClick={addNewImageHandler.bind(null, openModal, galleryType)} style={{backgroundColor: 'white'}}>
                <MdAddAPhoto width="2rem" height="2rem" className="md-add-photo"/>
            </button>
            <SortableGrid images={images} galleryType={galleryType}/>
        </div>
    );
};


const GalleriesTab = (props) => {
    const {gallery, parallax, slideshow, openModal} = props;
    const galleriesTabId = 'galleries-tab';
    const tabPanelId = {
        gallery: 'general-panel',
        parallax: 'parallax-panel',
        slideshow: 'slideshow-panel'
    };

    return (
        <TabBorderBottom tabId={galleriesTabId} isVerticalMenu={true} width={130}>
            <TabLinkBorderBottom openTab={openBorderTab} tabId={galleriesTabId} tabPanelId={tabPanelId.gallery} label="General" isActive={true}/>
            <TabLinkBorderBottom openTab={openBorderTab} tabId={galleriesTabId} tabPanelId={tabPanelId.parallax} label="Parallax"/>
            <TabLinkBorderBottom openTab={openBorderTab} tabId={galleriesTabId} tabPanelId={tabPanelId.slideshow} label="Slideshow"/>
        
            <TabPanel tabId={galleriesTabId} tabPanelId={tabPanelId.gallery} isActive={true}>
                {renderGallery('General Gallery', openModal, gallery, 'gallery')}
            </TabPanel>
            <TabPanel tabId={galleriesTabId} tabPanelId={tabPanelId.parallax}>
                {renderGallery('Parallax Gallery', openModal, parallax, 'parallax')}
            </TabPanel>
            <TabPanel tabId={galleriesTabId} tabPanelId={tabPanelId.slideshow}>
                {renderGallery('Slideshow Gallery', openModal, slideshow, 'slideshow')}
            </TabPanel>
        </TabBorderBottom>
    );
};

GalleriesTab.propTypes = {
    gallery: PropTypes.array.isRequired,
    parallax: PropTypes.array.isRequired,
    slideshow: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({openModal}, dispatch);
};

export default connect(null, mapDispatchToProps)(GalleriesTab);
