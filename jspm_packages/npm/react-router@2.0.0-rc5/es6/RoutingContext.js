/* */ 
"format cjs";
'use strict';

import React from 'react';
import RouterContext from './RouterContext';
import warning from './warning';

var RoutingContext = React.createClass({
  displayName: 'RoutingContext',

  componentWillMount: function componentWillMount() {
    process.env.NODE_ENV !== 'production' ? warning(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : undefined;
  },

  render: function render() {
    return React.createElement(RouterContext, this.props);
  }
});

export default RoutingContext;