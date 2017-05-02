import {XSMALL, SMALL, MEDIUM, X_SMALL_SCREEN, SMALL_SCREEN, MEDIUM_SCREEN, LARGE_SCREEN} from './constants';

/**
 * A function that takes browser width and return a screen size.
 * [X_SMALL_SCREEN, SMALL_SCREEN, MEDIUM_SCREEN, LARGE_SCREEN]
 * 
 * @param {number} browserWidth 
 * @return {string}
 */
export const getScreenSize = (browserWidth) => {
    let screenSize;

    if(browserWidth <= XSMALL) {
        screenSize = X_SMALL_SCREEN;
    } else if(browserWidth >= XSMALL && browserWidth <= SMALL) {
        screenSize = SMALL_SCREEN;
    } else if(browserWidth >= SMALL && browserWidth < MEDIUM) {
        screenSize = MEDIUM_SCREEN;
    } else {
        screenSize = LARGE_SCREEN;
    }

    return screenSize;
};

/**
 * Description - takes a screen size as an argument and return a number to be display per row.
 * 
 * @param {string} screenSize 
 * @return {number}
 */
export const getImagesPerRow = (screenSize) => {
    let imagesPerRow;

    if(screenSize === X_SMALL_SCREEN) {
        imagesPerRow = 1;
    } else if(screenSize === SMALL_SCREEN) {
        imagesPerRow = 2;
    } else if(screenSize === MEDIUM_SCREEN) {
        imagesPerRow = 3;
    } else if(screenSize === LARGE_SCREEN) {
        imagesPerRow = 4;
    }

    return imagesPerRow;
};
