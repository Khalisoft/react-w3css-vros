import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const HeaderParallax = ({image, address}) => {
    const {name, city, province, country} = address;
    const style = {
        height: window.innerHeight,
        whiteSpace: "nowrap",
        backgroundImage: `url('${image}')`
    };
    
    return (
        <div id="home" style={{...style}} className="bgimg-1 w3-display-container section parallax">
            <div className="w3-display-middle">
                <div className="w3-text-white w3-center w3-padding-xlarge vros-bg-orange w3-wide w3-animate-opacity">
                    <h1>{name}</h1>
                    <h2>{city}, {province}</h2>
                    <h2>{country}</h2>
                </div>
            </div>
        </div>
    );
};

HeaderParallax.propTypes = {
    image: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        screen: state.screen
    };
};

export default connect(mapStateToProps, null)(HeaderParallax);