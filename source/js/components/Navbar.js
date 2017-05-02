import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import MdExitToApp from 'react-icons/lib/md/exit-to-app';
import MdMenu from 'react-icons/lib/md/menu';
import uid from 'uid';
import zenscroll from 'zenscroll';

class Navbar extends Component {
    constructor(props) {
        super(props);

        zenscroll.setup(700, 50);
    }

    scrollTo = (selectorId, isMobile) => {
        const element = document.getElementById(selectorId);
        zenscroll.to(element);
        
        if(isMobile) this.toggleMobileMenu();
    }

    renderMenuItem = (label, isSmallScreen, isAdmin) => {
        return (
            <a  id={`btn-${label.toLowerCase()}`}
                key={uid()}
                className={`w3-bar-item w3-button ${isAdmin ? 'float-right ' : isSmallScreen ? '' : 'w3-hide-small'}`}
                onClick={this.scrollTo.bind(null, `${label.toLowerCase()}`, isSmallScreen)}>
                {isAdmin ? <MdExitToApp width="1.5rem" height="1.5rem" className="md-exit-to-app"/>  : label.toUpperCase()}
            </a>
        );
    }

    toggleMobileMenu = () => {
        const  vrosMobileNavbar = document.getElementById("vros-mobile-navbar");

        if (vrosMobileNavbar.className.indexOf("w3-show") == -1) {
            vrosMobileNavbar.className += " w3-show";
        } else {
            vrosMobileNavbar.className = vrosMobileNavbar.className.replace(" w3-show", "");
        }
    }

    toggleSlidebar = () => {
        this.props.toggleSlidebar();
    }

    onScrollHandler = () => {
        const navbar = document.getElementById("vros-navbar");

        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            navbar.className = "w3-bar w3-card-2 w3-animate-top w3-white";
        } else {
            navbar.className = navbar.className.replace(" w3-card-2 w3-animate-top w3-white", "");
        }
    }

    componentDidMount() {
        addEventListener('scroll', this.onScrollHandler); 
    }

    // Not to rerender this component.
    // The changes will be made by manipulate the DOM
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {branding, isAdmin, menuItems} = this.props;
        
        return (
            <nav id="main-navbar" className={`w3-top ${isAdmin ? 'w3-white' : ''}`}>
                <div  id="vros-navbar"className="w3-bar">
                    <a id="ham-bar" 
                        className="w3-bar-item w3-button w3-hover-black w3-hide-medium w3-hide-large w3-right"
                        onClick={isAdmin ? this.toggleSlidebar : this.toggleMobileMenu} 
                        title="Toggle Navigation Menu">
                        <MdMenu width="1.5rem" height="1.5rem" className="md-menu"/>
                    </a>

                    {
                        isAdmin ? (
                            <Link to="/" id="btn-home" className="w3-bar-item w3-button">{branding.toUpperCase()}</Link>
                        ) : (
                            <a id="btn-home" className="w3-bar-item w3-button"
                                onClick={this.scrollTo.bind(null, 'home', false)}>
                                {branding.toUpperCase()}
                            </a>
                        )
                    }
                    
                    {menuItems.map((item, i) => {return this.renderMenuItem(item, false, isAdmin);})}
                </div>
                {isAdmin ? '' : (
                    <div id="vros-mobile-navbar"
                        className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium">
                        {menuItems.map((item, i) => {return this.renderMenuItem(item, true, isAdmin);})}
                    </div>
                )}
            </nav>  
        );
    }
}

Navbar.propTypes = {
    branding: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool,
    menuItems: PropTypes.array.isRequired
};

export default Navbar;