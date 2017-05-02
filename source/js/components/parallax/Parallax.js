import React, {PropTypes} from 'react';

const Parallax = ({image, label}) => {
    const style = {
        height: 400,
        backgroundImage: `url('${image}')`
    };

    return (
        <div style={style} className="bgimg-2 w3-display-container w3-opacity-min parallax">
            <div className="w3-display-middle">
                <span className="w3-xxlarge w3-text-light-grey w3-wide">{label}</span>
            </div>
        </div>
    );
};

Parallax.PropTypes = {
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default Parallax;