import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import MdRefresh from 'react-icons/lib/md/refresh';

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    data: PropTypes.object
  }


  render() {
    const { children, data } = this.props;
    
    // cloneElement allows prop to be pass to the children
    //  Show spinner if data is available
    return data.size > 0 ? 
      React.cloneElement(children, {data: data}) : 
      (
        <section id="vros-admin" className="w3-display-container" style={{height: "100vh"}}>
          <MdRefresh width="3rem" height="3rem" className="md-refresh w3-spin w3-display-middle w3-text-black"/>
        </section>
      );
  }
}

function mapStateToProps(state) {
    return {
        data: state.api
    };
}

export default connect(mapStateToProps, null)(App);
