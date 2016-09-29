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
	var flux = __webpack_require__(21);

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
	var ReceivePage = __webpack_require__(20);

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
	var EventsPain = __webpack_require__(16);

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
	var SimpleTextForm = __webpack_require__(11);
	var ContentForm = __webpack_require__(14);
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
	      responseBody: store.responseBody,
	      mailData: store.mailData
	    };
	  },

	  handleUpdFrom: function (id, key, value) {
	    this.getFlux().actions.updFrom(key, value);
	  },
	  handleAddReplyto: function () {
	    this.getFlux().actions.addReplyto();
	  },

	  handleDelReplyto: function () {
	    this.getFlux().actions.delReplyto();
	  },

	  handleUpdReplyto: function (id, key, value) {
	    this.getFlux().actions.updReplyto(key, value);
	  },

	  handleAddSubject: function () {
	    this.getFlux().actions.addSubject();
	  },
	  handleDelSubject: function () {
	    this.getFlux().actions.delSubject();
	  },
	  handleUpdSubject: function () {
	    this.getFlux().actions.updSubject();
	  },
	  handleUpdSubject: function (parentIndex, value) {
	    this.getFlux().actions.updSubject(value);
	  },

	  handleAddContent: function () {
	    this.getFlux().actions.addContent();
	  },

	  handleDelContent: function (type) {
	    this.getFlux().actions.delContent(type);
	  },

	  handleUpdContent: function (type, value) {
	    this.getFlux().actions.updContent(type, value);
	  },

	  handleSendMail: function (e) {
	    e.preventDefault();
	    // var form = $('#param');
	    // var param = {};
	    // $(form.serializeArray()).each(function(i, v) {
	    //   param[v.name] = v.value;
	    // });
	    // // console.log(param);
	    // this.getFlux().actions.sendMail(param);

	    this.getFlux().actions.sendMail(this.state.mailData);
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'form',
	        { id: 'param', className: 'form-horizontal' },
	        React.createElement(PersonalizationList, null),
	        React.createElement(EmailForm, {
	          title: 'from',
	          required: true,
	          data: this.state.mailData.from,
	          handleUpd: this.handleUpdFrom,
	          max: 1 }),
	        React.createElement(EmailForm, {
	          title: 'reply-to',
	          required: false,
	          data: this.state.mailData["reply-to"],
	          handleAdd: this.handleAddReplyto,
	          handleDel: this.handleDelReplyto,
	          handleUpd: this.handleUpdReplyto,
	          max: 1 }),
	        React.createElement(SimpleTextForm, {
	          title: 'subject',
	          required: false,
	          placeholder: 'subject',
	          value: this.state.mailData.subject,
	          handleAdd: this.handleAddSubject,
	          handleUpd: this.handleUpdSubject,
	          handleDel: this.handleDelSubject,
	          max: 1 }),
	        React.createElement(ContentForm, {
	          data: this.state.mailData.content,
	          handleAdd: this.handleAddContent,
	          handleDel: this.handleDelContent,
	          handleUpd: this.handleUpdContent }),
	        React.createElement(
	          'div',
	          { id: 'accordion' },
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
	      null,
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
	      React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "a",
	          { href: "javascript:void(0)", onClick: this.handleAddPersonalization,
	            className: "pull-right" },
	          React.createElement("span", { className: "glyphicon glyphicon-plus" })
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
	var SimpleTextForm = __webpack_require__(11);
	var KeyValueForm = __webpack_require__(12);
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
	        personalization: store.mailData.personalizations[this.props.index]
	      };
	    }
	    return state;
	  },

	  handleDelPersonalization: function () {
	    this.getFlux().actions.delPersonalization(this.props.index);
	  },

	  handleAddToInpersonal: function () {
	    this.getFlux().actions.addToInpersonal(this.props.index);
	  },
	  handleDelToInpersonal: function (index) {
	    this.getFlux().actions.delToInpersonal(this.props.index, index);
	  },
	  handleUpdToInpersonal: function (index, key, value) {
	    this.getFlux().actions.updToInpersonal(this.props.index, index, key, value);
	  },

	  handleAddCcInpersonal: function () {
	    this.getFlux().actions.addCcInpersonal(this.props.index);
	  },
	  handleDelCcInpersonal: function (index) {
	    this.getFlux().actions.delCcInpersonal(this.props.index, index);
	  },
	  handleUpdCcInpersonal: function (index, key, value) {
	    this.getFlux().actions.updCcInpersonal(this.props.index, index, key, value);
	  },

	  handleAddBccInpersonal: function () {
	    this.getFlux().actions.addBccInpersonal(this.props.index);
	  },
	  handleDelBccInpersonal: function (index) {
	    this.getFlux().actions.delBccInpersonal(this.props.index, index);
	  },
	  handleUpdBccInpersonal: function (index, key, value) {
	    this.getFlux().actions.updBccInpersonal(this.props.index, index, key, value);
	  },

	  handleAddSubjectInpersonal: function () {
	    this.getFlux().actions.addSubjectInpersonal(this.props.index);
	  },
	  handleDelSubjectInpersonal: function () {
	    this.getFlux().actions.delSubjectInpersonal(this.props.index);
	  },
	  handleUpdSubjectInpersonal: function (parentIndex, value) {
	    this.getFlux().actions.updSubjectInpersonal(parentIndex, value);
	  },

	  handleAddHeaderInpersonal: function () {
	    this.getFlux().actions.addHeaderInpersonal(this.props.index);
	  },
	  handleDelHeaderInpersonal: function (index) {
	    this.getFlux().actions.delHeaderInpersonal(this.props.index, index);
	  },
	  handleUpdHeaderInpersonal: function (index, key, value) {
	    this.getFlux().actions.updHeaderInpersonal(this.props.index, index, key, value);
	  },

	  handleAddSubstitutionInpersonal: function () {
	    this.getFlux().actions.addSubstitutionInpersonal(this.props.index);
	  },
	  handleDelSubstitutionInpersonal: function (index) {
	    this.getFlux().actions.delSubstitutionInpersonal(this.props.index, index);
	  },
	  handleUpdSubstitutionInpersonal: function (index, key, value) {
	    this.getFlux().actions.updSubstitutionInpersonal(this.props.index, index, key, value);
	  },

	  handleAddCustomargInpersonal: function () {
	    this.getFlux().actions.addCustomargInpersonal(this.props.index);
	  },
	  handleDelCustomargInpersonal: function (index) {
	    this.getFlux().actions.delCustomargInpersonal(this.props.index, index);
	  },
	  handleUpdCustomargInpersonal: function (index, key, value) {
	    this.getFlux().actions.updCustomargInpersonal(this.props.index, index, key, value);
	  },

	  handleAddSendAtInpersonal: function () {
	    this.getFlux().actions.addSendAtInpersonal(this.props.index);
	  },
	  handleDelSendAtInpersonal: function () {
	    this.getFlux().actions.delSendAtInpersonal(this.props.index);
	  },
	  handleUpdSendAtInpersonal: function (parentIndex, value) {
	    this.getFlux().actions.updSendAtInpersonal(parentIndex, value);
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'wrapper' },
	      React.createElement(
	        'div',
	        { className: 'fixed' },
	        React.createElement(
	          'a',
	          { href: 'javascript:void(0)', onClick: this.handleDelPersonalization,
	            className: 'removeIcon' },
	          React.createElement('span', { className: 'glyphicon glyphicon-remove' })
	        )
	      ),
	      React.createElement(
	        'div',
	        { className: 'flex' },
	        React.createElement(EmailForm, {
	          title: 'to',
	          required: true,
	          data: this.state.personalization.to,
	          handleAdd: this.handleAddToInpersonal,
	          handleDel: this.handleDelToInpersonal,
	          handleUpd: this.handleUpdToInpersonal }),
	        React.createElement(EmailForm, {
	          title: 'cc',
	          required: false,
	          data: this.state.personalization.cc,
	          handleAdd: this.handleAddCcInpersonal,
	          handleDel: this.handleDelCcInpersonal,
	          handleUpd: this.handleUpdCcInpersonal }),
	        React.createElement(EmailForm, {
	          title: 'bcc',
	          required: false,
	          data: this.state.personalization.bcc,
	          handleAdd: this.handleAddBccInpersonal,
	          handleDel: this.handleDelBccInpersonal,
	          handleUpd: this.handleUpdBccInpersonal }),
	        React.createElement(SimpleTextForm, {
	          title: 'subject',
	          required: false,
	          placeholder: 'subject',
	          index: this.props.index,
	          value: this.state.personalization.subject,
	          handleAdd: this.handleAddSubjectInpersonal,
	          handleUpd: this.handleUpdSubjectInpersonal,
	          handleDel: this.handleDelSubjectInpersonal,
	          max: 1 }),
	        React.createElement(KeyValueForm, {
	          title: 'headers',
	          required: false,
	          data: this.state.personalization.headers,
	          handleAdd: this.handleAddHeaderInpersonal,
	          handleDel: this.handleDelHeaderInpersonal,
	          handleUpd: this.handleUpdHeaderInpersonal,
	          placeholderKey: 'header-key',
	          placeholderValue: 'header-value' }),
	        React.createElement(KeyValueForm, {
	          title: 'substitutions',
	          required: false,
	          data: this.state.personalization.substitutions,
	          handleAdd: this.handleAddSubstitutionInpersonal,
	          handleDel: this.handleDelSubstitutionInpersonal,
	          handleUpd: this.handleUpdSubstitutionInpersonal,
	          placeholderKey: 'substitution-key',
	          placeholderValue: 'substitution-value' }),
	        React.createElement(KeyValueForm, {
	          title: 'custom_args',
	          required: false,
	          data: this.state.personalization.custom_args,
	          handleAdd: this.handleAddCustomargInpersonal,
	          handleDel: this.handleDelCustomargInpersonal,
	          handleUpd: this.handleUpdCustomargInpersonal,
	          placeholderKey: 'custom-args-key',
	          placeholderValue: 'custom-args-value' }),
	        React.createElement(SimpleTextForm, {
	          title: 'send_at',
	          required: false,
	          index: this.props.index,
	          value: this.state.personalization.send_at,
	          handleAdd: this.handleAddSendAtInpersonal,
	          handleDel: this.handleDelSendAtInpersonal,
	          handleUpd: this.handleUpdSendAtInpersonal,
	          placeholder: 'UNIXTIME',
	          max: 1 })
	      )
	    );
	  }
	});
	module.exports = PersonalizationItem;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var EmailItem = __webpack_require__(10);

	var EmailForm = React.createClass({
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    required: React.PropTypes.bool.isRequired,
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func,
	    handleDel: React.PropTypes.func,
	    handleUpd: React.PropTypes.func,
	    max: React.PropTypes.number
	  },

	  getInitialState: function () {
	    return {};
	  },

	  render: function () {
	    var rq = '';
	    if (this.props.required) {
	      rq = React.createElement(
	        'span',
	        { className: 'text-danger' },
	        '*'
	      );
	    }
	    var add;
	    var items;
	    if (Array.isArray(this.props.data)) {
	      items = this.props.data.map(function (data, index) {
	        return React.createElement(EmailItem, {
	          index: index,
	          data: data,
	          handleDel: this.props.handleDel,
	          handleUpd: this.props.handleUpd });
	      }.bind(this));
	      add = React.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.props.handleAdd,
	          className: 'pull-right' },
	        React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	      );
	    } else {
	      if (this.props.data != null) {
	        items = React.createElement(EmailItem, {
	          data: this.props.data,
	          handleDel: this.props.handleDel,
	          handleUpd: this.props.handleUpd });
	      }
	      if (this.props.data == null && this.props.max == 1) {
	        add = React.createElement(
	          'a',
	          { href: 'javascript:void(0)', onClick: this.props.handleAdd,
	            className: 'pull-right' },
	          React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	        );
	      }
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        { className: 'control-label' },
	        rq,
	        this.props.title
	      ),
	      React.createElement(
	        'div',
	        null,
	        items
	      ),
	      add
	    );
	  }
	});
	module.exports = EmailForm;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var EmailItem = React.createClass({
	  propTypes: {
	    index: React.PropTypes.number,
	    data: React.PropTypes.array.isRequired,
	    handleDel: React.PropTypes.func,
	    handleUpd: React.PropTypes.func
	  },
	  getInitialState: function () {
	    return {};
	  },

	  handleDel: function (e) {
	    e.preventDefault();
	    this.props.handleDel(this.props.index);
	  },

	  handleUpd: function (e) {
	    e.preventDefault();
	    this.props.handleUpd(this.props.index, e.target.name, e.target.value);
	  },

	  render: function () {
	    var del;
	    if (typeof this.props.handleDel == "function") {
	      del = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.handleDel,
	          className: "removeIcon" },
	        React.createElement("span", { className: "glyphicon glyphicon-remove" })
	      );
	    }

	    return React.createElement(
	      "div",
	      { className: "wrapper" },
	      React.createElement(
	        "div",
	        { className: "fixed" },
	        del
	      ),
	      React.createElement(
	        "div",
	        { className: "flex" },
	        React.createElement("input", {
	          type: "text",
	          name: "email",
	          className: "form-control",
	          placeholder: "email",
	          defaultValue: this.props.data.email,
	          onChange: this.handleUpd }),
	        React.createElement("input", {
	          type: "text",
	          name: "name",
	          className: "form-control",
	          placeholder: "name",
	          defaultValue: this.props.data.name,
	          onChange: this.handleUpd })
	      )
	    );
	  }
	});
	module.exports = EmailItem;

