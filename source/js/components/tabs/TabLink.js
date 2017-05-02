import React, {PropTypes} from 'react';

/**
 * Description:
 *  openTab - function that takes tabId and tabPanelId as arguments
 *          - it set active panel visible and hide the rest
 *  tabId - required and must be the same as the one set in Tab component 
 *  tabPanelId - required and must be the as the one set in TabPanel component 
 *  isActive - set the deault tab
 *  label - the text for the link
 * 
 * @param {object} 
 */
export const TabLink = ({openTab, tabId, tabPanelId, label, isActive}) => {
    return (
        <button 
            id={`${tabPanelId}-link`}
            className={`w3-bar-item w3-button ${tabId}-link ${isActive ? 'w3-red' : ''}`}
            onClick={openTab.bind(null, tabId, tabPanelId)}>{label}</button>
    );
};

TabLink.PropTypes = {
    openTab: PropTypes.func.isRequired,
    tabId: PropTypes.string.isRequired,
    tabPanelId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool
};

export const TabLinkBorderBottom = ({openTab, tabId, tabPanelId, label, isActive}) => {
    return (
        <a 
            id={`${tabPanelId}-link`}
            className={`${tabId}-link`}
            onClick={openTab.bind(null, tabId, tabPanelId)}>
            <div className={`w3-center w3-bottombar w3-hover-light-grey w3-padding-small ${isActive ? 'w3-border-red' : ''}`} 
                style={{display: 'inline-block'}}>
                {label}
            </div>    
        </a>
    );
};

TabLinkBorderBottom.propTypes = {
    openTab: PropTypes.func.isRequired,
    tabId: PropTypes.string.isRequired,
    tabPanelId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool
};