"use strict";

const multer = require('multer');
const upload = multer( { dest: 'uploads/' } ).single('filename');
const express = require('express');
const router = express.Router();

const apiCtrl = require('../controllers/api.ctrl');

router.get('/data', apiCtrl.getData);
router.post('/contact-form', apiCtrl.contactFormSubmit);
router.post('/upload', upload, apiCtrl.upload);
router.put('/remove/:gallery/:id', apiCtrl.remove);
router.put('/update/:gallery/update_order', apiCtrl.updateListOrder);
router.put('/update/:gallery/caption/:id', apiCtrl.updateImageCaption);
router.put('/update/:name', apiCtrl.updateAddressAndRate);
router.put('/update/paragraph/:section/:index', apiCtrl.updateParagraph);

module.exports = router;