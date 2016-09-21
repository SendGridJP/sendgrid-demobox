/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Header = __webpack_require__(1);
	var Article = __webpack_require__(4);
	var flux = __webpack_require__(18);

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var Root = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  _onSelectPage: function (pageId) {
	    this.setState({ activePage: pageId });
	  },

	  getInitialState: function () {
	    return { activePage: 'send' };
	  },

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      sending: store.sending,
	      error: store.error,
	      result: store.result
	    };
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'Root' },
	      React.createElement(Header, {
	        activePage: this.state.activePage,
	        onSelectPage: this._onSelectPage }),
	      React.createElement(Article, { activePage: this.state.activePage })
	    );
	  }
	});

	ReactDOM.render(React.createElement(Root, { flux: flux }), document.getElementById('root'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var LeftMenu = __webpack_require__(2);

	var Header = React.createClass({
	  propTypes: {
	    activePage: React.PropTypes.string.isRequired,
	    onSelectPage: React.PropTypes.func.isRequired
	  },
	  _onSelectPage: function (pageId) {
	    this.props.onSelectPage(pageId);
	  },
	  render: function () {
	    return React.createElement(
	      "nav",
	      { className: "navbar navbar-default" },
	      React.createElement(
	        "div",
	        { className: "navbar-header" },
	        React.createElement(
	          "button",
	          {
	            className: "navbar-toggle",
	            "data-toggle": "collapse",
	            "data-target": ".target" },
	          React.createElement("span", { className: "icon-bar" }),
	          React.createElement("span", { className: "icon-bar" }),
	          React.createElement("span", { className: "icon-bar" })
	        ),
	        React.createElement(
	          "a",
	          { className: "navbar-brand", href: "" },
	          "DemoBox"
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "collapse navbar-collapse target" },
	        React.createElement(LeftMenu, {
	          activePage: this.props.activePage,
	          onSelectPage: this._onSelectPage }),
	        React.createElement(
	          "ul",
	          { className: "nav navbar-nav navbar-right" },
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { href: "https://sendgrid.com/account/overview", target: "_blank" },
	              "sendgrid.com"
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { href: "https://sendgrid.com/statistics", target: "_blank" },
	              "Statistics"
	            )
	          ),
	          React.createElement(
	            "li",
	            null,
	            React.createElement(
	              "a",
	              { href: "https://sendgrid.com/templates", target: "_blank" },
	              "Templates"
	            )
	          )
	        )
	      )
	    );
	  }
	});
	module.exports = Header;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var LeftMenuItem = __webpack_require__(3);

	var LeftMenu = React.createClass({
	  propTypes: {
	    activePage: React.PropTypes.string.isRequired,
	    onSelectPage: React.PropTypes.func.isRequired
	  },
	  _onSelectPage: function (pageId) {
	    this.props.onSelectPage(pageId);
	  },
	  render: function () {
	    return React.createElement(
	      "ul",
	      { className: "nav navbar-nav" },
	      React.createElement(LeftMenuItem, {
	        pageId: "send",
	        activePage: this.props.activePage,
	        href: "",
	        text: "メールを送る",
	        onSelectPage: this._onSelectPage }),
	      React.createElement(LeftMenuItem, {
	        pageId: "receive",
	        activePage: this.props.activePage,
	        href: "",
	        text: "メールを受ける",
	        onSelectPage: this._onSelectPage })
	    );
	  }
	});
	module.exports = LeftMenu;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var LeftMenuItem = React.createClass({
	  propTypes: {
	    pageId: React.PropTypes.string.isRequired,
	    text: React.PropTypes.string.isRequired,
	    activePage: React.PropTypes.string.isRequired,
	    onSelectPage: React.PropTypes.func.isRequired
	  },
	  _onSelectPage: function () {
	    this.props.onSelectPage(this.props.pageId);
	  },
	  getActive: function (pageId, activePage) {
	    if (pageId === activePage) return 'active';else return '';
	  },
	  render: function () {
	    return React.createElement(
	      'li',
	      {
	        id: this.props.pageId,
	        className: this.getActive(this.props.pageId, this.props.activePage) },
	      React.createElement(
	        'a',
	        { href: '#', className: 'subtree-name',
	          onClick: this._onSelectPage },
	        this.props.text
	      )
	    );
	  }
	});
	module.exports = LeftMenuItem;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var SendPage = __webpack_require__(5);
	var ReceivePage = __webpack_require__(17);

	var Article = React.createClass({
	  propTypes: {
	    activePage: React.PropTypes.string.isRequired
	  },
	  render: function () {
	    if (this.props.activePage === 'send') {
	      return React.createElement(SendPage, null);
	    } else if (this.props.activePage === 'receive') {
	      return React.createElement(ReceivePage, null);
	    }
	  }
	});
	module.exports = Article;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var SendForm = __webpack_require__(6);
	var EventsPain = __webpack_require__(13);

	var SendPage = React.createClass({
	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'container-fluid' },
	      React.createElement(
	        'div',
	        { className: 'row' },
	        React.createElement(
	          'div',
	          { className: 'col-md-3' },
	          React.createElement(SendForm, null)
	        ),
	        React.createElement(
	          'div',
	          { className: 'col-md-9' },
	          React.createElement(EventsPain, null)
	        )
	      )
	    );
	  }
	});
	module.exports = SendPage;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var PersonalizationList = __webpack_require__(7);
	var EmailForm = __webpack_require__(9);
	var SimpleTextForm = __webpack_require__(10);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var SendForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getInitialState: function () {
	    return {};
	  },

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      status: store.status,
	      request: store.request,
	      responseCode: store.responseCode,
	      responseBody: store.responseBody
	    };
	  },

	  handleSendMail: function (e) {
	    e.preventDefault();
	    var form = $('#param');
	    var param = {};
	    $(form.serializeArray()).each(function (i, v) {
	      param[v.name] = v.value;
	    });
	    // console.log(param);
	    this.getFlux().actions.sendMail(param);
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'form',
	        { id: 'param', className: 'form-horizontal' },
	        React.createElement(PersonalizationList, null),
	        React.createElement(
	          'div',
	          { className: 'form-group' },
	          React.createElement(EmailForm, {
	            title: 'From',
	            required: true,
	            index: 0,
	            paramName: 'from',
	            placeholderEmail: 'from@example.com',
	            valueEmail: 'from@example.com',
	            placeholderName: 'From Name',
	            valueName: 'From Name' })
	        ),
	        React.createElement(
	          'div',
	          { className: 'form-group' },
	          React.createElement(EmailForm, {
	            title: 'Reply-to',
	            required: false,
	            index: 0,
	            paramName: 'reply-to',
	            placeholderEmail: 'reply-to@example.com',
	            valueEmail: 'reply-to@example.com',
	            placeholderName: 'Reply-to Name',
	            valueName: 'Reply-to Name' })
	        ),
	        React.createElement(
	          'div',
	          { className: 'form-group' },
	          React.createElement(SimpleTextForm, {
	            title: 'Subject',
	            required: true,
	            index: 0,
	            paramName: 'subject',
	            placeholder: '-name-さんへ　テストメール',
	            value: '-name-さんへ　テストメール' })
	        ),
	        React.createElement(
	          'div',
	          { className: 'form-group' },
	          React.createElement(
	            'div',
	            { className: 'col-md-12' },
	            React.createElement(
	              'label',
	              { className: 'control-label' },
	              React.createElement(
	                'span',
	                { className: 'text-danger' },
	                '*'
	              ),
	              'Contents'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-12', id: 'content0' },
	            React.createElement(
	              'label',
	              null,
	              'text/plain'
	            ),
	            React.createElement('input', { type: 'hidden', name: 'content[0].type', defaultValue: 'text/plain' }),
	            React.createElement('textarea', { name: 'content[0].value', className: 'form-control',
	              placeholder: '-name-さんへ　TEXT本文', defaultValue: '-name-さんへ　TEXT本文 SendGrid https://sendgrid.com' })
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-12', id: 'content1' },
	            React.createElement(
	              'label',
	              null,
	              'text/html'
	            ),
	            React.createElement('input', { type: 'hidden', name: 'content[1].type', defaultValue: 'text/html' }),
	            React.createElement('textarea', { name: 'content[1].value', className: 'form-control',
	              placeholder: '<p>-name-さんへ　HTML本文</p>',
	              defaultValue: '<p>-name-さんへ　HTML本文</p> <a href=\'https://sendgrid.com\'>センドグリッド</a>' })
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'panel-group', id: 'accordion' },
	          React.createElement(
	            'div',
	            { className: 'panel panel-default' },
	            React.createElement(
	              'div',
	              { className: 'panel-heading' },
	              React.createElement(
	                'h4',
	                { className: 'panel-title' },
	                React.createElement(
	                  'a',
	                  { 'data-toggle': 'collapse', 'data-parent': '#accordion',
	                    href: '#collapseOne' },
	                  React.createElement('i', { className: 'glyphicon glyphicon-chevron-right' }),
	                  'オプション'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { id: 'collapseOne', className: 'panel-collapse collapse' },
	            React.createElement(
	              'div',
	              { className: 'panel-body' },
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Substitution'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'usesub', name: 'usesub', defaultValue: 'true' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement('input', { type: 'text', id: 'subkey', name: 'subkey', className: 'form-control',
	                    placeholder: '-name-', defaultValue: '-name-', disabled: 'true' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement('input', { type: 'text', id: 'subval', name: 'subval', className: 'form-control',
	                    placeholder: '田中, 鈴木', defaultValue: '田中, 鈴木', disabled: 'true' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Bcc'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'usebcc', name: 'usebcc', defaultValue: 'true' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement('input', { type: 'text', id: 'bcc', name: 'bcc', className: 'form-control',
	                    placeholder: 'bcc@address.com', defaultValue: '<%= @bcc %>', disabled: 'true' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Category'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'usecategory', name: 'usecategory',
	                    defaultValue: 'true' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement('input', { type: 'text', id: 'category', name: 'category', className: 'form-control',
	                    placeholder: 'sendgrid-demo', defaultValue: 'sendgrid-demo', disabled: 'true' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Unique Args'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'useuniqueargs', name: 'useuniqueargs',
	                    defaultValue: 'true' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement('input', { type: 'text', id: 'uniquekey', name: 'uniquekey', className: 'form-control',
	                    placeholder: 'emailtoken', defaultValue: 'emailtoken', disabled: 'true' }),
	                  React.createElement('input', { type: 'text', id: 'uniqueval', name: 'uniqueval', className: 'form-control',
	                    placeholder: '20140901123456', defaultValue: '20140901123456', disabled: 'true' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Click Tracking'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'useclick', name: 'useclick', defaultValue: 'true' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Open Tracking'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'useopen', name: 'useopen', defaultValue: 'true' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Subscription Tracking'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'usesubscription', name: 'usesubscription',
	                    defaultValue: 'true' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Template'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'usetemplate', name: 'usetemplate',
	                    defaultValue: 'true' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'select',
	                    { className: 'form-control', id: 'template', name: 'template', disabled: 'true' },
	                    React.createElement(
	                      'option',
	                      null,
	                      'sendgrid_demo_template_1'
	                    ),
	                    React.createElement(
	                      'option',
	                      null,
	                      'sendgrid_demo_template_2'
	                    ),
	                    React.createElement(
	                      'option',
	                      null,
	                      'sendgrid_demo_template_3'
	                    )
	                  )
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Footer'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'usefooter', name: 'usefooter',
	                    defaultValue: 'true' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'label',
	                    null,
	                    'Send at timezone'
	                  ),
	                  React.createElement('input', { type: 'checkbox', id: 'usesendat', name: 'usesendat',
	                    defaultValue: 'true' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'col-md-12' },
	                  React.createElement(
	                    'div',
	                    { className: 'input-group clockpicker', id: 'clockpicker' },
	                    React.createElement('input', { type: 'text', name: 'sendat', className: 'form-control sendat', defaultValue: '<%= @now_time %>', disabled: 'true' }),
	                    React.createElement(
	                      'span',
	                      { className: 'input-group-addon' },
	                      React.createElement('span', { className: 'glyphicon glyphicon-time' })
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      ),
	      React.createElement(
	        'button',
	        {
	          id: 'send',
	          className: 'btn btn-primary center-block',
	          onClick: this.handleSendMail },
	        '送信'
	      ),
	      React.createElement(
	        'div',
	        null,
	        this.state.status
	      ),
	      React.createElement(
	        'div',
	        null,
	        this.state.request
	      ),
	      React.createElement(
	        'div',
	        null,
	        this.state.responseCode
	      ),
	      React.createElement(
	        'div',
	        null,
	        this.state.responseBody
	      )
	    );
	  }
	});
	module.exports = SendForm;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var PersonalizationItem = __webpack_require__(8);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var PersonalizationList = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      personalizations: store.mailData.personalizations
	    };
	  },

	  handleAddPersonalization: function () {
	    this.getFlux().actions.addPersonalization();
	  },

	  render: function () {
	    return React.createElement(
	      "div",
	      { className: "form-group" },
	      React.createElement(
	        "div",
	        { className: "col-md-12" },
	        React.createElement(
	          "label",
	          { className: "control-label" },
	          React.createElement(
	            "span",
	            { className: "text-danger" },
	            "*"
	          ),
	          "Personalizations"
	        ),
	        this.state.personalizations.map(function (personalization, index) {
	          return React.createElement(PersonalizationItem, { index: index });
	        }),
	        ";",
	        React.createElement(
	          "div",
	          { className: "col-md-12" },
	          React.createElement(
	            "a",
	            { href: "javascript:void(0)", onClick: this.handleAddPersonalization,
	              className: "pull-right" },
	            React.createElement("span", { className: "glyphicon glyphicon-plus" })
	          )
	        )
	      )
	    );
	  }
	});
	module.exports = PersonalizationList;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var EmailForm = __webpack_require__(9);
	var SimpleTextForm = __webpack_require__(10);
	var KeyValueForm = __webpack_require__(11);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var PersonalizationItem = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    index: React.PropTypes.number.isRequired
	  },

	  getInitialState: function () {
	    return {};
	  },

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    var state = {};
	    if (store.mailData.personalizations[this.props.index] != null) {
	      state = {
	        headers: store.mailData.personalizations[this.props.index].headers,
	        substitutions: store.mailData.personalizations[this.props.index].substitutions,
	        custom_args: store.mailData.personalizations[this.props.index].custom_args
	      };
	    }
	    return state;
	  },

	  handleDelPersonalization: function () {
	    this.getFlux().actions.delPersonalization(this.props.index);
	  },

	  handleAddHeaderInpersonal: function () {
	    this.getFlux().actions.addHeaderInpersonal(this.props.index);
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: '' },
	      React.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.handleDelPersonalization,
	          className: 'removeIcon' },
	        React.createElement('span', { className: 'glyphicon glyphicon-remove' })
	      ),
	      React.createElement(EmailForm, {
	        title: 'To',
	        required: true,
	        index: 0,
	        paramName: 'personalizations[0].to[0]',
	        placeholderEmail: 'recipient@example.com',
	        valueEmail: 'recipient@example.com',
	        placeholderName: 'To Name',
	        valueName: 'To Name' }),
	      React.createElement(EmailForm, {
	        title: 'Cc',
	        required: false,
	        index: 0,
	        paramName: 'personalizations[0].cc[0]',
	        placeholderEmail: 'cc@example.com',
	        valueEmail: 'cc@example.com',
	        placeholderName: 'Cc Name',
	        valueName: 'Cc Name' }),
	      React.createElement(EmailForm, {
	        title: 'Bcc',
	        required: false,
	        index: 0,
	        paramName: 'personalizations[0].bcc[0]',
	        placeholderEmail: 'bcc@example.com',
	        valueEmail: 'bcc@example.com',
	        placeholderName: 'Bcc Name',
	        valueName: 'Bcc Name' }),
	      React.createElement(SimpleTextForm, {
	        title: 'Subject',
	        required: true,
	        index: 0,
	        paramName: 'personalizations[0].subject',
	        placeholder: 'Subject',
	        value: 'これは件名です' }),
	      React.createElement(KeyValueForm, {
	        title: 'Headers',
	        required: false,
	        index: this.props.index,
	        datas: this.state.headers,
	        placeholderKey: 'header-key',
	        valueKey: 'header-key',
	        placeholderValue: 'header-value',
	        valueValue: 'header-value' }),
	      React.createElement(
	        'div',
	        { className: 'col-md-12' },
	        React.createElement(
	          'a',
	          { href: 'javascript:void(0)', onClick: this.handleAddHeaderInpersonal,
	            className: 'pull-right' },
	          React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	        )
	      ),
	      React.createElement(KeyValueForm, {
	        title: 'Substitutions',
	        required: false,
	        index: this.props.index,
	        datas: this.state.substitutions,
	        placeholderKey: 'substitution-key',
	        valueKey: 'substitution-key',
	        placeholderValue: 'substitution-value',
	        valueValue: 'substitution-value' }),
	      React.createElement(KeyValueForm, {
	        title: 'Custom_args',
	        required: false,
	        index: this.props.index,
	        datas: this.state.custom_args,
	        placeholderKey: 'custom-args-key',
	        valueKey: 'custom-args-key',
	        placeholderValue: 'custom-args-value',
	        valueValue: 'custom-args-value' }),
	      React.createElement(SimpleTextForm, {
	        title: 'Send_at',
	        required: false,
	        index: 0,
	        paramName: 'personalizations[0].send_at',
	        placeholder: '12345678',
	        value: '12345678' })
	    );
	  }
	});
	module.exports = PersonalizationItem;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var EmailForm = React.createClass({
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    required: React.PropTypes.bool.isRequired,
	    index: React.PropTypes.number.isRequired,
	    paramName: React.PropTypes.string.isRequired,
	    placeholderEmail: React.PropTypes.string.isRequired,
	    valueEmail: React.PropTypes.string.isRequired,
	    placeholderName: React.PropTypes.string.isRequired,
	    valueName: React.PropTypes.string.isRequired
	  },
	  getInitialState: function () {
	    return {
	      disabled: true
	    };
	  },
	  _onChangeUse: function (e) {
	    this.setState({ disabled: !e.target.checked });
	  },
	  _getDisabled: function () {
	    if (this.props.required) {
	      return false;
	    } else {
	      return this.state.disabled;
	    }
	  },
	  render: function () {
	    var rq = '';
	    if (this.props.required) {
	      rq = React.createElement(
	        "span",
	        { className: "text-danger" },
	        "*"
	      );
	    } else {
	      rq = React.createElement("input", { type: "checkbox", onChange: this._onChangeUse });
	    }
	    return React.createElement(
	      "div",
	      { className: "container-fluid" },
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        rq,
	        this.props.title
	      ),
	      React.createElement(
	        "div",
	        { className: "form-inline" },
	        React.createElement("input", {
	          type: "text",
	          name: this.props.paramName + '.email',
	          className: "form-control",
	          placeholder: this.props.placeholderEmail,
	          defaultValue: this.props.valueEmail,
	          disabled: this._getDisabled() }),
	        React.createElement("input", {
	          type: "text",
	          name: this.props.paramName + '.name',
	          className: "form-control",
	          placeholder: this.props.placeholderName,
	          defaultValue: this.props.valueName,
	          disabled: this._getDisabled() })
	      )
	    );
	  }
	});
	module.exports = EmailForm;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var SimpleTextForm = React.createClass({
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    required: React.PropTypes.bool.isRequired,
	    index: React.PropTypes.number.isRequired,
	    paramName: React.PropTypes.string.isRequired,
	    placeholder: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string.isRequired
	  },
	  getInitialState: function () {
	    return {
	      disabled: true
	    };
	  },
	  _onChangeUse: function (e) {
	    this.setState({ disabled: !e.target.checked });
	  },
	  _getDisabled: function () {
	    if (this.props.required) {
	      return false;
	    } else {
	      return this.state.disabled;
	    }
	  },
	  render: function () {
	    var rq = '';
	    if (this.props.required) {
	      rq = React.createElement(
	        "span",
	        { className: "text-danger" },
	        "*"
	      );
	    } else {
	      rq = React.createElement("input", { type: "checkbox", onChange: this._onChangeUse });
	    }
	    return React.createElement(
	      "div",
	      { className: "col-md-12" },
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        rq,
	        this.props.title
	      ),
	      React.createElement("input", {
	        type: "text",
	        name: this.props.paramName,
	        className: "form-control",
	        placeholder: this.props.placeholder,
	        defaultValue: this.props.value,
	        disabled: this._getDisabled() })
	    );
	  }
	});
	module.exports = SimpleTextForm;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var KeyValueItem = __webpack_require__(12);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var KeyValueForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    required: React.PropTypes.bool.isRequired,
	    datas: React.PropTypes.array.isRequired,
	    index: React.PropTypes.number.isRequired,
	    placeholderKey: React.PropTypes.string.isRequired,
	    valueKey: React.PropTypes.string.isRequired,
	    placeholderValue: React.PropTypes.string.isRequired,
	    valueValue: React.PropTypes.string.isRequired
	  },

	  getInitialState: function () {
	    return {};
	  },

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      datas: this.props.datas
	    };
	  },

	  render: function () {
	    console.log("KeyValueForm: datas: " + JSON.stringify(this.props.datas));

	    var rq = '';
	    if (this.props.required) {
	      rq = React.createElement(
	        "span",
	        { className: "text-danger" },
	        "*"
	      );
	    }
	    return React.createElement(
	      "div",
	      { className: "container-fluid" },
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        rq,
	        this.props.title
	      ),
	      React.createElement(
	        "div",
	        { className: "form-inline" },
	        this.props.datas.map(function (data, index) {
	          return React.createElement(KeyValueItem, { parentIndex: this.props.index, index: index });
	        }.bind(this)),
	        ";"
	      )
	    );
	  }
	});
	module.exports = KeyValueForm;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var KeyValueItem = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    parentIndex: React.PropTypes.number.isRequired,
	    index: React.PropTypes.number.isRequired,
	    paramName: React.PropTypes.string.isRequired,
	    placeholderKey: React.PropTypes.string.isRequired,
	    valueKey: React.PropTypes.string.isRequired,
	    placeholderValue: React.PropTypes.string.isRequired,
	    valueValue: React.PropTypes.string.isRequired
	  },

	  getInitialState: function () {
	    return {};
	  },

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {};
	  },

	  handleDelHeaderInpersonal: function () {
	    this.getFlux().actions.delHeaderInpersonal(this.props.parentIndex, this.props.index);
	  },

	  render: function () {
	    return React.createElement(
	      "div",
	      { className: "form-inline" },
	      React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.handleDelHeaderInpersonal,
	          className: "removeIcon" },
	        React.createElement("span", { className: "glyphicon glyphicon-remove" })
	      ),
	      React.createElement("input", {
	        type: "text",
	        name: this.props.paramName + '.key',
	        className: "form-control",
	        placeholder: this.props.placeholderKey,
	        defaultValue: this.props.valueKey }),
	      React.createElement("input", {
	        type: "text",
	        name: this.props.paramName + '.value',
	        className: "form-control",
	        placeholder: this.props.placeholderValue,
	        defaultValue: this.props.valueValue })
	    );
	  }
	});
	module.exports = KeyValueItem;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var ShowButton = __webpack_require__(14);
	var EventItemTable = __webpack_require__(15);
	var EventItemJson = __webpack_require__(16);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;
	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	var EventsPain = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    // console.log("EventsPain.getStateFromFlux() store.showEvent: " + store.showEvent);
	    // console.log("EventsPain.getStateFromFlux() store.events: " + JSON.stringify(store.events));
	    return {
	      showEvent: store.showEvent,
	      events: store.events
	    };
	  },

	  getTable: function (showEvent, events) {
	    var table = '';
	    // console.log('getTable(): ' + JSON.stringify(events));
	    if (showEvent == "table") {
	      table = React.createElement(
	        ReactCSSTransitionGroup,
	        {
	          transitionName: 'example', transitionAppear: true,
	          transitionAppearTimeout: 500, transitionEnterTimeout: 500,
	          transitionLeaveTimeout: 300 },
	        React.createElement(
	          'table',
	          { className: 'table table-striped table-bordered table-condensed', id: 'event-table', key: 'event-table' },
	          React.createElement(
	            'thead',
	            null,
	            React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'timestamp'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'event'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'email'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'smtp-id'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'response'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'sg_event_id'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'sg_message_id'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'useragent'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'ip'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'attempt'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'category'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'url'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'status'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'reason'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'type'
	                )
	              ),
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'send_at'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'tbody',
	            null,
	            events.map(function (event) {
	              return React.createElement(EventItemTable, { event: event });
	            }, this)
	          )
	        )
	      );
	    }

	    if (showEvent == "json") {
	      table = React.createElement(
	        ReactCSSTransitionGroup,
	        {
	          transitionName: 'example', transitionAppear: true,
	          transitionAppearTimeout: 500, transitionEnterTimeout: 500,
	          transitionLeaveTimeout: 300 },
	        React.createElement(
	          'table',
	          { className: 'table table-striped table-bordered table-condensed', id: 'event-json', key: 'event-json' },
	          React.createElement(
	            'thead',
	            null,
	            React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'th',
	                null,
	                React.createElement(
	                  'small',
	                  null,
	                  'JSON'
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'tbody',
	            null,
	            events.map(function (event, index) {
	              return React.createElement(EventItemJson, { event: event, firstRow: index == 0 ? true : false });
	            }, this)
	          )
	        )
	      );
	    }
	    return table;
	  },

	  handleShowButton: function (buttonId) {
	    // console.log("handleShowButton: " + buttonId);
	    this.getFlux().actions.toggleShowEvent(buttonId);
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'btn-toolbar' },
	        React.createElement(
	          'div',
	          { className: 'btn-group', 'data-toggle': 'buttons-radio' },
	          React.createElement(ShowButton, {
	            buttonId: 'table',
	            text: 'Table',
	            active: this.state.showEvent,
	            onClick: this.handleShowButton }),
	          React.createElement(ShowButton, {
	            buttonId: 'json',
	            text: 'JSON',
	            active: this.state.showEvent,
	            onClick: this.handleShowButton })
	        )
	      ),
	      this.getTable(this.state.showEvent, this.state.events)
	    );
	  }
	});

	module.exports = EventsPain;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var ShowButton = React.createClass({
	  propTypes: {
	    buttonId: React.PropTypes.string.isRequired,
	    text: React.PropTypes.string.isRequired,
	    active: React.PropTypes.string.isRequired,
	    onClick: React.PropTypes.func.isRequired
	  },
	  handleSelect: function () {
	    this.props.onClick(this.props.buttonId);
	  },
	  getActive: function (buttonId, active) {
	    if (buttonId === active) return 'btn btn-default active';else return 'btn btn-default';
	  },
	  render: function () {
	    return React.createElement(
	      'button',
	      {
	        className: this.getActive(this.props.buttonId, this.props.active),
	        id: this.props.buttonId,
	        onClick: this.handleSelect },
	      this.props.text
	    );
	  }
	});
	module.exports = ShowButton;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var EventItemTable = React.createClass({
	  propTypes: {
	    event: React.PropTypes.object.isRequired
	  },

	  render: function () {
	    return React.createElement(
	      "tr",
	      null,
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.timestamp
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.event
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.email
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event["smtp-id"]
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.response
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.sg_event_id
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.sg_message_id
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.useragent
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.ip
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.attempt
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.category
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.url
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.status
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.reason
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.type
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.event.send_at
	        )
	      )
	    );
	  }
	});
	module.exports = EventItemTable;