/***/ },
/* 11 */
/***/ function(module, exports) {

	var SimpleTextForm = React.createClass({
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    required: React.PropTypes.bool.isRequired,
	    index: React.PropTypes.number.isRequired,
	    placeholder: React.PropTypes.string.isRequired,
	    value: React.PropTypes.string.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired,
	    max: React.PropTypes.number
	  },

	  getInitialState: function () {
	    return {
	      disabled: true
	    };
	  },

	  handleDel: function (e) {
	    e.preventDefault();
	    this.props.handleDel();
	  },

	  handleUpd: function (e) {
	    e.preventDefault();
	    this.props.handleUpd(this.props.index, e.target.value);
	  },

	  render: function () {
	    var del;
	    if (typeof this.props.handleDel == "function") {
	      del = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.handleDel,
	          className: "removeIcon" },
	        React.createElement("span", { className: "glyphicon glyphicon-remove" })
	      );
	    }

	    var rq = '';
	    if (this.props.required) {
	      rq = React.createElement(
	        "span",
	        { className: "text-danger" },
	        "*"
	      );
	    }
	    var add;
	    var items;
	    if (this.props.value != null) {
	      items = React.createElement(
	        "div",
	        { className: "wrapper" },
	        React.createElement(
	          "div",
	          { className: "fixed" },
	          del
	        ),
	        React.createElement(
	          "div",
	          { className: "flex" },
	          React.createElement("input", {
	            type: "text",
	            name: this.props.paramName,
	            className: "form-control",
	            placeholder: this.props.placeholder,
	            defaultValue: this.props.value,
	            onChange: this.handleUpd })
	        )
	      );
	    }
	    if (this.props.value == null && this.props.max == 1) {
	      add = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd,
	          className: "pull-right" },
	        React.createElement("span", { className: "glyphicon glyphicon-plus" })
	      );
	    }
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        rq,
	        this.props.title
	      ),
	      React.createElement(
	        "div",
	        null,
	        items
	      ),
	      add
	    );
	  }
	});
	module.exports = SimpleTextForm;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var KeyValueItem = __webpack_require__(13);

	var KeyValueForm = React.createClass({
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    required: React.PropTypes.bool.isRequired,
	    data: React.PropTypes.array.isRequired,
	    placeholderKey: React.PropTypes.string.isRequired,
	    placeholderValue: React.PropTypes.string.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
	  },

	  getInitialState: function () {
	    return {};
	  },

	  render: function () {
	    var rq = '';
	    if (this.props.required) {
	      rq = React.createElement(
	        'span',
	        { className: 'text-danger' },
	        '*'
	      );
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        { className: 'control-label' },
	        rq,
	        this.props.title
	      ),
	      React.createElement(
	        'div',
	        null,
	        this.props.data.map(function (data, index) {
	          return React.createElement(KeyValueItem, {
	            index: index,
	            handleDel: this.props.handleDel,
	            handleUpd: this.props.handleUpd,
	            placeholderKey: this.props.placeholderKey,
	            placeholderValue: this.props.placeholderValue,
	            data: data });
	        }.bind(this))
	      ),
	      React.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.props.handleAdd,
	          className: 'pull-right' },
	        React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	      )
	    );
	  }
	});
	module.exports = KeyValueForm;

/***/ },
/* 13 */
/***/ function(module, exports) {

	var KeyValueItem = React.createClass({
	  propTypes: {
	    index: React.PropTypes.number.isRequired,
	    data: React.PropTypes.array.isRequired,
	    placeholderKey: React.PropTypes.string.isRequired,
	    placeholderValue: React.PropTypes.string.isRequired,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
	  },

	  getInitialState: function () {
	    return {};
	  },

	  handleDel: function (e) {
	    e.preventDefault();
	    this.props.handleDel(this.props.index);
	  },

	  handleUpd: function (e) {
	    e.preventDefault();
	    this.props.handleUpd(this.props.index, e.target.name, e.target.value);
	  },

	  render: function () {
	    return React.createElement(
	      "div",
	      { className: "wrapper" },
	      React.createElement(
	        "div",
	        { className: "fixed" },
	        React.createElement(
	          "a",
	          { href: "javascript:void(0)", onClick: this.handleDel,
	            className: "removeIcon" },
	          React.createElement("span", { className: "glyphicon glyphicon-remove" })
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "flex" },
	        React.createElement("input", {
	          type: "text",
	          name: "key",
	          className: "form-control",
	          placeholder: this.props.placeholderKey,
	          defaultValue: this.props.data.key,
	          onChange: this.handleUpd }),
	        React.createElement("input", {
	          type: "text",
	          name: "value",
	          className: "form-control",
	          placeholder: this.props.placeholderValue,
	          defaultValue: this.props.data.value,
	          onChange: this.handleUpd })
	      )
	    );
	  }
	});
	module.exports = KeyValueItem;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var ContentItem = __webpack_require__(15);

	var ContentForm = React.createClass({
	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func,
	    handleDel: React.PropTypes.func,
	    handleUpd: React.PropTypes.func
	  },

	  getInitialState: function () {
	    return {};
	  },

	  render: function () {
	    var add;
	    if (this.props.data.length < 2) {
	      add = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd,
	          className: "pull-right" },
	        React.createElement("span", { className: "glyphicon glyphicon-plus" })
	      );
	    }

	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        React.createElement(
	          "span",
	          { className: "text-danger" },
	          "*"
	        ),
	        "content"
	      ),
	      React.createElement(
	        "div",
	        null,
	        this.props.data.map(function (data, index) {
	          return React.createElement(ContentItem, {
	            index: index,
	            data: data,
	            handleDel: this.props.handleDel,
	            handleUpd: this.props.handleUpd });
	        }.bind(this))
	      ),
	      add
	    );
	  }
	});
	module.exports = ContentForm;

