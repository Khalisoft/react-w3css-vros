import React, {PropTypes} from 'react';

import {Tab, TabLink, TabPanel} from '../components/tabs';
import {toggleSidebar} from '../components/tabs/tabHelpers';
import GalleriesTab from '../components/GalleriesTab';
import ParagraphsTab from '../components/ParagraphsTab';
import {openMainTab} from '../components/tabs/tabHelpers';
import TwoColumnsTable from './TwoColumnsTable';
import {
    ADD_IMAGE, 
    UPDATE_CAPTION, 
    UPDATE_ADDRESS, 
    UPDATE_RATE, 
    UPDATE_MAP_COORDINATE,
    UPDATE_PARAGRAPH
} from '../helpers/constants';

const MainTab = (props) => {
    const {screenSize} = props;
    const {
        aboutPage, 
        locationPage, 
        galleryPage, 
        address, 
        rate, 
        gallery, 
        parallax, 
        slideshow,
        mapCoordinate
    } = props.data;
    const mainTabId = 'main-tab';
    const tabPanelId = {
        galleries: 'galleries-panel',
        rate: 'rate-panel',
        address: 'address-panel',
        googleMap: 'google-map-panel',
        paragraphs: 'paragraphs-panel'
    };
    
    return (
        <Tab tabId={mainTabId} isVerticalMenu={true} width={130} isSlideSidebar={true} toggleSidebar={toggleSidebar} screenSize={screenSize}>
            <TabLink openTab={openMainTab} tabId={mainTabId} tabPanelId={tabPanelId.galleries} label="Galleries" isActive={true}/>
            <TabLink openTab={openMainTab} tabId={mainTabId} tabPanelId={tabPanelId.rate} label="Rate"/>
            <TabLink openTab={openMainTab} tabId={mainTabId} tabPanelId={tabPanelId.address} label="Address"/>
            <TabLink openTab={openMainTab} tabId={mainTabId} tabPanelId={tabPanelId.googleMap} label="Google Map"/>
            <TabLink openTab={openMainTab} tabId={mainTabId} tabPanelId={tabPanelId.paragraphs} label="Paragraphs"/>

            <TabPanel tabId={mainTabId} tabPanelId={tabPanelId.galleries} isActive={true}>
                <GalleriesTab gallery={gallery} parallax={parallax} slideshow={slideshow}/>
            </TabPanel>
            <TabPanel tabId={mainTabId} tabPanelId={tabPanelId.rate}>
                <TwoColumnsTable tableWidth={200} colWidth={100} title="Rate" obj={rate} modalFor={UPDATE_RATE}/>
            </TabPanel>
            <TabPanel tabId={mainTabId} tabPanelId={tabPanelId.address}>
                <TwoColumnsTable tableWidth={370} colWidth={80} title="Address" obj={address} modalFor={UPDATE_ADDRESS}/>
            </TabPanel>
            <TabPanel tabId={mainTabId} tabPanelId={tabPanelId.googleMap}>
                <TwoColumnsTable tableWidth={200} colWidth={50} title="Map Coordinate" obj={mapCoordinate} modalFor={UPDATE_MAP_COORDINATE}/>
            </TabPanel>
            <TabPanel tabId={mainTabId} tabPanelId={tabPanelId.paragraphs}>
                <ParagraphsTab aboutPage={aboutPage} locationPage={locationPage} galleryPage={galleryPage}/>
            </TabPanel>
        </Tab>
    );
};

MainTab.propTypes = {
    data: PropTypes.object.isRequired,
    screenSize: PropTypes.string.isRequired
};

export default MainTab;