/***/ },
/* 16 */
/***/ function(module, exports) {

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	var EventItemJson = React.createClass({
	  propTypes: {
	    event: React.PropTypes.object.isRequired,
	    firstRow: React.PropTypes.bool.isRequired
	  },

	  render: function () {
	    return React.createElement(
	      "tr",
	      null,
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "div",
	          null,
	          React.createElement(
	            "small",
	            null,
	            JSON.stringify(this.props.event)
	          )
	        )
	      )
	    );
	  }
	});
	module.exports = EventItemJson;

/***/ },
/* 17 */
/***/ function(module, exports) {

	var ReceivePage = React.createClass({
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      "Active page is Receive page"
	    );
	  }
	});
	module.exports = ReceivePage;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var DemoboxStore = __webpack_require__(19);
	var DemoboxActions = __webpack_require__(20);

	var stores = {
	  DemoboxStore: new DemoboxStore()
	};
	var actions = DemoboxActions;
	var flux = new Fluxxor.Flux(stores, actions);

	flux.on("dispatch", function (type, payload) {
	  if (console && console.log) {
	    console.log("[Dispatch]", type, payload);
	  }
	});

	var io = new RocketIO().connect(); // WebSocketとCometの適当な方が使われる
	io.on("event", function (value) {
	  console.log("RocketIOReceiver event: " + value);
	  flux.actions.addEvents(value);
	  // var event = JSON.parse(value);
	  // $("#event-table").prepend(getRow(event));
	  // $("#event-table td div").slideDown(500);
	  // $("#event-json").prepend("<tr><td><small><div style='display:none'>"+value+"</div></small></td></tr>");
	  // $("#event-json td div").slideDown(500);
	});

	module.exports = flux;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(21);

	var DemoboxStore = Fluxxor.createStore({
	  initialize: function () {
	    this.mailData = {
	      personalizations: [{
	        to: [{ email: "", name: "" }],
	        headers: [{ "X-Header": "ValueValue" }],
	        substitutions: [],
	        custom_args: []
	      }]
	    };
	    this.status = '';
	    this.request = '';
	    this.reponseCode = '';
	    this.responseBody = '';
	    this.error = null;
	    this.result = "";

	    this.showEvent = "json";

	    this.events = [];

	    this.bindActions(constants.ADD_PERSONALIZATION, this.onAddPersonalization, constants.DEL_PERSONALIZATION, this.onDelPersonalization, constants.ADD_HEADER_INPERSONAL, this.onAddHeaderInpersonal, constants.DEL_HEADER_INPERSONAL, this.onDelHeaderInpersonal, constants.SEND_MAIL, this.onSendMail, constants.SEND_MAIL_SUCCESS, this.onSendMailSuccess, constants.SEND_MAIL_FAIL, this.onSendMailFail, constants.TOGGLE_SHOW_EVENT, this.onToggleShowEvent, constants.ADD_EVENTS, this.onAddEvents);
	  },

	  onAddPersonalization: function () {
	    this.mailData.personalizations.push({
	      to: [{ email: "", name: "" }],
	      headers: [],
	      substitutions: [],
	      custom_args: []
	    });
	    this.emit("change");
	  },

	  onDelPersonalization: function (index) {
	    this.mailData.personalizations.splice(index, 1);
	    this.emit("change");
	  },

	  onAddHeaderInpersonal: function (index) {
	    this.mailData.personalizations[index].headers.push({ "": "" });
	    this.emit("change");
	  },

	  onDelHeaderInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].headers.splice(payload.index, 1);
	    this.emit("change");
	  },

	  onSendMail: function () {
	    this.status = '送信中...';
	    this.request = '';
	    this.responseCode = '';
	    this.responseBody = '';
	    this.emit("change");
	  },

	  onSendMailSuccess: function (payload) {
	    this.status = '送信完了';
	    this.request = payload.result.request;
	    this.responseCode = payload.result.responseCode;
	    this.responseBody = payload.result.responseBody;
	    this.emit("change");
	  },

	  onSendMailFail: function (payload) {
	    this.status = '送信失敗';
	    this.responseCode = payload.responseCode;
	    this.responseBody = payload.responseBody;
	    this.emit("change");
	  },

	  onToggleShowEvent: function (payload) {
	    // console.log("DemoboxStore#onToggleShowEvent()1: " + payload.buttonId);
	    this.showEvent = payload.buttonId;
	    this.emit("change");
	  },

	  onAddEvents: function (payload) {
	    // console.log("DemoboxStore#onAddEvents()1: " + payload.events);
	    var events = JSON.parse(payload.events);
	    // console.log("DemoboxStore#onAddEvents()2: " + events);
	    events.map(function (event) {
	      this.events.unshift(event);
	    }.bind(this));
	    // console.log(JSON.stringify(this.events));
	    this.emit("change");
	  }
	});

	module.exports = DemoboxStore;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(21);
	var DemoboxClient = __webpack_require__(22);

	var actions = {
	  addPersonalization: function () {
	    this.dispatch(constants.ADD_PERSONALIZATION, { to: [{ email: "", name: "" }] });
	  },

	  delPersonalization: function (index) {
	    this.dispatch(constants.DEL_PERSONALIZATION, index);
	  },

	  addHeaderInpersonal: function (index) {
	    this.dispatch(constants.ADD_HEADER_INPERSONAL, index);
	  },

	  delHeaderInpersonal: function (parentIndex, index) {
	    this.dispatch(constants.DEL_HEADER_INPERSONAL, { parentIndex: parentIndex, index: index });
	  },

	  sendMail: function (param) {
	    var requestParam = JSON.stringify(param);
	    this.dispatch(constants.SEND_MAIL);
	    DemoboxClient.sendMail(requestParam, function (result) {
	      this.dispatch(constants.SEND_MAIL_SUCCESS, { result: result });
	    }.bind(this), function (xhr, status, err) {
	      this.dispatch(constants.SEND_MAIL_FAIL, {
	        responseCode: xhr.status,
	        responseBody: err.message
	      });
	    }.bind(this));
	  },

	  toggleShowEvent: function (buttonId) {
	    // console.log("DemoboxAction#toggleShowEvent() " + buttonId);
	    this.dispatch(constants.TOGGLE_SHOW_EVENT, { buttonId: buttonId });
	  },

	  addEvents: function (events) {
	    // console.log("DemoboxAction#addEvents() " + events);
	    this.dispatch(constants.ADD_EVENTS, { events: events });
	  }
	};

	module.exports = actions;

