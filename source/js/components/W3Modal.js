import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import MdClose from 'react-icons/lib/md/close';

import {CLOSE_MODAL} from '../actions/action.types';
import {store} from '../index';

class W3Modal extends Component {
    constructor(props) {
        super(props);
    }

    closeModal = () => {
        let classList = document.getElementById("vros-modal").classList;

        classList.remove('show');
        store.dispatch({
            type: CLOSE_MODAL,
            payload: {
                isOpen: false,
                item: null
            }
        });
    }

    componentDidMount() {
        this.modalTarget = document.createElement('div');
        this.modalTarget.id = 'w3-modal-container';

        document.body.appendChild(this.modalTarget);

        this._render();
    }

    componentWillUpdate() {
        this._render();
    }

    componentWillUnmount(){
        ReactDOM.unmountComponentAtNode(this.modalTarget);
        document.body.removeChild(this.modalTarget);
    }

    _render = () => {
        ReactDOM.render(
            <Provider store = {store}>
                <div id="vros-modal" className="w3-modal w3-animate-opacity show">
                    <span onClick={this.closeModal} className="w3-closebtn w3-hover-red w3-text-white w3-xxlarge w3-container w3-display-topright"><MdClose className="md-close"/></span>
                    <div className="w3-modal-content w3-animate-zoom">
                        {this.props.children}
                    </div>
                </div>
            </Provider>,
            this.modalTarget
        );
    }

    render() {
        return (
            <noscript />
        );
    }
}

export default W3Modal;
