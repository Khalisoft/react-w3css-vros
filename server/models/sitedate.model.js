"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    src: String,
    image_id: String,
    created_at: Date,
    caption: String,
    filename: String,
    thumbnail: String,
    thumbnail_mobile: String,
    XS: String,
    SM: String,
    MD: String,
    LG: String,
    XL: String
});

// const imageSchema = new Schema({
//     src: String
// });

const address = {
    name: String,
    street: String,
    city: String,
    province: String,
    country: String,
    phone: [String],
    email: String,
    website: String
};

const mapCoordinate = {
    lng: Number,
    lat: Number
};

const rate = {
    startRate: Number,
    guestRate: Number,
    checkIn: String,
    checkOut: String
};

const sitedataSchema = new Schema({
    name: String,
    rate: rate,
    address: address,
    mapCoordinate: mapCoordinate,
    aboutPage: [String],
    locationPage: [String],
    galleryPage: [String],
    slideshow: [imageSchema],
    parallax: [imageSchema],
    gallery: [imageSchema]
});

const SiteDataModel = mongoose.model('siteData', sitedataSchema);

module.exports = SiteDataModel;
