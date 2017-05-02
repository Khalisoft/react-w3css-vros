import React, {Component, PropTypes} from 'react';
import uid from 'uid';

class Slideshow extends Component {
    constructor(props) {
        super(props);

        this.slideIndex = 1;
        this.style = {
            width: "100%"
        };
    }

    plusSlide = (n) => {
        this.showSlides(this.slideIndex += n);
    }

    currentSlide = (n) => {
        this.showSlides(this.slideIndex = n);
    }

    showSlides = (n) => {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");

        if (n > slides.length) {this.slideIndex = 1}   

        if (n < 1) {this.slideIndex = slides.length}

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }

        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" w3-white", "");
        }

        slides[this.slideIndex-1].style.display = "block";  
        dots[this.slideIndex-1].className += " w3-white";
    }

    renderSlides = () => {
        const {images} = this.props;
        
        const imgEls = images.map((image, i) => {
            return <img key={uid()} className="slide w3-animate-opacity" src={image.SM} style={this.style}/>;
        });
        
        const dotEls = images.map((image, i) => {
            return <span key={i} className="w3-badge dot w3-border w3-transparent w3-hover-white" onClick={()=>{this.currentSlide(i)}}></span>;
        });
        
        return {imgEls, dotEls};
    }

    componentDidMount() {
        this.showSlides(this.slideIndex);
        this.setSlideInterval = setInterval(this.plusSlide, 5000, 1);
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillUnmount() {
        clearInterval(this.setSlideInterval);
    }

    render() {
        const slides = this.renderSlides();
        
        return (
            <div className="w3-card-4">
                <div className="w3-content w3-display-container" style={this.style}>
                    {[...slides.imgEls]}
                    <div className="w3-center w3-section w3-large w3-text-white w3-display-bottommiddle" style={this.style}>
                        <div className="w3-left w3-padding-left w3-hover-text-khaki" onClick={()=>{this.plusSlide(-1)}}>&#10094;</div>
                        <div className="w3-right w3-padding-right w3-hover-text-khak" onClick={()=>{this.plusSlide(1)}}>&#10095;</div>
                        {[...slides.dotEls]}
                    </div>
                </div>
            </div>
        );
    }
}

Slideshow.propTypes = {
    images: PropTypes.array.isRequired
};

export default Slideshow;