/***/ },
/* 15 */
/***/ function(module, exports) {

	var ContentItem = React.createClass({
	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    index: React.PropTypes.number,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
	  },

	  getInitialState: function () {
	    return {};
	  },

	  handleDel: function () {
	    this.props.handleDel(this.props.data.type);
	  },

	  handleUpd: function (e) {
	    e.preventDefault();
	    this.props.handleUpd(this.props.data.type, e.target.value);
	  },

	  render: function () {
	    var del;
	    if (typeof this.props.handleDel == "function") {
	      del = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.handleDel,
	          className: "removeIcon" },
	        React.createElement("span", { className: "glyphicon glyphicon-remove" })
	      );
	    }

	    return React.createElement(
	      "div",
	      { className: "wrapper" },
	      React.createElement(
	        "div",
	        { className: "fixed" },
	        del
	      ),
	      React.createElement(
	        "div",
	        { className: "flex" },
	        React.createElement(
	          "label",
	          null,
	          this.props.data.type
	        ),
	        React.createElement("textarea", {
	          name: this.props.data.type,
	          className: "form-control",
	          defaultValue: this.props.data.value,
	          onChange: this.handleUpd })
	      )
	    );
	  }
	});
	module.exports = ContentItem;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var ShowButton = __webpack_require__(17);
	var EventItemTable = __webpack_require__(18);
	var EventItemJson = __webpack_require__(19);
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var DemoboxStore = __webpack_require__(22);
	var DemoboxActions = __webpack_require__(24);

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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(23);

	var DemoboxStore = Fluxxor.createStore({
	  initialize: function () {
	    this.mailData = {
	      personalizations: [{
	        to: [{ email: "", name: "" }],
	        cc: [],
	        bcc: [],
	        subject: null,
	        headers: [],
	        substitutions: [],
	        custom_args: [],
	        sned_at: null
	      }],
	      subject: null,
	      from: { email: "", name: "" },
	      "reply-to": null,
	      content: [{ type: "text/plain", value: "hoge" }, { type: "text/html", value: "fuga" }]
	    };
	    this.status = '';
	    this.request = '';
	    this.reponseCode = '';
	    this.responseBody = '';
	    this.error = null;
	    this.result = "";
	    this.showEvent = "json";
	    this.events = [];

	    this.bindActions(constants.ADD_PERSONALIZATION, this.onAddPersonalization, constants.DEL_PERSONALIZATION, this.onDelPersonalization, constants.ADD_TO_INPERSONAL, this.onAddToInpersonal, constants.DEL_TO_INPERSONAL, this.onDelToInpersonal, constants.UPD_TO_INPERSONAL, this.onUpdToInpersonal, constants.ADD_CC_INPERSONAL, this.onAddCcInpersonal, constants.DEL_CC_INPERSONAL, this.onDelCcInpersonal, constants.UPD_CC_INPERSONAL, this.onUpdCcInpersonal, constants.ADD_BCC_INPERSONAL, this.onAddBccInpersonal, constants.DEL_BCC_INPERSONAL, this.onDelBccInpersonal, constants.UPD_BCC_INPERSONAL, this.onUpdBccInpersonal, constants.ADD_SUBJECT_INPERSONAL, this.onAddSubjectInpersonal, constants.DEL_SUBJECT_INPERSONAL, this.onDelSubjectInpersonal, constants.UPD_SUBJECT_INPERSONAL, this.onUpdSubjectInpersonal, constants.ADD_HEADER_INPERSONAL, this.onAddHeaderInpersonal, constants.DEL_HEADER_INPERSONAL, this.onDelHeaderInpersonal, constants.UPD_HEADER_INPERSONAL, this.onUpdHeaderInpersonal, constants.ADD_SUBSTITUTION_INPERSONAL, this.onAddSubstitutionInpersonal, constants.DEL_SUBSTITUTION_INPERSONAL, this.onDelSubstitutionInpersonal, constants.UPD_SUBSTITUTION_INPERSONAL, this.onUpdSubstitutionInpersonal, constants.ADD_CUSTOMARG_INPERSONAL, this.onAddCustomargInpersonal, constants.DEL_CUSTOMARG_INPERSONAL, this.onDelCustomargInpersonal, constants.UPD_CUSTOMARG_INPERSONAL, this.onUpdCustomargInpersonal, constants.ADD_SEND_AT_INPERSONAL, this.onAddSendAtInpersonal, constants.DEL_SEND_AT_INPERSONAL, this.onDelSendAtInpersonal, constants.UPD_SEND_AT_INPERSONAL, this.onUpdSendAtInpersonal, constants.ADD_REPLYTO, this.onAddReplyto, constants.DEL_REPLYTO, this.onDelReplyto, constants.UPD_REPLYTO, this.onUpdReplyto, constants.UPD_FROM, this.onUpdFrom, constants.ADD_SUBJECT, this.onAddSubject, constants.DEL_SUBJECT, this.onDelSubject, constants.UPD_SUBJECT, this.onUpdSubject, constants.ADD_CONTENT, this.onAddContent, constants.DEL_CONTENT, this.onDelContent, constants.UPD_CONTENT, this.onUpdContent, constants.SEND_MAIL, this.onSendMail, constants.SEND_MAIL_SUCCESS, this.onSendMailSuccess, constants.SEND_MAIL_FAIL, this.onSendMailFail, constants.TOGGLE_SHOW_EVENT, this.onToggleShowEvent, constants.ADD_EVENTS, this.onAddEvents);
	  },

	  onAddPersonalization: function () {
	    this.mailData.personalizations.push({
	      to: [{ email: "", name: "" }],
	      cc: [],
	      bcc: [],
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

	  onAddToInpersonal: function (index) {
	    this.mailData.personalizations[index].to.push({ email: "", name: "" });
	    this.emit("change");
	  },

	  onDelToInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].to.splice(payload.index, 1);
	    this.emit("change");
	  },

	  onUpdToInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].to[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddCcInpersonal: function (index) {
	    this.mailData.personalizations[index].cc.push({ email: "", name: "" });
	    this.emit("change");
	  },

	  onDelCcInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].cc.splice(payload.index, 1);
	    this.emit("change");
	  },

	  onUpdCcInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].cc[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddBccInpersonal: function (index) {
	    this.mailData.personalizations[index].bcc.push({ email: "", name: "" });
	    this.emit("change");
	  },
	  onDelBccInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].bcc.splice(payload.index, 1);
	    this.emit("change");
	  },
	  onUpdBccInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].bcc[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddSubjectInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].subject = "";
	    this.emit("change");
	  },
	  onDelSubjectInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].subject = null;
	    this.emit("change");
	  },
	  onUpdSubjectInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].subject = payload.value;
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
	  onUpdHeaderInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].headers[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddSubstitutionInpersonal: function (index) {
	    this.mailData.personalizations[index].substitutions.push({ "": "" });
	    this.emit("change");
	  },

	  onDelSubstitutionInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].substitutions.splice(payload.index, 1);
	    this.emit("change");
	  },

	  onUpdSubstitutionInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].substitutions[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddCustomargInpersonal: function (index) {
	    this.mailData.personalizations[index].custom_args.push({ "": "" });
	    this.emit("change");
	  },

	  onDelCustomargInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].custom_args.splice(payload.index, 1);
	    this.emit("change");
	  },

	  onUpdCustomargInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].custom_args[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddSendAtInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].send_at = "";
	    this.emit("change");
	  },
	  onDelSendAtInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].send_at = null;
	    this.emit("change");
	  },
	  onUpdSendAtInpersonal: function (payload) {
	    this.mailData.personalizations[payload.parentIndex].send_at = payload.value;
	    this.emit("change");
	  },

	  onUpdFrom: function (payload) {
	    this.mailData.from[payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddReplyto: function () {
	    this.mailData["reply-to"] = { email: "", name: "" };
	    this.emit("change");
	  },

	  onDelReplyto: function () {
	    this.mailData["reply-to"] = null;
	    this.emit("change");
	  },

	  onUpdReplyto: function (payload) {
	    this.mailData["reply-to"][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddSubject: function () {
	    this.mailData.subject = "";
	    this.emit("change");
	  },
	  onDelSubject: function () {
	    this.mailData.subject = null;
	    this.emit("change");
	  },
	  onUpdSubject: function (payload) {
	    this.mailData.subject = payload.value;
	    this.emit("change");
	  },

	  onAddContent: function () {
	    var type = "";
	    var existHtml = this.mailData.content.some(function (content) {
	      return content.type == "text/html";
	    });
	    if (!existHtml) type = "text/html";

	    var existPlain = this.mailData.content.some(function (content) {
	      return content.type == "text/plain";
	    });
	    if (!existPlain) type = "text/plain";

	    if (type !== "") this.mailData.content.push({ type: type, value: "" });
	    this.emit("change");
	  },

	  onDelContent: function (payload) {
	    for (var i = 0; i < this.mailData.content.length; i++) {
	      if (this.mailData.content[i].type === payload.type) {
	        this.mailData.content.splice(i, 1);
	        break;
	      }
	    }
	    this.emit("change");
	  },

	  onUpdContent: function (payload) {
	    for (var i = 0; i < this.mailData.content.length; i++) {
	      if (this.mailData.content[i].type === payload.type) {
	        this.mailData.content[i].value = payload.value;
	        break;
	      }
	    }
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
/* 23 */
/***/ function(module, exports) {

	var constants = {
	  ADD_PERSONALIZATION: "ADD_PERSONALIZATION",
	  DEL_PERSONALIZATION: "DEL_PERSONALIZATION",
	  ADD_TO_INPERSONAL: "ADD_TO_INPERSONAL",
	  DEL_TO_INPERSONAL: "DEL_TO_INPERSONAL",
	  UPD_TO_INPERSONAL: "UPD_TO_INPERSONAL",
	  ADD_CC_INPERSONAL: "ADD_CC_INPERSONAL",
	  DEL_CC_INPERSONAL: "DEL_CC_INPERSONAL",
	  UPD_CC_INPERSONAL: "UPD_CC_INPERSONAL",
	  ADD_BCC_INPERSONAL: "ADD_BCC_INPERSONAL",
	  DEL_BCC_INPERSONAL: "DEL_BCC_INPERSONAL",
	  UPD_BCC_INPERSONAL: "UPD_BCC_INPERSONAL",
	  ADD_SUBJECT_INPERSONAL: "ADD_SUBJECT_INPERSONAL",
	  DEL_SUBJECT_INPERSONAL: "DEL_SUBJECT_INPERSONAL",
	  UPD_SUBJECT_INPERSONAL: "UPD_SUBJECT_INPERSONAL",
	  ADD_HEADER_INPERSONAL: "ADD_HEADER_INPERSONAL",
	  DEL_HEADER_INPERSONAL: "DEL_HEADER_INPERSONAL",
	  UPD_HEADER_INPERSONAL: "UPD_HEADER_INPERSONAL",
	  ADD_SUBSTITUTION_INPERSONAL: "ADD_SUBSTITUTION_INPERSONAL",
	  DEL_SUBSTITUTION_INPERSONAL: "DEL_SUBSTITUTION_INPERSONAL",
	  UPD_SUBSTITUTION_INPERSONAL: "UPD_SUBSTITUTION_INPERSONAL",
	  ADD_CUSTOMARG_INPERSONAL: "ADD_CUSTOMARG_INPERSONAL",
	  DEL_CUSTOMARG_INPERSONAL: "DEL_CUSTOMARG_INPERSONAL",
	  UPD_CUSTOMARG_INPERSONAL: "UPD_CUSTOMARG_INPERSONAL",
	  ADD_SEND_AT_INPERSONAL: "ADD_SEND_AT_INPERSONAL",
	  DEL_SEND_AT_INPERSONAL: "DEL_SEND_AT_INPERSONAL",
	  UPD_SEND_AT_INPERSONAL: "UPD_SEND_AT_INPERSONAL",
	  UPD_FROM: "UPD_FROM",
	  ADD_REPLYTO: "ADD_REPLYTO",
	  DEL_REPLYTO: "DEL_REPLYTO",
	  UPD_REPLYTO: "UPD_REPLYTO",
	  ADD_SUBJECT: "ADD_SUBJECT",
	  DEL_SUBJECT: "DEL_SUBJECT",
	  UPD_SUBJECT: "UPD_SUBJECT",
	  ADD_CONTENT: "ADD_CONTENT",
	  DEL_CONTENT: "DEL_CONTENT",
	  UPD_CONTENT: "UPD_CONTENT",
	  SEND_MAIL: "SEND_MAIL",
	  SEND_MAIL_SUCCESS: "SEND_MAIL_SUCCESS",
	  SEND_MAIL_FAIL: "SEND_MAIL_FAIL",
	  TOGGLE_SHOW_EVENT: "TOGGLE_SHOW_EVENT",
	  ADD_EVENTS: "ADD_EVENTS"
	};

	module.exports = constants;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(23);
	var DemoboxClient = __webpack_require__(25);

	var actions = {
	  addPersonalization: function () {
	    this.dispatch(constants.ADD_PERSONALIZATION, { to: [{ email: "", name: "" }] });
	  },
	  delPersonalization: function (index) {
	    this.dispatch(constants.DEL_PERSONALIZATION, index);
	  },

	  addToInpersonal: function (index) {
	    this.dispatch(constants.ADD_TO_INPERSONAL, index);
	  },
	  delToInpersonal: function (parentIndex, index) {
	    this.dispatch(constants.DEL_TO_INPERSONAL, { parentIndex: parentIndex, index: index });
	  },
	  updToInpersonal: function (parentIndex, index, key, value) {
	    this.dispatch(constants.UPD_TO_INPERSONAL, { parentIndex: parentIndex, index: index, key: key, value: value });
	  },

	  addCcInpersonal: function (index) {
	    this.dispatch(constants.ADD_CC_INPERSONAL, index);
	  },
	  delCcInpersonal: function (parentIndex, index) {
	    this.dispatch(constants.DEL_CC_INPERSONAL, { parentIndex: parentIndex, index: index });
	  },
	  updCcInpersonal: function (parentIndex, index, key, value) {
	    this.dispatch(constants.UPD_CC_INPERSONAL, { parentIndex: parentIndex, index: index, key: key, value: value });
	  },

	  addBccInpersonal: function (index) {
	    this.dispatch(constants.ADD_BCC_INPERSONAL, index);
	  },
	  delBccInpersonal: function (parentIndex, index) {
	    this.dispatch(constants.DEL_BCC_INPERSONAL, { parentIndex: parentIndex, index: index });
	  },
	  updBccInpersonal: function (parentIndex, index, key, value) {
	    this.dispatch(constants.UPD_BCC_INPERSONAL, { parentIndex: parentIndex, index: index, key: key, value: value });
	  },

	  addSubjectInpersonal: function (parentIndex) {
	    this.dispatch(constants.ADD_SUBJECT_INPERSONAL, { parentIndex: parentIndex });
	  },
	  delSubjectInpersonal: function (parentIndex) {
	    this.dispatch(constants.DEL_SUBJECT_INPERSONAL, { parentIndex: parentIndex });
	  },
	  updSubjectInpersonal: function (parentIndex, value) {
	    this.dispatch(constants.UPD_SUBJECT_INPERSONAL, { parentIndex: parentIndex, value: value });
	  },

	  addSubstitutionInpersonal: function (index) {
	    this.dispatch(constants.ADD_SUBSTITUTION_INPERSONAL, index);
	  },
	  delSubstitutionInpersonal: function (parentIndex, index) {
	    this.dispatch(constants.DEL_SUBSTITUTION_INPERSONAL, { parentIndex: parentIndex, index: index });
	  },
	  updSubstitutionInpersonal: function (parentIndex, index, key, value) {
	    this.dispatch(constants.UPD_SUBSTITUTION_INPERSONAL, { parentIndex: parentIndex, index: index, key: key, value: value });
	  },

	  addHeaderInpersonal: function (index) {
	    this.dispatch(constants.ADD_HEADER_INPERSONAL, index);
	  },
	  delHeaderInpersonal: function (parentIndex, index) {
	    this.dispatch(constants.DEL_HEADER_INPERSONAL, { parentIndex: parentIndex, index: index });
	  },
	  updHeaderInpersonal: function (parentIndex, index, key, value) {
	    this.dispatch(constants.UPD_HEADER_INPERSONAL, { parentIndex: parentIndex, index: index, key: key, value: value });
	  },

	  addCustomargInpersonal: function (index) {
	    this.dispatch(constants.ADD_CUSTOMARG_INPERSONAL, index);
	  },
	  delCustomargInpersonal: function (parentIndex, index) {
	    this.dispatch(constants.DEL_CUSTOMARG_INPERSONAL, { parentIndex: parentIndex, index: index });
	  },
	  updCustomargInpersonal: function (parentIndex, index, key, value) {
	    this.dispatch(constants.UPD_CUSTOMARG_INPERSONAL, { parentIndex: parentIndex, index: index, key: key, value: value });
	  },

	  addSendAtInpersonal: function (parentIndex) {
	    this.dispatch(constants.ADD_SEND_AT_INPERSONAL, { parentIndex: parentIndex });
	  },
	  delSendAtInpersonal: function (parentIndex) {
	    this.dispatch(constants.DEL_SEND_AT_INPERSONAL, { parentIndex: parentIndex });
	  },
	  updSendAtInpersonal: function (parentIndex, value) {
	    this.dispatch(constants.UPD_SEND_AT_INPERSONAL, { parentIndex: parentIndex, value: value });
	  },

	  updFrom: function (key, value) {
	    this.dispatch(constants.UPD_FROM, { key: key, value: value });
	  },

	  addReplyto: function () {
	    this.dispatch(constants.ADD_REPLYTO);
	  },
	  delReplyto: function () {
	    this.dispatch(constants.DEL_REPLYTO);
	  },
	  updReplyto: function (key, value) {
	    this.dispatch(constants.UPD_REPLYTO, { key: key, value: value });
	  },

	  addSubject: function () {
	    this.dispatch(constants.ADD_SUBJECT);
	  },
	  delSubject: function () {
	    this.dispatch(constants.DEL_SUBJECT);
	  },
	  updSubject: function (value) {
	    this.dispatch(constants.UPD_SUBJECT, { value: value });
	  },

	  addContent: function () {
	    this.dispatch(constants.ADD_CONTENT);
	  },
	  delContent: function (type) {
	    this.dispatch(constants.DEL_CONTENT, { type: type });
	  },
	  updContent: function (type, value) {
	    this.dispatch(constants.UPD_CONTENT, { type: type, value: value });
	  },

	  // sendMail: function(param) {
	  //   var requestParam = JSON.stringify(param);
	  //   this.dispatch(constants.SEND_MAIL);
	  //   DemoboxClient.sendMail(
	  //     requestParam,
	  //     function(result) {
	  //       this.dispatch(constants.SEND_MAIL_SUCCESS, {result: result});
	  //     }.bind(this),
	  //     function(xhr, status, err) {
	  //       this.dispatch(
	  //         constants.SEND_MAIL_FAIL,
	  //         {
	  //           responseCode: xhr.status,
	  //           responseBody: err.message
	  //         }
	  //       );
	  //     }.bind(this)
	  //   );
	  // },
	  sendMail: function (mailData) {
	    this.dispatch(constants.SEND_MAIL);
	    DemoboxClient.sendMail(mailData, function (result) {
	      this.dispatch(constants.SEND_MAIL_SUCCESS, { result: result });
	    }.bind(this), function (xhr, status, err) {
	      this.dispatch(constants.SEND_MAIL_FAIL, {
	        responseCode: xhr.status,
	        responseBody: err.message
	      });
	    }.bind(this));
	  },

	  toggleShowEvent: function (buttonId) {
	    this.dispatch(constants.TOGGLE_SHOW_EVENT, { buttonId: buttonId });
	  },

	  addEvents: function (events) {
	    this.dispatch(constants.ADD_EVENTS, { events: events });
	  }
	};

	module.exports = actions;

/***/ },
/* 25 */
/***/ function(module, exports) {

	var DemoboxClient = {
	  sendMail: function (mailData, success, failure) {
	    $.ajax({
	      url: '/send',
	      dataType: 'json',
	      type: 'POST',
	      data: this.makeParam(mailData),
	      success: success,
	      error: failure
	    });
	  },

	  makeParam: function (mailData) {
	    var mailData2 = $.extend(true, {}, mailData);
	    for (var i = 0; i < mailData.personalizations.length; i++) {
	      mailData2.personalizations[i].headers = this.array2hash(mailData.personalizations[i].headers);
	      mailData2.personalizations[i].substitutions = this.array2hash(mailData.personalizations[i].substitutions);
	      mailData2.personalizations[i].custom_args = this.array2hash(mailData.personalizations[i].custom_args);
	      if (mailData2.personalizations[i].cc.length === 0) {
	        delete mailData2.personalizations[i].cc;
	      }
	      if (mailData2.personalizations[i].bcc.length === 0) {
	        delete mailData2.personalizations[i].bcc;
	      }
	      if (mailData2.personalizations[i].subject === null) {
	        delete mailData2.personalizations[i].subject;
	      }
	      if (mailData2.personalizations[i].headers === null) {
	        delete mailData2.personalizations[i].headers;
	      }
	      if (mailData2.personalizations[i].substitutions === null) {
	        delete mailData2.personalizations[i].substitutions;
	      }
	      if (mailData2.personalizations[i].custom_args === null) {
	        delete mailData2.personalizations[i].custom_args;
	      }
	      if (mailData2.personalizations[i].send_at === null) {
	        delete mailData2.personalizations[i].send_at;
	      }
	    }
	    if (mailData2.subject === null) {
	      delete mailData2.subject;
	    }
	    if (mailData2["reply-to"] === null) {
	      delete mailData2["reply-to"];
	    }

	    var requestParam = JSON.stringify(mailData2);
	    console.log(requestParam);
	    return requestParam;
	  },

	  array2hash: function (array) {
	    var hash = null;
	    for (var j = 0; j < array.length; j++) {
	      hash[array[j].key] = array[j].value;
	    }
	    return hash;
	  }
	};

	module.exports = DemoboxClient;

/***/ }
/******/ ]);