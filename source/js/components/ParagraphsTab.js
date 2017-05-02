import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {TabBorderBottom, TabLinkBorderBottom, TabPanel} from '../components/tabs';
import MdCreate from 'react-icons/lib/md/create';
import uid from 'uid';

import {openModal} from '../actions/modal.actions';
import {openBorderTab} from '../components/tabs/tabHelpers';
import {UPDATE_PARAGRAPH} from '../helpers/constants';

import UpdateParagraphForm from '../components/forms/UpdateParagraphForm';

const renderParagraphs = (openModal, praragraphs, page) => {
     const paragraphs = praragraphs.map((paragraph, i) => {
        const payload = {
            isOpen: true,
            item: {page: page, i: i, paragraph: paragraph},
            modalFor: UPDATE_PARAGRAPH
        };

        return (
            <div key={uid()} className="w3-panel w3-card-8">
                <p>{paragraph}</p>
                <div className="clear-fix" style={{paddingBottom: 16}}>
                    <button 
                        onClick={openModal.bind(null, payload)} 
                        className="w3-button w3-medium w3-teal" 
                        style={{float: 'right'}}>
                        <MdCreate className="md-create"/>
                    </button>
                </div>
            </div>
        );
    });

    return paragraphs;
};

const ParagraphsTab = (props) => {
    const {openModal, aboutPage, locationPage, galleryPage} = props;
    const paragraphsTabId = 'paragraphs-tab';
    const tabPanelId = {
        about: 'about-panel',
        location: 'location-panel',
        gallery: 'gallery-panel'
    };
    
    return (
        <TabBorderBottom tabId={paragraphsTabId} isVerticalMenu={true} width={130}>
            <TabLinkBorderBottom openTab={openBorderTab} tabId={paragraphsTabId} tabPanelId={tabPanelId.about} label="About" isActive={true}/>
            <TabLinkBorderBottom openTab={openBorderTab} tabId={paragraphsTabId} tabPanelId={tabPanelId.location} label="Location"/>
            <TabLinkBorderBottom openTab={openBorderTab} tabId={paragraphsTabId} tabPanelId={tabPanelId.gallery} label="Gallery"/>
        
            <TabPanel tabId={paragraphsTabId} tabPanelId={tabPanelId.about} isActive={true}>
                <h2 className="w3-center">About Page</h2>
                {renderParagraphs(openModal, aboutPage, 'about')}
            </TabPanel>
            <TabPanel tabId={paragraphsTabId} tabPanelId={tabPanelId.location}>
                <h2 className="w3-center">Location Page</h2>
                {renderParagraphs(openModal, locationPage, 'location')}
            </TabPanel>
            <TabPanel tabId={paragraphsTabId} tabPanelId={tabPanelId.gallery}>
                <h2 className="w3-center">Gallery Page</h2>
                {renderParagraphs(openModal, galleryPage, 'gallery')}
            </TabPanel>
        </TabBorderBottom>
    );
};

ParagraphsTab.PropTypes = {
    openModal: PropTypes.func.isRequired,
    aboutPage: PropTypes.array,
    locationPage: PropTypes,
    galleryPage: PropTypes
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openModal
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(ParagraphsTab);
