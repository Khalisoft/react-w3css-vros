import React, {Component, PropTypes} from 'react';

import Rate from '../Rate';
import Slideshow from '../Slideshow';

const style = {
    blockQuote: {marginTop: 0, marginBottom: 0}
};

const About = ({images, address, rate, aboutPage}) => {
    return (
        <div id="about" className="w3-content w3-container w3-padding-32 section">
            <blockquote className="w3-panel w3-leftbar">
                <p className="w3-center w3-text-orange vros-blockquote" style={style.blockQuote}>
                    <em>{aboutPage[0]}</em>
                </p>
            </blockquote>
            <div className="w3-row row-1">
                <div className="w3-col m6 col-1">
                    <p>{aboutPage[1]}</p>
                    <p>{aboutPage[2]}</p>
                </div>
                <div className="w3-col m6 col-2">
                    <Rate rate={rate}/>
                </div>
            </div>
            <br/>
            <div className="w3-row row-2">
                <div className="w3-col m6 col-1" style={{float: 'right'}}>
                    <p>{aboutPage[3]}</p>
                </div>
                <div className="w3-col m6 w3-center col-2" style={{float: 'left'}}>
                    <Slideshow images={images}/>
                </div>
            </div>
        </div>
    );
}

About.propTypes = {
    address: PropTypes.object.isRequired,
    rate: PropTypes.object.isRequired,
    aboutPage: PropTypes.array,
    images: PropTypes.array.isRequired
};

export default About;