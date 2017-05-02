/*eslint-disable */
import React, {Component, PropTypes} from 'react';

// React does not rerender this component when screen size changes
// since react does not deal munipilate the DOM. Will use google map api to update
// the DOM whe screen size changes
class GoogleMap extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {lat, lng} = this.props.coordinate;

        const map = new google.maps.Map(this.refs['google-map'], {
            center: {lat: lat, lng: lng},
            zoom: 14,
            scrollwheel: false
        });

        const marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            title: '28 Dillon Street'
        });

        const infoWindowContent = '<h4>28 Dillon Street</h4>';

        const infowindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });

        marker.addListener('click', () => {
            infowindow.open(map, marker);
        });

        google.maps.event.addDomListener(window, 'resize', () => {
            const center = map.getCenter();

            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });
    }

    // Not to rerender to this component
    // The changes will be made by manipulate the DOM
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <section className="google-map w3-round-large w3-greyscale" ref="google-map">
                <h2>Google Map</h2>
            </section>
        );
    }
}

GoogleMap.propTypes = {
    coordinate: PropTypes.object.isRequired
};

export default GoogleMap;
