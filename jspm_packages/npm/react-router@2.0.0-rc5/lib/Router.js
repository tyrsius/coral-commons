/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  var _historyLibCreateHashHistory = require('history/lib/createHashHistory');
  var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);
  var _historyLibUseQueries = require('history/lib/useQueries');
  var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _createTransitionManager = require('./createTransitionManager');
  var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
  var _PropTypes = require('./PropTypes');
  var _RouterContext = require('./RouterContext');
  var _RouterContext2 = _interopRequireDefault(_RouterContext);
  var _RouteUtils = require('./RouteUtils');
  var _RouterUtils = require('./RouterUtils');
  var _warning = require('./warning');
  var _warning2 = _interopRequireDefault(_warning);
  function isDeprecatedHistory(history) {
    return !history || !history.__v2_compatible__;
  }
  var _React$PropTypes = _react2['default'].PropTypes;
  var func = _React$PropTypes.func;
  var object = _React$PropTypes.object;
  var Router = _react2['default'].createClass({
    displayName: 'Router',
    propTypes: {
      history: object,
      children: _PropTypes.routes,
      routes: _PropTypes.routes,
      render: func,
      createElement: func,
      onError: func,
      onUpdate: func
    },
    getDefaultProps: function getDefaultProps() {
      return {render: function render(props) {
          return _react2['default'].createElement(_RouterContext2['default'], props);
        }};
    },
    getInitialState: function getInitialState() {
      var _props = this.props;
      var location = _props.location;
      var routes = _props.routes;
      var params = _props.params;
      var components = _props.components;
      return {
        location: location,
        routes: routes,
        params: params,
        components: components
      };
    },
    handleError: function handleError(error) {
      if (this.props.onError) {
        this.props.onError.call(this, error);
      } else {
        throw error;
      }
    },
    componentWillMount: function componentWillMount() {
      var _this = this;
      var history = this.props.history;
      var _props2 = this.props;
      var routes = _props2.routes;
      var children = _props2.children;
      var _props3 = this.props;
      var parseQueryString = _props3.parseQueryString;
      var stringifyQuery = _props3.stringifyQuery;
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : undefined;
      if (isDeprecatedHistory(history)) {
        history = this.wrapDeprecatedHistory(history);
      }
      var transitionManager = _createTransitionManager2['default'](history, _RouteUtils.createRoutes(routes || children));
      this._unlisten = transitionManager.listen(function(error, state) {
        if (error) {
          _this.handleError(error);
        } else {
          _this.setState(state, _this.props.onUpdate);
        }
      });
      this.router = _RouterUtils.createRouterObject(history, transitionManager);
      this.history = _RouterUtils.createRoutingHistory(history, transitionManager);
    },
    wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
      var _props4 = this.props;
      var parseQueryString = _props4.parseQueryString;
      var stringifyQuery = _props4.stringifyQuery;
      var createHistory = undefined;
      if (history) {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : undefined;
        createHistory = function() {
          return history;
        };
      } else {
        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : undefined;
        createHistory = _historyLibCreateHashHistory2['default'];
      }
      return _historyLibUseQueries2['default'](createHistory)({
        parseQueryString: parseQueryString,
        stringifyQuery: stringifyQuery
      });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : undefined;
      process.env.NODE_ENV !== 'production' ? _warning2['default']((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : undefined;
    },
    componentWillUnmount: function componentWillUnmount() {
      if (this._unlisten)
        this._unlisten();
    },
    render: function render() {
      var _state = this.state;
      var location = _state.location;
      var routes = _state.routes;
      var params = _state.params;
      var components = _state.components;
      var _props5 = this.props;
      var createElement = _props5.createElement;
      var render = _props5.render;
      var props = _objectWithoutProperties(_props5, ['createElement', 'render']);
      if (location == null)
        return null;
      Object.keys(Router.propTypes).forEach(function(propType) {
        return delete props[propType];
      });
      return render(_extends({}, props, {
        history: this.history,
        router: this.router,
        location: location,
        routes: routes,
        params: params,
        components: components,
        createElement: createElement
      }));
    }
  });
  exports['default'] = Router;
  module.exports = exports['default'];
})(require('process'));
