import React, {Component} from 'react';
import { SortableComposition as Sortable }  from './src/SortableComposition';

class SortableGridItem extends Component {
    static displayName = 'SortableGridItem';

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div {...this.props}>
            {this.props.children}
          </div>
        );
    }
}

export default Sortable(SortableGridItem);
