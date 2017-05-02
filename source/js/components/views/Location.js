import React, {PropTypes} from 'react';
import GoogleMap from '../GoogleMap';
import ContactForm from '../forms/ContactForm';
import MdMail from 'react-icons/lib/md/mail';
import MdPhone from 'react-icons/lib/md/phone';
import MdAddLocation from 'react-icons/lib/md/add-location';

const Location = ({address, locationPage, coordinate}) => { 
    const {name, street, city, province, country, phone, email} = address;
    const style = {
        width: {width: 40},
        marginTop: {marginTop: 15},
        pMarginTop: {marginTop: 0}
    }
    
    return (
        <div className="w3-content w3-container w3-padding-32 section" id="location">
            <p style={style.pMarginTop}>{locationPage[0]}</p>
            
            <div className="w3-row w3-section row-1">
                <div className="w3-col m6 col-1"  style={style.marginTop}>
                    <div className="w3-large w3-margin-bottom">
                        <div className="w3-row">
                            <div className="w3-col" style={style.width}>
                                <MdAddLocation className="w3-hover-text-black w3-xlarge"/>
                            </div>
                            <div className="w3-rest">{street}</div>
                        </div>
                        <div className="w3-row">
                            <div className="w3-col w3-container" style={style.width}></div>
                            <div className="w3-rest">{city}, {province}</div>
                        </div>
                        <div className="w3-row">
                            <div className="w3-col w3-container" style={style.width}></div>
                            <div className="w3-rest">{country}</div>
                        </div>
                        <div className="w3-row">
                            <div className="w3-col" style={style.width}>
                                <MdPhone className="w3-hover-text-black w3-xlarge"/>
                            </div>
                            <div className="w3-rest">{phone[0]}</div>
                        </div>
                        <div className="w3-row">
                            <div className="w3-col w3-container" style={style.width}></div>
                            <div className="w3-rest">{phone[1]}</div>
                        </div>
                        <div className="w3-row">
                            <div className="w3-col" style={style.width}>
                                <MdMail className="w3-hover-text-black w3-xlarge"/>
                            </div>
                            <div className="w3-rest">Email: {email}</div>
                        </div>
                    </div>
                    <GoogleMap coordinate={coordinate}/>
                </div>
                <div className="w3-col m6 col-2" style={{marginTop: 16}}>
                    <p style={{marginTop: 0}}>Leave me a note:</p>
                    <ContactForm/>
                </div>
            </div>
        </div>
    );
};

Location.propTypes = {
    address: PropTypes.object.isRequired,
    locationPage: PropTypes.array,
    coordinate: PropTypes.object.isRequired
}

export default Location;