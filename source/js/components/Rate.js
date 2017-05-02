import React, {PropTypes} from 'react';

const Rate = ({rate}) => {    
    const {startRate, guestRate, checkin, checkout} = rate;
    return (
        <div className="w3-card-4 vros-card-bg-orange">
            <ul className="w3-ul w3-border w3-text-white">
              <li className="w3-center rate">
                <h2>Rate</h2>
              </li>
              <li>Rates starting from <span className="bold italic">${startRate} tt</span> per night (based on double occupancy).</li>
              <li><span className="bold italic">${guestRate} tt</span> for each additional guest in room.</li>
              <li><span className="bold italic">Note: </span>Rates may very seasonally.</li>
              <li>Please call for availability and rates</li>
              <li>Regular check in time: <span className="bold italic">{checkin}</span></li>
              <li>Regular check out time: <span className="bold italic">{checkout}</span></li>
            </ul>
          </div>
    );
};

Rate.propTypes = {
  rate: PropTypes.object.isRequired
};

export default Rate;