/***/ },
/* 21 */
/***/ function(module, exports) {

	var constants = {
	  ADD_PERSONALIZATION: "ADD_PERSONALIZATION",
	  DEL_PERSONALIZATION: "DEL_PERSONALIZATION",
	  ADD_HEADER_INPERSONAL: "ADD_HEADER_INPERSONAL",
	  DEL_HEADER_INPERSONAL: "DEL_HEADER_INPERSONAL",
	  SEND_MAIL: "SEND_MAIL",
	  SEND_MAIL_SUCCESS: "SEND_MAIL_SUCCESS",
	  SEND_MAIL_FAIL: "SEND_MAIL_FAIL",
	  TOGGLE_SHOW_EVENT: "TOGGLE_SHOW_EVENT",
	  ADD_EVENTS: "ADD_EVENTS"
	};

	module.exports = constants;

/***/ },
/* 22 */
/***/ function(module, exports) {

	var DemoboxClient = {
	  sendMail: function (requestParam, success, failure) {
	    // console.log('DemoClient.sendMail()');
	    $.ajax({
	      url: '/send',
	      dataType: 'json',
	      type: 'POST',
	      data: requestParam,
	      success: success,
	      error: failure
	    });
	  }
	};

	module.exports = DemoboxClient;

/***/ }
/******/ ]);