import React, {PropTypes} from 'react';
import MdArrowUpward from 'react-icons/lib/md/arrow-upward';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaPinterestP from 'react-icons/lib/fa/pinterest-p';
import FaYoutube from 'react-icons/lib/fa/youtube';
import zenscroll from 'zenscroll';

const scrollTo = (selectorId, isMobile) => {
    const element = document.getElementById(selectorId);
    zenscroll.to(element);
}

const Footer = ({startYear}) => {
    return (
        <footer className="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off">
            <a className="w3-button"
                onClick={scrollTo.bind(null, 'home', false)}>
                <MdArrowUpward width="1.5rem" height="1.5rem" className="md-arrow-upward"/>To the top
            </a>
            <div className="w3-xlarge w3-section">
                <FaFacebook className="w3-hover-text-indigo"/>&nbsp;
                <FaTwitter className="w3-hover-text-purple"/>&nbsp;
                <FaPinterestP className="w3-hover-text-yellow"/>&nbsp;
                <FaYoutube className="w3-hover-text-red"/>
            </div>
            
            <p>&copy; { `${startYear}-${new Date().getFullYear()} Villa Rose of Sharon` }</p>
        </footer>
    );
};

Footer.PropTypes = {
    startYear: PropTypes.string
};

export default Footer;