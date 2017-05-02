import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import debounce from 'lodash.debounce';

import Navbar from '../Navbar';
import HeaderParallax from '../parallax/HeaderParallax';
import Parallax from '../parallax/Parallax';
import About from './About';
import Location from './Location';
import Gallery from './Gallery';
import Footer from './Footer';
import W3Modal from '../W3Modal';
import {screenHeightChange, screenSizeChange} from '../../actions/screen.actions';
import {getScreenSize} from '../../helpers/screen';
import {menu, LIGHTBOX, SMALL_SCREEN} from '../../helpers/constants';
import {scrollspy} from '../scrollspy/scrollspy';

class PublicIndex extends Component {
    constructor(props) {
        super(props);

        this.screenHeight = window.innerHeight;
        this.screenSize = getScreenSize(window.innerWidth);
    }

    renderModal = () => {
        let imageEl;
        const {isOpen, item, modalFor} = this.props.modal;

        if(isOpen) {
            switch(modalFor) {
                case LIGHTBOX:
                    imageEl = <img src={item} style={{width: "100%"}}/>;
                    return <W3Modal>{imageEl}</W3Modal>;
            }
        }

        return '';
    }

    onResizeHandler = () => {
        const newScreenHeight = window.innerHeight;
        const newScreenSize = getScreenSize(window.innerWidth);
        
        if(this.screenHeight !== newScreenHeight) {
            this.screenHeight = newScreenHeight;

            // dispatch action once the screen size has changed
            this.props.screenHeightChange(this.screenHeight);
        }

        if(this.screenSize !== newScreenSize) {
            this.screenSize = newScreenSize;

            this.props.screenSizeChange(this.screenSize);
        }
    }

    
    onScrollStop = ( callback ) => {
        // Make sure a valid callback was provided
        if ( !callback || Object.prototype.toString.call( callback ) !== '[object Function]' ) return;
        // Setup scrolling variable
        var isScrolling;
        // Listen for scroll events
        window.addEventListener('scroll', function ( event ) {
            event.preventDefault();
            event.stopPropagation();
            // Clear our timeout throughout the scroll
            window.clearTimeout( isScrolling );
            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {
                // Run the callback
                callback();
            }, 50);
        }, false);
    }

    initScrollspy = () => {
        let sectionScrollTops = {};
        const offset = -55;
        const activeClass = 'w3-text-red';
        const commonClass = 'w3-bar-item';
        const omitEl = 'btn-home';
        const vrosNavbarEl = document.getElementById('main-navbar');
        const sections = document.getElementsByClassName('section');

        [...sections].forEach((e) => {
            sectionScrollTops[e.id] = e.offsetTop + offset;
        });
        
        addEventListener('resize', debounce(() => {
            [...sections].forEach((e) => {
                sectionScrollTops[e.id] = e.offsetTop + offset;
            });
        }, 100));

        this.onScrollStop(function () {
            const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
            
            for(let i in sectionScrollTops) {
                if(sectionScrollTops[i] <= scrollPosition) {
                    const btns = vrosNavbarEl.getElementsByClassName(commonClass);
                    
                    [...btns].forEach((btn) => {
                        btn.classList.contains(activeClass) ? btn.classList.remove(activeClass) : '';
                        btn.getAttribute('id') === `btn-${i}` ? btn.classList.add(activeClass) : '';
                        btn.getAttribute('id') === omitEl ? btn.classList.remove(activeClass) : '';
                        
                    });
                }
            }
        });
    }

    componentDidMount() {
        addEventListener('resize', debounce(this.onResizeHandler, 100));
        this.initScrollspy();
    }

    render() {
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
        } = this.props.data.toJS();
        
        return (
            <section className="wrapper">
                <Navbar isAdmin={false} menuItems={menu.public} branding={menu.branding}/>
                <HeaderParallax image={parallax[0].src} address={address}/>
                <About images={slideshow} address={address} rate={rate} aboutPage={aboutPage} />
                <Parallax image={parallax[1].src} label="LOCATION"/>
                <Location address={address} locationPage={locationPage} coordinate={mapCoordinate}/>
                <Parallax image={parallax[2].src} label="Gallery"/>
                <Gallery images={gallery}/>
                <Footer startYear="2007"/>
                
                {this.renderModal()}
            </section>
        );
    }
}

PublicIndex.propTypes = {
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        screenHeightChange,
        screenSizeChange
    }, dispatch);  
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicIndex);