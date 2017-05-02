import React, {PropTypes} from 'react';
import MdClose from 'react-icons/lib/md/close';

import {X_SMALL_SCREEN, SMALL_SCREEN} from '../../helpers/constants';
import {TABLINK, TABPANEL, TABLINKBORDERBOTTOM} from './tabHelpers';

const renderChildren = (children, tabPartialComponent) => {
    try {
        if(children) {
            const linkChildren = children.filter((child) => {
                const name = child.type.name;
                return name === tabPartialComponent;
            });

            return linkChildren;
        } else {
            throw `There is no ${tabPartialComponent} children to render`;
        }
    } catch(error) {
        console.error(error);
    }
}

export const Tab = (props) => {
    const {children, tabId, isVerticalMenu, width, isSlideSidebar, toggleSidebar, screenSize} = props;
    const style = {
        links: isVerticalMenu ? {width: width} : {display: "block"},
        panel: isVerticalMenu ? 
            (
                isSlideSidebar && (screenSize === SMALL_SCREEN || screenSize === X_SMALL_SCREEN) ? 
                    {marginLeft: 0} : 
                    {marginLeft: width}
            ) : 
            {marginLeft: 0},
        slideSidebar: isSlideSidebar && (screenSize === SMALL_SCREEN || screenSize === X_SMALL_SCREEN) ? 
            {display: 'none'} : 
            {display: 'block'}
    };
    
    return (
        <section id={tabId} className="w3-row">
            <div className={`${isSlideSidebar ? 'w3-animate-left' : ''}`} style={style.slideSidebar}>
                <div 
                    className = {
                        `${isVerticalMenu ? 'w3-sidebar w3-bar-block' : 'w3-bar'} w3-light-grey w3-card-2`
                    } 
                    style = {style.links} >
                    <button onClick={toggleSidebar.bind(null, 'main-tab', 130)} className="sidebar-close-btn w3-hide-medium w3-hide-large w3-button w3-text-red"
                        style={{display: `${isVerticalMenu && isSlideSidebar ? 'block' : 'none'}`}}>
                        <MdClose width="1.5rem" height="1.5rem" className="md-close"/>
                    </button>
                    {renderChildren(children, TABLINK)}
                </div>
            </div>
            <div style={style.panel}>
                {renderChildren(children, TABPANEL)}
            </div>
        </section>
    );
};

Tab.propTypes = {
    children: PropTypes.node.isRequired,
    tabId: PropTypes.string.isRequired,
    width: PropTypes.number,
    isSlideSidebar: PropTypes.bool,
    isVerticalMenu: PropTypes.bool,
    toggleSidebar: PropTypes.func.isRequired,
    screenSize: PropTypes.string.isRequired
};

export const TabBorderBottom = (props) => {
    const {children, tabId} = props;

    return (
        <section id={tabId} className="w3-row">
            <div className="w3-center">
                {renderChildren(children, TABLINKBORDERBOTTOM)}
            </div>
            <div>
                {renderChildren(children, TABPANEL)}
            </div>
        </section>
    );
};

TabBorderBottom.propTypes = {
    children: PropTypes.node.isRequired,
    tabId: PropTypes.string.isRequired
};