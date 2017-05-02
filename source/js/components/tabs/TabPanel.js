import React, {PropTypes} from 'react';

/**
 * Description:
 *  tabPanelId - unique name for the panel and is to be provided to TabLink component 
 *  isActive - set default panel
 * 
 * @param {object}  
 */
export const TabPanel = ({children, tabId, tabPanelId, isActive}) => {
    return (
            <div id={tabPanelId} 
                className={`w3-animate-opacity ${tabId}-panel ${isActive ? 'show' : 'hide'}`}>
                {children}
            </div>
        );
};

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    tabId: PropTypes.string.isRequired,
    tabPanelId: PropTypes.string.isRequired,
    isActive: PropTypes.bool
};