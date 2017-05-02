"use strict";

const Q = require('q');
const request = require('request');
const cloudinary = require('cloudinary');
const concat = require('lodash.concat');
const filter = require('lodash.filter');
const find = require('lodash.find');
const forEach = require('lodash.forEach');
const fs = require('fs');

const SiteDataModel = require('../models/sitedate.model');
const c = require('../helpers/constants');

const SITE_NAME = 'vros';

cloudinary.config({
    cloud_name: 'dl1i3t41c',
    api_key: '171298266375644',
    api_secret: 'xAEapIasCPcJhVVXRxRorzXPh6c'
});

function verifyIfHuman(req, res) {
    const d = Q.defer();
    const gRecaptchaValue = req.body.gRecaptchaValue;
    const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

    request.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${gRecaptchaValue}`
        , (err, httpResponse, body)=>{
            if (err) {
                d.reject(new Error(err));
            } else {
                const r = JSON.parse(body);
                if (r.success) {
                    d.resolve(r.success);
                } else {
                    d.reject(new Error());
                }
            }
        });

    return d.promise;
}

exports.getData = (req, res) => {
    SiteDataModel
        .findOne({name: SITE_NAME}, (err, data) => {
            if(err) {
                res.status(400).send({errMsg: `Error looking up document with name '${SITE_NAME}'`});
            }

            if(data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({errMsg: `Cannot find data with name '${SITE_NAME}'`});
            }
        })
};

exports.contactFormSubmit = (req, res) => {
    verifyIfHuman(req)
        .then((success)=>{
            res.status(200).send({isHuman: true, msg: 'This is a human'});
        })
        .catch(()=>{
            res.status(400).send({isHuman: false, msg: 'This is not a human'});
        });
};

exports.upload = (req, res) => {
    const gallery = req.body.gallery;
    const caption = req.body.caption;
    const tempPath = req.file.path;
    
    cloudinary.uploader.upload(req.file.path, function(result) {
        const filename = result.public_id.split("/")[1] + '.jpg';
        const post = {
            src: result.url,
            image_id: result.public_id,
            created_at: new Date(),
            filename: filename,
            caption: caption,
            thumbnail: result.eager[0].url,
            thumbnail_mobile: result.eager[6].url,
            XS: result.eager[1].url,
            SM: result.eager[2].url,
            MD: result.eager[3].url,
            LG: result.eager[4].url,
            XL: result.eager[5].url
        };
        
        SiteDataModel
            .findOne({})
            .exec()
            .then((data) => {
                const galleryKey = `${gallery}`;
                data[galleryKey] = concat(post, data[galleryKey]);

                return data.save(); // return promise
            })
            .then((data) => {
                fs.unlink(tempPath, function (err) {
                    if (err) throw err;
                });
                
                res.status(200).send({success: true, msg: `Image saved`, data: data});
            })
            .catch((err) => {
                res.status(400).send({success: false, msg: "Cannot save image"});
            });
    }, {upload_preset: `${gallery}_preset`});
};

exports.remove = (req, res) => {
    const gallery = req.params.gallery;
    const id = req.params.id; // 'id' is mongodb id

    let itemToDelete = filter(req.body, function(o) {
        return o._id === id;
    });

    // imageId is Cloudinary image id
    const imageId = itemToDelete[0].image_id;
    
    cloudinary.uploader.destroy(imageId, function (error, result) {
        SiteDataModel
            .findOne({name: 'vros'}, {[`${gallery}`]: true})
            .exec()
            .then((data) => {
                let newList = filter(data[`${gallery}`], function(o) {
                    return o._id != id;
                });

                SiteDataModel
                    .update({_id: data._id}, {$set: {[`${gallery}`]: newList}}, function(err, model) {
                        if(err) {
                            res.status(400).send({success: false, msg: "Unable to deleted image"});
                        }

                        res.status(200).send({success: true, msg: `Image deleted`, posts: newList});
                    });
            })
            .catch((err) => {
                res.status(400).send({success: false, msg: `Cannot find gallery ${gallery} in document 'vros'`});
            });
    });
};

exports.updateListOrder = (req, res) => {
    let newPhotoList = [];
    let gallery = req.params.gallery;

    SiteDataModel
        .findOne({name: c.SITENAME}, {[`${gallery}`]: true})
        .exec()
        .then((data) => {
            forEach(req.body, (value) => {
                let item = find(data[`${gallery}`], (o) => {
                    return o._id == value._id
                });

                newPhotoList = concat(newPhotoList, item);
            });

            SiteDataModel
                .update({_id: data._id}, {$set: {[`${gallery}`]: newPhotoList}}, function(err, model) {
                    if(err) {
                        res.status(400).send({success: false, msg: `Cannot update gallery ${gallery} order`});
                    }

                    res.status(200).send({success: true, msg: `Gallery ${gallery} order updated`});
                });
        })
        .catch((err) => {
            res.status(400).send({success: false, msg: `Cannot find gallery ${gallery} in document ${c.SITENAME}`});
        });
};

exports.updateImageCaption = (req, res) => {
    let updates;

    const query = {name: c.SITENAME};
    const gallery = req.params.gallery;
    const itemId = req.params.id;
    const newCaption = req.body.caption;

    query[`${gallery}._id`] = itemId;
    updates = {$set: {[`${gallery}.$.caption`]: newCaption}};
    
    SiteDataModel
        .update(query, updates, (err, model) => {
            if(err) {
                res.status(400).send({success: false, msg: "Can't updated caption."});
            }

            res.status(200).send({success: true, msg: "Caption updated."});
        });
};

exports.updateAddressAndRate = (req, res) => {
    SiteDataModel
        .update({name: c.SITENAME}, {$set: {[`${req.params.name}`]: req.body}}, function(err, model) {
            if(err) {
                res.status(400).send({success: false, msg: `Cannot update ${req.params.name}`});
            }

            res.status(200).send({success: true, msg: `${req.params.name} updated`});
        });
};

exports.updateParagraph = (req, res) => {
    const paragraph = req.body.paragraph;
    const page = `${req.params.section}Page`;
    const index = req.params.index;
    const query = {name: c.SITENAME};
    const updates = {$set: {[`${page}.${index}`]: paragraph}};

    SiteDataModel
        .update(query, updates, (err, model) => {
            if(err) {
                res.status(400).send({success: false, msg: "Can't updated paragraph "});
            }

            res.status(200).send({success: true, msg: "Paragraph updated"});
        });
};