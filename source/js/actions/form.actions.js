import axios from 'axios';
import {toastr} from 'react-redux-toastr';
 
import {UPLOAD_IMAGE, UPLOAD_IMAGE_FAIL} from '../actions/action.types';
import {getSiteData} from '../actions/api.actions';
import {closeModal} from '../actions/modal.actions';

export function uploadImage(formData) {
    return (dispatch) => {
        axios
            .post('http://localhost:3000/api/upload', formData)
            .then((response) => {
                toastr.success("Upload Image",res.data.msg);
                dispatch(getSiteData());
                dispatch(closeModal());
            })
            .catch((err) => {
                toastr.error('Cannot upload image.');
                dispatch(closeModal());
            });
    };
};

export function deleteImage(imageList, imageId, galleryType) {
    return (dispatch) => {
        axios
            .put(`http://localhost:3000/api/remove/${galleryType}/${imageId}`, imageList)
            .then((res) => {
                toastr.success('DeletingImage', res.data.msg);
                dispatch(getSiteData());
            })
            .catch((err) => {
                toastr.error('Cannot delete image.');
                dispatch(closeModal());
            });;
    };
    
};

export function updateListOrder(photos, galleryType) {
    return (dispatch) => {
        axios.put(`http://localhost:3000/api/update/${galleryType}/update_order`, photos)
            .then((res) => {
                // toastr.options.closeButton = true;
                // toastr.success(res.data.msg);
                dispatch(getSiteData());
            });
    };
};

export function updateImageCaption(caption, itemId, galleryType) {
    return (dispatch) => {
        axios
            .put(`http://localhost:3000/api/update/${galleryType}/caption/${itemId}`, {caption})
            .then((res) => {
                toastr.success("Update Caption", res.data.msg);
                dispatch(closeModal());
                dispatch(getSiteData());
            })
            .catch((err) => {
                toastr.error('Cannot update caption.');
            });
    };
};

export function updateAddress(addressObj) {
    return (dispatch) => {
        axios
            .put('http://localhost:3000/api/update/address', addressObj)
            .then((res) => {
                toastr.success('Updating Address', res.data.msg);
                dispatch(closeModal());
                dispatch(getSiteData());
            })
            .catch((err) => {
                toastr.error('Cannot update address info: ' + err.data.msg);
                dispatch(closeModal());
            });
    };
};

export function updateRate(rateObj) {
    return (dispatch) => {
        axios
            .put('http://localhost:3000/api/update/rate', rateObj)
            .then((res) => {
                toastr.success('Updating Rate', res.data.msg);
                dispatch(closeModal());
                dispatch(getSiteData());
            })
            .catch((err) => {
                toastr.error('Cannot update rate info: ' + err.data.msg);
                dispatch(closeModal());
            });
    };
};

export function update(rateObj, name) {
    return (dispatch) => {
        axios
            .put(`http://localhost:3000/api/update/${name}`, rateObj)
            .then((res) => {
                toastr.success('', res.data.msg);
                dispatch(closeModal());
                dispatch(getSiteData());
            })
            .catch((err) => {
                toastr.error('Cannot update info: ' + err.data.msg);
                dispatch(closeModal());
            });
    };
};

export function updateParagraph(paragraph, page, index) {
    return (dispatch) => {
        axios
            .put(`http://localhost:3000/api/update/paragraph/${page}/${index}`, {paragraph})
            .then((res) => {
                toastr.success('Updating Paragraph', res.data.msg);
                dispatch(closeModal());
                dispatch(getSiteData());
            })
            .catch((err) => {
                toastr.error('Cannot update paragraph: ' + err.data.msg);
                dispatch(closeModal());
            });
    };
}