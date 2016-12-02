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
	var flux = __webpack_require__(29);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var Root = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      sending: store.sending,
	      error: store.error,
	      result: store.result
	    };
	  },

	  componentDidMount: function () {
	    this.handleRouting(window.location.href);
	  },

	  handleRouting: function (href) {
	    var uri = new URI(href);
	    var activePage = "send";
	    var p = uri.search(true).p;
	    if (p != null) {
	      activePage = p;
	    }
	    this.getFlux().actions.updActivePage(activePage);
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      { className: 'Root' },
	      React.createElement(Header, null),
	      React.createElement(Article, null)
	    );
	  }
	});

	ReactDOM.render(React.createElement(Root, { flux: flux }), document.getElementById('root'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var LeftMenu = __webpack_require__(2);

	var Header = React.createClass({
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
	        React.createElement(LeftMenu, null),
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
	  render: function () {
	    return React.createElement(
	      "ul",
	      { className: "nav navbar-nav" },
	      React.createElement(LeftMenuItem, {
	        pageId: "send",
	        href: "/index.html?p=send",
	        text: "\u30E1\u30FC\u30EB\u3092\u9001\u308B" }),
	      React.createElement(LeftMenuItem, {
	        pageId: "receive",
	        href: "/index.html?p=receive",
	        text: "\u30E1\u30FC\u30EB\u3092\u53D7\u3051\u308B" })
	    );
	  }
	});
	module.exports = LeftMenu;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var LeftMenuItem = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      activePage: store.activePage
	    };
	  },

	  propTypes: {
	    pageId: React.PropTypes.string.isRequired,
	    href: React.PropTypes.string.isRequired,
	    text: React.PropTypes.string.isRequired
	  },

	  getActive: function (pageId, activePage) {
	    if (pageId === activePage) return 'active';else return '';
	  },

	  render: function () {
	    return React.createElement(
	      "li",
	      {
	        id: this.props.pageId,
	        className: this.getActive(this.props.pageId, this.state.activePage) },
	      React.createElement(
	        "a",
	        {
	          className: "subtree-name",
	          href: this.props.href },
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
	var ReceivePage = __webpack_require__(27);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var Article = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      activePage: store.activePage
	    };
	  },

	  propTypes: {},

	  render: function () {
	    var page = "";
	    if (this.state.activePage === 'send') {
	      page = React.createElement(SendPage, null);
	    } else if (this.state.activePage === 'receive') {
	      page = React.createElement(ReceivePage, null);
	    }
	    return page;
	  }
	});
	module.exports = Article;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var SendForm = __webpack_require__(6);
	var EventsPain = __webpack_require__(23);

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

	var PersonalizationForm = __webpack_require__(7);
	var EmailForm = __webpack_require__(9);
	var SimpleTextForm = __webpack_require__(11);
	var ContentForm = __webpack_require__(14);
	var AttachmentForm = __webpack_require__(16);
	var KeyValueForm = __webpack_require__(13);
	var AsmForm = __webpack_require__(18);
	var MailSettingsForm = __webpack_require__(19);
	var TrackingSettingsForm = __webpack_require__(21);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var SendForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  componentDidMount: function () {
	    this.getFlux().actions.getSendInit();
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

	  handleAddAttachment: function () {
	    this.getFlux().actions.addAttachment();
	  },
	  handleDelAttachment: function (index) {
	    this.getFlux().actions.delAttachment(index);
	  },
	  handleUpdAttachment: function (index, key, value) {
	    this.getFlux().actions.updAttachment(index, key, value);
	  },

	  handleAddTemplateId: function () {
	    this.getFlux().actions.addTemplateId();
	  },
	  handleDelTemplateId: function () {
	    this.getFlux().actions.delTemplateId();
	  },
	  handleUpdTemplateId: function (parentIndex, value) {
	    this.getFlux().actions.updTemplateId(value);
	  },

	  handleAddSections: function () {
	    this.getFlux().actions.addSections();
	  },
	  handleDelSections: function (index) {
	    this.getFlux().actions.delSections(index);
	  },
	  handleUpdSections: function (index, key, value) {
	    this.getFlux().actions.updSections(index, key, value);
	  },

	  handleAddHeaders: function () {
	    this.getFlux().actions.addHeaders();
	  },
	  handleDelHeaders: function (index) {
	    this.getFlux().actions.delHeaders(index);
	  },
	  handleUpdHeaders: function (index, key, value) {
	    this.getFlux().actions.updHeaders(index, key, value);
	  },

	  handleAddCategories: function () {
	    this.getFlux().actions.addCategories();
	  },
	  handleDelCategories: function (index) {
	    this.getFlux().actions.delCategories(index);
	  },
	  handleUpdCategories: function (index, value) {
	    this.getFlux().actions.updCategories(index, value);
	  },

	  handleAddCustomArgs: function () {
	    this.getFlux().actions.addCustomArgs();
	  },
	  handleDelCustomArgs: function (index) {
	    this.getFlux().actions.delCustomArgs(index);
	  },
	  handleUpdCustomArgs: function (index, key, value) {
	    this.getFlux().actions.updCustomArgs(index, key, value);
	  },

	  handleAddSendAt: function () {
	    this.getFlux().actions.addSendAt();
	  },
	  handleDelSendAt: function () {
	    this.getFlux().actions.delSendAt();
	  },
	  handleUpdSendAt: function (parentIndex, value) {
	    this.getFlux().actions.updSendAt(value);
	  },

	  handleAddBatchId: function () {
	    this.getFlux().actions.addBatchId();
	  },
	  handleDelBatchId: function () {
	    this.getFlux().actions.delBatchId();
	  },
	  handleUpdBatchId: function (parentIndex, value) {
	    this.getFlux().actions.updBatchId(value);
	  },

	  handleAddAsm: function () {
	    this.getFlux().actions.addAsm();
	  },
	  handleDelAsm: function () {
	    this.getFlux().actions.delAsm();
	  },

	  handleAddIpPoolName: function () {
	    this.getFlux().actions.addIpPoolName();
	  },
	  handleDelIpPoolName: function () {
	    this.getFlux().actions.delIpPoolName();
	  },
	  handleUpdIpPoolName: function (parentIndex, value) {
	    this.getFlux().actions.updIpPoolName(value);
	  },

	  handleSendMail: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.sendMail(this.state.mailData);
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'form',
	        { id: 'param', className: 'form-horizontal' },
	        React.createElement(PersonalizationForm, null),
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
	          handleDel: this.handleDelSubject,
	          handleUpd: this.handleUpdSubject,
	          max: 1 }),
	        React.createElement(ContentForm, {
	          data: this.state.mailData.content,
	          handleAdd: this.handleAddContent,
	          handleDel: this.handleDelContent,
	          handleUpd: this.handleUpdContent }),
	        React.createElement(AttachmentForm, {
	          data: this.state.mailData.attachments,
	          handleAdd: this.handleAddAttachment,
	          handleDel: this.handleDelAttachment,
	          handleUpd: this.handleUpdAttachment
	        }),
	        React.createElement(SimpleTextForm, {
	          title: 'template_id',
	          required: false,
	          placeholder: 'Template ID',
	          value: this.state.mailData.template_id,
	          handleAdd: this.handleAddTemplateId,
	          handleDel: this.handleDelTemplateId,
	          handleUpd: this.handleUpdTemplateId,
	          max: 1 }),
	        React.createElement(KeyValueForm, {
	          title: 'sections',
	          required: false,
	          data: this.state.mailData.sections,
	          handleAdd: this.handleAddSections,
	          handleDel: this.handleDelSections,
	          handleUpd: this.handleUpdSections }),
	        React.createElement(KeyValueForm, {
	          title: 'headers',
	          required: false,
	          data: this.state.mailData.headers,
	          handleAdd: this.handleAddHeaders,
	          handleDel: this.handleDelHeaders,
	          handleUpd: this.handleUpdHeaders }),
	        React.createElement(SimpleTextForm, {
	          title: 'categories',
	          required: false,
	          placeholder: 'categories',
	          value: this.state.mailData.categories,
	          handleAdd: this.handleAddCategories,
	          handleDel: this.handleDelCategories,
	          handleUpd: this.handleUpdCategories,
	          max: 255 }),
	        React.createElement(KeyValueForm, {
	          title: 'custom_args',
	          required: false,
	          data: this.state.mailData.custom_args,
	          handleAdd: this.handleAddCustomArgs,
	          handleDel: this.handleDelCustomArgs,
	          handleUpd: this.handleUpdCustomArgs }),
	        React.createElement(SimpleTextForm, {
	          title: 'send_at',
	          required: false,
	          placeholder: 'UNIXTIME',
	          value: this.state.mailData.send_at,
	          handleAdd: this.handleAddSendAt,
	          handleDel: this.handleDelSendAt,
	          handleUpd: this.handleUpdSendAt,
	          max: 1 }),
	        React.createElement(SimpleTextForm, {
	          title: 'batch_id',
	          required: false,
	          placeholder: 'Batch ID',
	          value: this.state.mailData.batch_id,
	          handleAdd: this.handleAddBatchId,
	          handleDel: this.handleDelBatchId,
	          handleUpd: this.handleUpdBatchId,
	          max: 1 }),
	        React.createElement(AsmForm, {
	          data: this.state.mailData.asm,
	          handleAdd: this.handleAddAsm,
	          handleDel: this.handleDelAsm }),
	        React.createElement(SimpleTextForm, {
	          title: 'ip_pool_name',
	          required: false,
	          placeholder: 'IP pool name',
	          value: this.state.mailData.ip_pool_name,
	          handleAdd: this.handleAddIpPoolName,
	          handleDel: this.handleDelIpPoolName,
	          handleUpd: this.handleUpdIpPoolName,
	          max: 1 }),
	        React.createElement(MailSettingsForm, null),
	        React.createElement(TrackingSettingsForm, null)
	      ),
	      React.createElement(
	        'button',
	        {
	          id: 'send',
	          className: 'btn btn-primary center-block',
	          onClick: this.handleSendMail },
	        '\u9001\u4FE1'
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

	var PersonalizationForm = React.createClass({
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
	        "personalizations"
	      ),
	      React.createElement(
	        FlipMove,
	        { enterAnimation: "accordianVertical", leaveAnimation: "accordianVertical" },
	        this.state.personalizations.map(function (personalization, index) {
	          return React.createElement(PersonalizationItem, { index: index });
	        })
	      ),
	      React.createElement(
	        "div",
	        null,
	        React.createElement(
	          "a",
	          { href: "javascript:void(0)", onClick: this.handleAddPersonalization },
	          React.createElement("span", { className: "glyphicon glyphicon-plus" })
	        )
	      )
	    );
	  }
	});
	module.exports = PersonalizationForm;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var EmailForm = __webpack_require__(9);
	var SimpleTextForm = __webpack_require__(11);
	var KeyValueForm = __webpack_require__(13);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var PersonalizationItem = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    index: React.PropTypes.number.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      key: _.uniqueId('personalization_item')
	    };
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
	    var className = "wrapper " + (this.props.index % 2 == 0 ? "even" : "odd");
	    return React.createElement(
	      'div',
	      { className: className, key: this.props.key },
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
	          handleUpd: this.handleUpdHeaderInpersonal }),
	        React.createElement(KeyValueForm, {
	          title: 'substitutions',
	          required: false,
	          data: this.state.personalization.substitutions,
	          handleAdd: this.handleAddSubstitutionInpersonal,
	          handleDel: this.handleDelSubstitutionInpersonal,
	          handleUpd: this.handleUpdSubstitutionInpersonal }),
	        React.createElement(KeyValueForm, {
	          title: 'custom_args',
	          required: false,
	          data: this.state.personalization.custom_args,
	          handleAdd: this.handleAddCustomargInpersonal,
	          handleDel: this.handleDelCustomargInpersonal,
	          handleUpd: this.handleUpdCustomargInpersonal }),
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

	var KeyValueItem = __webpack_require__(10);

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
	        return React.createElement(KeyValueItem, {
	          index: index,
	          valueKey: data.email,
	          valueValue: data.name,
	          nameKey: 'email',
	          nameValue: 'name',
	          placeholderKey: 'Email',
	          placeholderValue: 'Name',
	          handleDel: this.props.handleDel,
	          handleUpd: this.props.handleUpd });
	      }.bind(this));
	      add = React.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.props.handleAdd },
	        React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	      );
	    } else {
	      if (this.props.data != null) {
	        items = React.createElement(KeyValueItem, {
	          valueKey: this.props.data.email,
	          valueValue: this.props.data.name,
	          nameKey: 'email',
	          nameValue: 'name',
	          placeholderKey: 'Email',
	          placeholderValue: 'Name',
	          handleDel: this.props.handleDel,
	          handleUpd: this.props.handleUpd });
	      }
	      if (this.props.data == null && this.props.max == 1) {
	        add = React.createElement(
	          'a',
	          { href: 'javascript:void(0)', onClick: this.props.handleAdd },
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
	        FlipMove,
	        { enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical' },
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

	var KeyValueItem = React.createClass({
	  propTypes: {
	    index: React.PropTypes.number.isRequired,
	    valueKey: React.PropTypes.string.isRequired,
	    valueValue: React.PropTypes.string.isRequired,
	    nameKey: React.PropTypes.string,
	    nameValue: React.PropTypes.string,
	    placeholderKey: React.PropTypes.string,
	    placeholderValue: React.PropTypes.string,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      key: _.uniqueId('key_value_item')
	    };
	  },

	  getDefaultProps: function () {
	    return {
	      nameKey: "key",
	      nameValue: "value",
	      placeholderKey: "Key",
	      placeholderValue: "Value"
	    };
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
	    var className = "wrapper " + (this.props.index % 2 == 0 ? "even" : "odd");
	    return React.createElement(
	      "div",
	      { className: className, key: this.props.key },
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
	          name: this.props.nameKey,
	          className: "form-control",
	          placeholder: this.props.placeholderKey,
	          defaultValue: this.props.valueKey,
	          onChange: this.handleUpd }),
	        React.createElement("input", {
	          type: "text",
	          name: this.props.nameValue,
	          className: "form-control",
	          placeholder: this.props.placeholderValue,
	          defaultValue: this.props.valueValue,
	          onChange: this.handleUpd })
	      )
	    );
	  }
	});
	module.exports = KeyValueItem;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var SimpleTextItem = __webpack_require__(12);

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

	  handleDel: function (e) {
	    e.preventDefault();
	    this.props.handleDel();
	  },

	  handleUpd: function (e) {
	    e.preventDefault();
	    this.props.handleUpd(this.props.index, e.target.value);
	  },

	  getRq: function () {
	    var rq = '';
	    if (this.props.required) {
	      rq = React.createElement(
	        'span',
	        { className: 'text-danger' },
	        '*'
	      );
	    }
	    return rq;
	  },

	  getAdd: function () {
	    return React.createElement(
	      'a',
	      { href: 'javascript:void(0)', onClick: this.props.handleAdd },
	      React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	    );
	  },

	  render: function () {
	    var add;
	    var items;
	    if (Array.isArray(this.props.value)) {
	      items = this.props.value.map(function (data, index) {
	        return React.createElement(SimpleTextItem, {
	          index: index,
	          value: data,
	          placeholder: this.props.placeholder,
	          handleDel: this.props.handleDel,
	          handleUpd: this.props.handleUpd });
	      }.bind(this));
	      add = this.getAdd();
	    } else {
	      if (this.props.value != null) {
	        items = React.createElement(SimpleTextItem, {
	          index: 0,
	          value: this.props.value,
	          placeholder: 'Value',
	          handleDel: this.props.handleDel,
	          handleUpd: this.props.handleUpd });
	      }
	      if (this.props.value == null && this.props.max == 1) {
	        add = this.getAdd();
	      }
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        { className: 'control-label' },
	        this.getRq,
	        this.props.title
	      ),
	      React.createElement(
	        FlipMove,
	        { enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical' },
	        items
	      ),
	      add
	    );
	  }
	});
	module.exports = SimpleTextForm;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var SimpleTextItem = React.createClass({
	  propTypes: {
	    index: React.PropTypes.number.isRequired,
	    value: React.PropTypes.string.isRequired,
	    placeholder: React.PropTypes.string,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      name: "value",
	      placeholder: "Value",
	      key: _.uniqueId('simple_text_item')
	    };
	  },

	  handleDel: function (e) {
	    e.preventDefault();
	    this.props.handleDel(this.props.index);
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
	    var className = "wrapper " + (this.props.index % 2 == 0 ? "even" : "odd");
	    return React.createElement(
	      "div",
	      { className: className, key: this.props.key },
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
	          name: this.props.name,
	          className: "form-control",
	          placeholder: this.props.placeholder,
	          defaultValue: this.props.value,
	          onChange: this.handleUpd })
	      )
	    );
	  }
	});
	module.exports = SimpleTextItem;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var KeyValueItem = __webpack_require__(10);

	var KeyValueForm = React.createClass({
	  propTypes: {
	    title: React.PropTypes.string.isRequired,
	    required: React.PropTypes.bool.isRequired,
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
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
	        FlipMove,
	        { enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical' },
	        this.props.data.map(function (data, index) {
	          return React.createElement(KeyValueItem, {
	            index: index,
	            valueKey: data.key,
	            valueValue: data.value,
	            nameKey: 'key',
	            nameValue: 'value',
	            handleDel: this.props.handleDel,
	            handleUpd: this.props.handleUpd });
	        }.bind(this))
	      ),
	      React.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.props.handleAdd },
	        React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	      )
	    );
	  }
	});
	module.exports = KeyValueForm;

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

	  render: function () {
	    var add;
	    if (_.compact(this.props.data).length < 2) {
	      add = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd },
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
	        FlipMove,
	        { enterAnimation: "accordianVertical", leaveAnimation: "accordianVertical" },
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

	  getDefaultProps: function () {
	    return {
	      key: _.uniqueId('content_item')
	    };
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

	var AttachmentItem = __webpack_require__(17);

	var AttachmentForm = React.createClass({
	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
	  },

	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        "attachments"
	      ),
	      React.createElement(
	        FlipMove,
	        { enterAnimation: "accordianVertical", leaveAnimation: "accordianVertical" },
	        this.props.data.map(function (data, index) {
	          return React.createElement(AttachmentItem, {
	            index: index,
	            data: data,
	            handleDel: this.props.handleDel,
	            handleUpd: this.props.handleUpd });
	        }.bind(this))
	      ),
	      React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd },
	        React.createElement("span", { className: "glyphicon glyphicon-plus" })
	      )
	    );
	  }
	});
	module.exports = AttachmentForm;

/***/ },
/* 17 */
/***/ function(module, exports) {

	var AttachmentItem = React.createClass({
	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    index: React.PropTypes.number.isRequired,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      key: _.uniqueId('attachment_item')
	    };
	  },

	  handleDel: function () {
	    this.props.handleDel(this.props.index);
	  },

	  handleUpd: function (e) {
	    e.preventDefault();
	    this.props.handleUpd(this.props.index, e.target.name, e.target.value);
	  },

	  render: function () {
	    var className = "wrapper " + (this.props.index % 2 == 0 ? "even" : "odd");
	    return React.createElement(
	      "div",
	      { className: className, key: this.props.key },
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
	          name: "content",
	          className: "form-control",
	          placeholder: "Base64 encoded content",
	          defaultValue: this.props.data.content,
	          onChange: this.handleUpd }),
	        React.createElement("input", {
	          type: "text",
	          name: "type",
	          className: "form-control",
	          placeholder: "The mime type",
	          defaultValue: this.props.data.type,
	          onChange: this.handleUpd }),
	        React.createElement("input", {
	          type: "text",
	          name: "filename",
	          className: "form-control",
	          placeholder: "Filename",
	          defaultValue: this.props.data.filename,
	          onChange: this.handleUpd }),
	        React.createElement("input", {
	          type: "text",
	          name: "disposition",
	          className: "form-control",
	          placeholder: "Disposition",
	          defaultValue: this.props.data.disposition,
	          onChange: this.handleUpd }),
	        React.createElement("input", {
	          type: "text",
	          name: "content_id",
	          className: "form-control",
	          placeholder: "Content ID",
	          defaultValue: this.props.data['content_id'],
	          onChange: this.handleUpd })
	      )
	    );
	  }
	});
	module.exports = AttachmentItem;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var SimpleTextItem = __webpack_require__(12);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var AsmForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      key: _.uniqueId('asm')
	    };
	  },

	  getStateFromFlux: function () {
	    return {};
	  },

	  handleUpdGroupId: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updGroupId(e.target.value);
	  },

	  handleAddGroupsToDisplay: function () {
	    this.getFlux().actions.addGroupsToDisplay();
	  },
	  handleDelGroupsToDisplay: function (index) {
	    this.getFlux().actions.delGroupsToDisplay(index);
	  },
	  handleUpdGroupsToDisplay: function (index, value) {
	    this.getFlux().actions.updGroupsToDisplay(index, value);
	  },

	  render: function () {
	    var add;
	    var form;
	    var items;
	    if (this.props.data === null) {
	      add = React.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.props.handleAdd },
	        React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	      );
	    } else {
	      items = this.props.data.groups_to_display.map(function (data, index) {
	        return React.createElement(SimpleTextItem, {
	          index: index,
	          value: data,
	          placeholder: 'groups_to_display',
	          handleDel: this.handleDelGroupsToDisplay,
	          handleUpd: this.handleUpdGroupsToDisplay });
	      }.bind(this));
	      form = React.createElement(
	        'div',
	        { className: 'wrapper' },
	        React.createElement(
	          'div',
	          { className: 'fixed' },
	          React.createElement(
	            'a',
	            { href: 'javascript:void(0)', onClick: this.props.handleDel,
	              className: 'removeIcon' },
	            React.createElement('span', { className: 'glyphicon glyphicon-remove' })
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'flex' },
	          React.createElement(
	            'div',
	            { className: 'wrapper' },
	            React.createElement('input', { type: 'text',
	              name: 'group_id',
	              className: 'form-control',
	              placeholder: 'group_id',
	              defaultValue: this.props.data.group_id,
	              onChange: this.handleUpdGroupId })
	          ),
	          React.createElement(
	            FlipMove,
	            { enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical' },
	            items
	          ),
	          React.createElement(
	            'a',
	            { href: 'javascript:void(0)', onClick: this.handleAddGroupsToDisplay },
	            React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	          )
	        )
	      );
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        { className: 'control-label' },
	        'asm'
	      ),
	      React.createElement(
	        FlipMove,
	        { enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical' },
	        form
	      ),
	      add
	    );
	  }
	});
	module.exports = AsmForm;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var MailSettingsItem = __webpack_require__(20);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var MailSettingsForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      mail_settings: store.mailData.mail_settings
	    };
	  },

	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        "mail_settings"
	      ),
	      React.createElement(
	        "div",
	        { className: "wrapper" },
	        React.createElement("div", { className: "fixed" }),
	        React.createElement(
	          "div",
	          { className: "flex" },
	          React.createElement(MailSettingsItem, {
	            data: this.state.mail_settings,
	            parent: "bcc" }),
	          React.createElement(MailSettingsItem, {
	            data: this.state.mail_settings,
	            parent: "bypass_list_management" }),
	          React.createElement(MailSettingsItem, {
	            data: this.state.mail_settings,
	            parent: "footer" }),
	          React.createElement(MailSettingsItem, {
	            data: this.state.mail_settings,
	            parent: "sandbox_mode" }),
	          React.createElement(MailSettingsItem, {
	            data: this.state.mail_settings,
	            parent: "spam_check" })
	        )
	      )
	    );
	  }
	});
	module.exports = MailSettingsForm;

/***/ },
/* 20 */
/***/ function(module, exports) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var MailSettingsItem = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    parent: React.PropTypes.string.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      key: _.uniqueId('mail_settings_item')
	    };
	  },

	  getStateFromFlux: function () {
	    return {};
	  },

	  handleAdd: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.addMailSettingsItem(this.props.parent);
	  },

	  handleDel: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.delMailSettingsItem(this.props.parent);
	  },

	  handleUpdEnable: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updMailSettings(this.props.parent, e.target.name, e.target.value == 'true');
	  },

	  handleUpdMailSettings: function (e) {
	    e.preventDefault();
	    var value = e.target.value;
	    if (this.props.name === "enable") {
	      value = e.target.value == "true";
	    }
	    if (this.props.parent === "spam_check" && e.target.name === "threshold") {
	      value = Number(e.target.value);
	    }
	    this.getFlux().actions.updMailSettings(this.props.parent, e.target.name, value);
	  },

	  render: function () {
	    var add;
	    var form;
	    if (this.props.data[this.props.parent] === null) {
	      add = React.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.handleAdd },
	        React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	      );
	    } else {
	      var items;
	      switch (this.props.parent) {
	        case "bcc":
	          items = React.createElement('input', { type: 'text',
	            name: 'email',
	            className: 'form-control',
	            placeholder: 'email',
	            defaultValue: this.props.data[this.props.parent].email,
	            onChange: this.handleUpdMailSettings });
	          break;
	        case "footer":
	          items = React.createElement(
	            'div',
	            null,
	            React.createElement('input', { type: 'text',
	              name: 'text',
	              className: 'form-control',
	              placeholder: 'text',
	              defaultValue: this.props.data[this.props.parent].text,
	              onChange: this.handleUpdMailSettings }),
	            React.createElement('input', { type: 'text',
	              name: 'html',
	              className: 'form-control',
	              placeholder: 'html',
	              defaultValue: this.props.data[this.props.parent].html,
	              onChange: this.handleUpdMailSettings })
	          );
	          break;
	        case "spam_check":
	          items = React.createElement(
	            'div',
	            null,
	            React.createElement('input', { type: 'text',
	              name: 'threshold',
	              className: 'form-control',
	              placeholder: 'threshold',
	              defaultValue: this.props.data[this.props.parent].threshold,
	              onChange: this.handleUpdMailSettings }),
	            React.createElement('input', { type: 'text',
	              name: 'post_to_url',
	              className: 'form-control',
	              placeholder: 'post_to_url',
	              defaultValue: this.props.data[this.props.parent].post_to_url,
	              onChange: this.handleUpdMailSettings })
	          );
	          break;
	      }
	      form = React.createElement(
	        'div',
	        { className: 'wrapper' },
	        React.createElement(
	          'div',
	          { className: 'fixed' },
	          React.createElement(
	            'a',
	            { href: 'javascript:void(0)', onClick: this.handleDel,
	              className: 'removeIcon' },
	            React.createElement('span', { className: 'glyphicon glyphicon-remove' })
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'flex' },
	          React.createElement(
	            'select',
	            { className: 'form-control', name: 'enable',
	              value: this.props.data[this.props.parent].enable,
	              onChange: this.handleUpdEnable },
	            React.createElement(
	              'option',
	              { value: 'false' },
	              'false'
	            ),
	            React.createElement(
	              'option',
	              { value: 'true' },
	              'true'
	            )
	          ),
	          items
	        )
	      );
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        { className: 'control-label' },
	        this.props.parent
	      ),
	      React.createElement(
	        FlipMove,
	        { enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical' },
	        form
	      ),
	      add
	    );
	  }
	});
	module.exports = MailSettingsItem;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var TrackingSettingsItem = __webpack_require__(22);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var TrackingSettingsForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      tracking_settings: store.mailData.tracking_settings
	    };
	  },

	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        "tracking_settings"
	      ),
	      React.createElement(
	        "div",
	        { className: "wrapper" },
	        React.createElement("div", { className: "fixed" }),
	        React.createElement(
	          "div",
	          { className: "flex" },
	          React.createElement(TrackingSettingsItem, {
	            data: this.state.tracking_settings,
	            parent: "click_tracking" }),
	          React.createElement(TrackingSettingsItem, {
	            data: this.state.tracking_settings,
	            parent: "open_tracking" }),
	          React.createElement(TrackingSettingsItem, {
	            data: this.state.tracking_settings,
	            parent: "subscription_tracking" }),
	          React.createElement(TrackingSettingsItem, {
	            data: this.state.tracking_settings,
	            parent: "ganalytics" })
	        )
	      )
	    );
	  }
	});
	module.exports = TrackingSettingsForm;

/***/ },
/* 22 */
/***/ function(module, exports) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var TrackingSettingsItem = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    parent: React.PropTypes.string.isRequired
	  },

	  getDefaultProps: function () {
	    return {
	      key: _.uniqueId('tracking_settings_item')
	    };
	  },

	  getStateFromFlux: function () {
	    return {};
	  },

	  handleAdd: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.addTrackingSettingsItem(this.props.parent);
	  },

	  handleDel: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.delTrackingSettingsItem(this.props.parent);
	  },

	  handleUpdEnable: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updTrackingSettings(this.props.parent, e.target.name, e.target.value == 'true');
	  },

	  handleUpdTrackingSettings: function (e) {
	    e.preventDefault();
	    var value = e.target.value;
	    if (this.props.name === "enable") {
	      value = e.target.value == "true";
	    }
	    this.getFlux().actions.updTrackingSettings(this.props.parent, e.target.name, value);
	  },

	  render: function () {
	    var add;
	    var form;
	    if (this.props.data[this.props.parent] === null) {
	      add = React.createElement(
	        'a',
	        { href: 'javascript:void(0)', onClick: this.handleAdd },
	        React.createElement('span', { className: 'glyphicon glyphicon-plus' })
	      );
	    } else {
	      var items;
	      switch (this.props.parent) {
	        case "click_tracking":
	          items = React.createElement(
	            'select',
	            { className: 'form-control', name: 'enable_text',
	              value: this.props.data[this.props.parent].enable_text,
	              onChange: this.handleUpdTrackingSettings },
	            React.createElement(
	              'option',
	              { value: 'false' },
	              'false'
	            ),
	            React.createElement(
	              'option',
	              { value: 'true' },
	              'true'
	            )
	          );
	          break;
	        case "open_tracking":
	          items = React.createElement(
	            'div',
	            null,
	            React.createElement('input', { type: 'text',
	              name: 'substitution_tag',
	              className: 'form-control',
	              placeholder: 'substitution_tag',
	              defaultValue: this.props.data[this.props.parent].substitution_tag,
	              onChange: this.handleUpdTrackingSettings })
	          );
	          break;
	        case "subscription_tracking":
	          items = React.createElement(
	            'div',
	            null,
	            React.createElement('input', { type: 'text',
	              name: 'text',
	              className: 'form-control',
	              placeholder: 'text',
	              defaultValue: this.props.data[this.props.parent].text,
	              onChange: this.handleUpdTrackingSettings }),
	            React.createElement('input', { type: 'text',
	              name: 'html',
	              className: 'form-control',
	              placeholder: 'html',
	              defaultValue: this.props.data[this.props.parent].html,
	              onChange: this.handleUpdTrackingSettings }),
	            React.createElement('input', { type: 'text',
	              name: 'substitution_tag',
	              className: 'form-control',
	              placeholder: 'substitution_tag',
	              defaultValue: this.props.data[this.props.parent].substitution_tag,
	              onChange: this.handleUpdTrackingSettings })
	          );
	          break;
	        case "ganalytics":
	          items = React.createElement(
	            'div',
	            null,
	            React.createElement('input', { type: 'text',
	              name: 'utm_source',
	              className: 'form-control',
	              placeholder: 'utm_source',
	              defaultValue: this.props.data[this.props.parent].utm_source,
	              onChange: this.handleUpdTrackingSettings }),
	            React.createElement('input', { type: 'text',
	              name: 'utm_medium',
	              className: 'form-control',
	              placeholder: 'utm_medium',
	              defaultValue: this.props.data[this.props.parent].utm_medium,
	              onChange: this.handleUpdTrackingSettings }),
	            React.createElement('input', { type: 'text',
	              name: 'utm_term',
	              className: 'form-control',
	              placeholder: 'utm_term',
	              defaultValue: this.props.data[this.props.parent].utm_term,
	              onChange: this.handleUpdTrackingSettings }),
	            React.createElement('input', { type: 'text',
	              name: 'utm_content',
	              className: 'form-control',
	              placeholder: 'utm_content',
	              defaultValue: this.props.data[this.props.parent].utm_content,
	              onChange: this.handleUpdTrackingSettings }),
	            React.createElement('input', { type: 'text',
	              name: 'utm_campaign',
	              className: 'form-control',
	              placeholder: 'utm_campaign',
	              defaultValue: this.props.data[this.props.parent].utm_campaign,
	              onChange: this.handleUpdTrackingSettings })
	          );
	      }
	      form = React.createElement(
	        'div',
	        { className: 'wrapper', key: this.props.key },
	        React.createElement(
	          'div',
	          { className: 'fixed' },
	          React.createElement(
	            'a',
	            { href: 'javascript:void(0)', onClick: this.handleDel,
	              className: 'removeIcon' },
	            React.createElement('span', { className: 'glyphicon glyphicon-remove' })
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'flex' },
	          React.createElement(
	            'div',
	            null,
	            React.createElement(
	              'select',
	              { className: 'form-control', name: 'enable',
	                value: this.props.data[this.props.parent].enable,
	                onChange: this.handleUpdEnable },
	              React.createElement(
	                'option',
	                { value: 'false' },
	                'false'
	              ),
	              React.createElement(
	                'option',
	                { value: 'true' },
	                'true'
	              )
	            ),
	            items
	          )
	        )
	      );
	    }
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        { className: 'control-label' },
	        this.props.parent
	      ),
	      React.createElement(
	        FlipMove,
	        { enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical' },
	        form
	      ),
	      add
	    );
	  }
	});
	module.exports = TrackingSettingsItem;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var ShowButton = __webpack_require__(24);
	var EventItemTable = __webpack_require__(25);
	var EventItemJson = __webpack_require__(26);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var EventsPain = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      showEvent: store.showEvent,
	      events: store.events
	    };
	  },

	  getTable: function (showEvent, events) {
	    var table = '';
	    if (showEvent == "table") {
	      table = React.createElement(
	        'table',
	        { className: 'table table-striped table-bordered table-condensed' },
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
	          FlipMove,
	          {
	            enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical',
	            typeName: 'tbody' },
	          events.map(function (event) {
	            var key = event["sg_event_id"];
	            return React.createElement(EventItemTable, { key: key, event: event });
	          }, this)
	        )
	      );
	    }
	    if (showEvent == "json") {
	      table = React.createElement(
	        'table',
	        { className: 'table table-striped table-bordered table-condensed' },
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
	          FlipMove,
	          {
	            enterAnimation: 'accordianVertical', leaveAnimation: 'accordianVertical',
	            typeName: 'tbody' },
	          events.map(function (event, index) {
	            var key = event["sg_event_id"];
	            return React.createElement(EventItemJson, { key: key, event: event });
	          }, this)
	        )
	      );
	    }
	    return table;
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
	          React.createElement(ShowButton, { buttonId: 'table', text: 'Table' }),
	          React.createElement(ShowButton, { buttonId: 'json', text: 'JSON' })
	        )
	      ),
	      this.getTable(this.state.showEvent, this.state.events)
	    );
	  }
	});

	module.exports = EventsPain;

/***/ },
/* 24 */
/***/ function(module, exports) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var ShowButton = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      showEvent: store.showEvent
	    };
	  },

	  propTypes: {
	    buttonId: React.PropTypes.string.isRequired,
	    text: React.PropTypes.string.isRequired
	  },

	  handleClick: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.toggleShowEvent(this.props.buttonId);
	  },

	  getActive: function (buttonId, active) {
	    if (buttonId === active) return 'btn btn-default active';else return 'btn btn-default';
	  },

	  render: function () {
	    return React.createElement(
	      "button",
	      {
	        className: this.getActive(this.props.buttonId, this.state.showEvent),
	        id: this.props.buttonId,
	        onClick: this.handleClick },
	      this.props.text
	    );
	  }
	});
	module.exports = ShowButton;

/***/ },
/* 25 */
/***/ function(module, exports) {

	var EventItemTable = React.createClass({
	  propTypes: {
	    event: React.PropTypes.object.isRequired
	  },

	  render: function () {
	    var key = this.props.event.event + String(this.props.event.timestamp);
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
/* 26 */
/***/ function(module, exports) {

	var EventItemJson = React.createClass({
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var ReceiveMailItem = __webpack_require__(28);
	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var ReceivePage = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  componentDidMount: function () {
	    this.getFlux().actions.getReceiveInit();
	  },

	  getStateFromFlux: function () {
	    var store = this.getFlux().store("DemoboxStore");
	    return {
	      receiveAddress: store.receiveAddress,
	      receiveMails: store.receiveMails
	    };
	  },

	  getMailTo: function (receiveAddress) {
	    return "mailto:" + receiveAddress + "?subject=メール受信テスト&amp;body=メール受信テストの本文";
	  },

	  render: function () {
	    return React.createElement(
	      "div",
	      { className: "container-fluid" },
	      React.createElement(
	        "div",
	        { className: "row" },
	        React.createElement(
	          "div",
	          { className: "row" },
	          React.createElement(
	            "div",
	            { className: "alert alert-warning" },
	            "Mailto: ",
	            React.createElement(
	              "a",
	              { href: this.getMailTo(this.state.receiveAddress) },
	              this.state.receiveAddress
	            )
	          )
	        ),
	        React.createElement(
	          "table",
	          { id: "receive-table",
	            className: "table table-striped table-bordered table-condensed" },
	          React.createElement(
	            "thead",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "to"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "from"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "subject"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "text"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "html"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "charsets"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "attachments"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "envelope"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "sender_ip"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "dkim"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "SPF"
	                )
	              ),
	              React.createElement(
	                "th",
	                null,
	                React.createElement(
	                  "small",
	                  null,
	                  "headers"
	                )
	              )
	            )
	          ),
	          React.createElement(
	            FlipMove,
	            {
	              enterAnimation: "accordianVertical", leaveAnimation: "accordianVertical",
	              typeName: "tbody" },
	            this.state.receiveMails.map(function (mail) {
	              var key = mail.id;
	              return React.createElement(ReceiveMailItem, { key: key, mail: mail });
	            }, this)
	          )
	        )
	      )
	    );
	  }
	});
	module.exports = ReceivePage;

/***/ },
/* 28 */
/***/ function(module, exports) {

	var ReceiveMailItem = React.createClass({
	  propTypes: {
	    mail: React.PropTypes.object.isRequired
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
	          this.props.mail.to
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.from
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.subject
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.text
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.html
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.charsets
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.attachments
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.envelope
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.sender_ip
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.dkim
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.SPF
	        )
	      ),
	      React.createElement(
	        "td",
	        null,
	        React.createElement(
	          "small",
	          null,
	          this.props.mail.headers
	        )
	      )
	    );
	  }
	});
	module.exports = ReceiveMailItem;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var DemoboxStore = __webpack_require__(30);
	var DemoboxActions = __webpack_require__(32);

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
	  flux.actions.addEvents(value);
	});

	io.on("receive", function (value) {
	  flux.actions.addReceiveMail(value);
	});

	module.exports = flux;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(31);

	var DemoboxStore = Fluxxor.createStore({
	  initialize: function () {
	    this.activePage = "send";
	    this.mailData = {
	      personalizations: [],
	      subject: "Mail From Demobox",
	      from: null,
	      "reply-to": null,
	      content: [{ type: "text/plain", value: "hoge" }, { type: "text/html", value: "fuga" }],
	      attachments: [],
	      template_id: null,
	      sections: [],
	      headers: [],
	      categories: [],
	      custom_args: [],
	      send_at: null,
	      asm: null,
	      ip_pool_name: null,
	      mail_settings: {
	        bcc: null,
	        bypass_list_management: null,
	        footer: null,
	        sandbox_mode: null,
	        spam_check: null
	      },
	      tracking_settings: {
	        click_tracking: null,
	        open_tracking: null,
	        subscription_tracking: null,
	        ganalytics: null
	      }
	    };
	    this.status = '';
	    this.request = '';
	    this.reponseCode = '';
	    this.responseBody = '';
	    this.error = null;
	    this.result = "";
	    this.showEvent = "json";
	    this.events = [];
	    this.receiveAddress = "";
	    this.receiveMails = [];

	    this.bindActions(constants.UPD_ACTIVE_PAGE, this.onUpdActivePage, constants.ADD_PERSONALIZATION, this.onAddPersonalization, constants.DEL_PERSONALIZATION, this.onDelPersonalization, constants.ADD_TO_INPERSONAL, this.onAddToInpersonal, constants.DEL_TO_INPERSONAL, this.onDelToInpersonal, constants.UPD_TO_INPERSONAL, this.onUpdToInpersonal, constants.ADD_CC_INPERSONAL, this.onAddCcInpersonal, constants.DEL_CC_INPERSONAL, this.onDelCcInpersonal, constants.UPD_CC_INPERSONAL, this.onUpdCcInpersonal, constants.ADD_BCC_INPERSONAL, this.onAddBccInpersonal, constants.DEL_BCC_INPERSONAL, this.onDelBccInpersonal, constants.UPD_BCC_INPERSONAL, this.onUpdBccInpersonal, constants.ADD_SUBJECT_INPERSONAL, this.onAddSubjectInpersonal, constants.DEL_SUBJECT_INPERSONAL, this.onDelSubjectInpersonal, constants.UPD_SUBJECT_INPERSONAL, this.onUpdSubjectInpersonal, constants.ADD_HEADER_INPERSONAL, this.onAddHeaderInpersonal, constants.DEL_HEADER_INPERSONAL, this.onDelHeaderInpersonal, constants.UPD_HEADER_INPERSONAL, this.onUpdHeaderInpersonal, constants.ADD_SUBSTITUTION_INPERSONAL, this.onAddSubstitutionInpersonal, constants.DEL_SUBSTITUTION_INPERSONAL, this.onDelSubstitutionInpersonal, constants.UPD_SUBSTITUTION_INPERSONAL, this.onUpdSubstitutionInpersonal, constants.ADD_CUSTOMARG_INPERSONAL, this.onAddCustomargInpersonal, constants.DEL_CUSTOMARG_INPERSONAL, this.onDelCustomargInpersonal, constants.UPD_CUSTOMARG_INPERSONAL, this.onUpdCustomargInpersonal, constants.ADD_SEND_AT_INPERSONAL, this.onAddSendAtInpersonal, constants.DEL_SEND_AT_INPERSONAL, this.onDelSendAtInpersonal, constants.UPD_SEND_AT_INPERSONAL, this.onUpdSendAtInpersonal, constants.ADD_REPLYTO, this.onAddReplyto, constants.DEL_REPLYTO, this.onDelReplyto, constants.UPD_REPLYTO, this.onUpdReplyto, constants.UPD_FROM, this.onUpdFrom, constants.ADD_SUBJECT, this.onAddSubject, constants.DEL_SUBJECT, this.onDelSubject, constants.UPD_SUBJECT, this.onUpdSubject, constants.ADD_CONTENT, this.onAddContent, constants.DEL_CONTENT, this.onDelContent, constants.UPD_CONTENT, this.onUpdContent, constants.ADD_ATTACHMENT, this.onAddAttachment, constants.DEL_ATTACHMENT, this.onDelAttachment, constants.UPD_ATTACHMENT, this.onUpdAttachment, constants.ADD_TEMPLATE_ID, this.onAddTemplateId, constants.DEL_TEMPLATE_ID, this.onDelTemplateId, constants.UPD_TEMPLATE_ID, this.onUpdTemplateId, constants.ADD_SECTIONS, this.onAddSections, constants.DEL_SECTIONS, this.onDelSections, constants.UPD_SECTIONS, this.onUpdSections, constants.ADD_HEADERS, this.onAddHeaders, constants.DEL_HEADERS, this.onDelHeaders, constants.UPD_HEADERS, this.onUpdHeaders, constants.ADD_CATEGORIES, this.onAddCategories, constants.DEL_CATEGORIES, this.onDelCategories, constants.UPD_CATEGORIES, this.onUpdCategories, constants.ADD_CUSTOM_ARGS, this.onAddCustomArgs, constants.DEL_CUSTOM_ARGS, this.onDelCustomArgs, constants.UPD_CUSTOM_ARGS, this.onUpdCustomArgs, constants.ADD_SEND_AT, this.onAddSendAt, constants.DEL_SEND_AT, this.onDelSendAt, constants.UPD_SEND_AT, this.onUpdSendAt, constants.ADD_BATCH_ID, this.onAddBatchId, constants.DEL_BATCH_ID, this.onDelBatchId, constants.UPD_BATCH_ID, this.onUpdBatchId, constants.ADD_ASM, this.onAddAsm, constants.DEL_ASM, this.onDelAsm, constants.UPD_GROUP_ID, this.onUpdGroupId, constants.ADD_GROUPS_TO_DISPLAY, this.onAddGroupsToDisplay, constants.DEL_GROUPS_TO_DISPLAY, this.onDelGroupsToDisplay, constants.UPD_GROUPS_TO_DISPLAY, this.onUpdGroupsToDisplay, constants.ADD_IP_POOL_NAME, this.onAddIpPoolName, constants.DEL_IP_POOL_NAME, this.onDelIpPoolName, constants.UPD_IP_POOL_NAME, this.onUpdIpPoolName, constants.UPD_MAIL_SETTINGS, this.onUpdMailSettings, constants.ADD_MAIL_SETTINGS_ITEM, this.onAddMailSettingsItem, constants.DEL_MAIL_SETTINGS_ITEM, this.onDelMailSettingsItem, constants.UPD_TRACKING_SETTINGS, this.onUpdTrackingSettings, constants.ADD_TRACKING_SETTINGS_ITEM, this.onAddTrackingSettingsItem, constants.DEL_TRACKING_SETTINGS_ITEM, this.onDelTrackingSettingsItem, constants.GET_SEND_INIT_SUCCESS, this.onGetSendInitSuccess, constants.GET_SEND_INIT_FAIL, this.onGetSendInitFail, constants.GET_RECEIVE_INIT_SUCCESS, this.onGetReceiveInitSuccess, constants.GET_RECEIVE_INIT_FAIL, this.onGetReceiveInitFail, constants.SEND_MAIL, this.onSendMail, constants.SEND_MAIL_SUCCESS, this.onSendMailSuccess, constants.SEND_MAIL_FAIL, this.onSendMailFail, constants.TOGGLE_SHOW_EVENT, this.onToggleShowEvent, constants.ADD_EVENTS, this.onAddEvents, constants.ADD_RECEIVE_MAIL, this.onAddReceiveMail);
	  },

	  onUpdActivePage: function (payload) {
	    this.activePage = payload.activePage;
	    this.emit("change");
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
	    delete this.mailData.personalizations[index];
	    this.emit("change");
	  },

	  onAddToInpersonal: function (index) {
	    this.mailData.personalizations[index].to.push({ email: "", name: "" });
	    this.emit("change");
	  },
	  onDelToInpersonal: function (payload) {
	    delete this.mailData.personalizations[payload.parentIndex].to[payload.index];
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
	    delete this.mailData.personalizations[payload.parentIndex].cc[payload.index];
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
	    delete this.mailData.personalizations[payload.parentIndex].bcc[payload.index];
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
	    delete this.mailData.personalizations[payload.parentIndex].headers[payload.index];
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
	    delete this.mailData.personalizations[payload.parentIndex].substitutions[payload.index];
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
	    delete this.mailData.personalizations[payload.parentIndex].custom_args[payload.index];
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
	      if (this.mailData.content[i] !== undefined && this.mailData.content[i].type === payload.type) {
	        delete this.mailData.content[i];
	        break;
	      }
	    }
	    this.emit("change");
	  },
	  onUpdContent: function (payload) {
	    for (var i = 0; i < this.mailData.content.length; i++) {
	      if (this.mailData.content[i] !== undefined && this.mailData.content[i].type === payload.type) {
	        this.mailData.content[i].value = payload.value;
	        break;
	      }
	    }
	    this.emit("change");
	  },

	  onAddAttachment: function () {
	    this.mailData.attachments.push({
	      content: "",
	      type: "",
	      filename: "",
	      disposition: "",
	      content_id: ""
	    });
	    this.emit("change");
	  },
	  onDelAttachment: function (payload) {
	    delete this.mailData.attachments[payload.index];
	    this.emit("change");
	  },
	  onUpdAttachment: function (payload) {
	    this.mailData.attachments[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddTemplateId: function () {
	    this.mailData.template_id = "";
	    this.emit("change");
	  },
	  onDelTemplateId: function () {
	    this.mailData.template_id = null;
	    this.emit("change");
	  },
	  onUpdTemplateId: function (payload) {
	    this.mailData.template_id = payload.value;
	    this.emit("change");
	  },

	  onAddSections: function () {
	    this.mailData.sections.push({ "": "" });
	    this.emit("change");
	  },
	  onDelSections: function (payload) {
	    delete this.mailData.sections[payload.index];
	    this.emit("change");
	  },
	  onUpdSections: function (payload) {
	    this.mailData.sections[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddHeaders: function () {
	    this.mailData.headers.push({ "": "" });
	    this.emit("change");
	  },
	  onDelHeaders: function (payload) {
	    delete this.mailData.headers[payload.index];
	    this.emit("change");
	  },
	  onUpdHeaders: function (payload) {
	    this.mailData.headers[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddCategories: function () {
	    this.mailData.categories.push("");
	    this.emit("change");
	  },
	  onDelCategories: function (payload) {
	    delete this.mailData.categories[payload.index];
	    this.emit("change");
	  },
	  onUpdCategories: function (payload) {
	    this.mailData.categories[payload.index] = payload.value;
	    this.emit("change");
	  },

	  onAddCustomArgs: function () {
	    this.mailData.custom_args.push({ "": "" });
	    this.emit("change");
	  },
	  onDelCustomArgs: function (payload) {
	    delete this.mailData.custom_args[payload.index];
	    this.emit("change");
	  },
	  onUpdCustomArgs: function (payload) {
	    this.mailData.custom_args[payload.index][payload.key] = payload.value;
	    this.emit("change");
	  },

	  onAddSendAt: function () {
	    this.mailData.send_at = "";
	    this.emit("change");
	  },
	  onDelSendAt: function () {
	    this.mailData.send_at = null;
	    this.emit("change");
	  },
	  onUpdSendAt: function (payload) {
	    this.mailData.send_at = payload.value;
	    this.emit("change");
	  },

	  onAddBatchId: function () {
	    this.mailData.batch_id = "";
	    this.emit("change");
	  },
	  onDelBatchId: function () {
	    this.mailData.batch_id = null;
	    this.emit("change");
	  },
	  onUpdBatchId: function (payload) {
	    this.mailData.batch_id = payload.value;
	    this.emit("change");
	  },

	  onAddAsm: function () {
	    this.mailData.asm = { group_id: "", groups_to_display: [""] };
	    this.emit("change");
	  },
	  onDelAsm: function () {
	    this.mailData.asm = null;
	    this.emit("change");
	  },

	  onUpdGroupId: function (payload) {
	    this.mailData.asm.group_id = payload.value;
	    this.emit("change");
	  },

	  onAddGroupsToDisplay: function () {
	    this.mailData.asm.groups_to_display.push("");
	    this.emit("change");
	  },
	  onDelGroupsToDisplay: function (payload) {
	    delete this.mailData.asm.groups_to_display[payload.index];
	    this.emit("change");
	  },
	  onUpdGroupsToDisplay: function (payload) {
	    this.mailData.asm.groups_to_display[payload.index] = payload.value;
	    this.emit("change");
	  },

	  onAddIpPoolName: function () {
	    this.mailData.ip_pool_name = "";
	    this.emit("change");
	  },
	  onDelIpPoolName: function () {
	    this.mailData.ip_pool_name = null;
	    this.emit("change");
	  },
	  onUpdIpPoolName: function (payload) {
	    this.mailData.ip_pool_name = payload.value;
	    this.emit("change");
	  },

	  onUpdMailSettings: function (payload) {
	    this.mailData.mail_settings[payload.parent][payload.name] = payload.value;
	    this.emit("change");
	  },
	  onAddMailSettingsItem: function (payload) {
	    var value = {};
	    switch (payload.parent) {
	      case "bcc":
	        value = { enable: false, email: "" };
	        break;
	      case "bypass_list_management":
	        value = { enable: false };
	        break;
	      case "footer":
	        value = { enable: false, text: "", html: "" };
	        break;
	      case "sandbox_mode":
	        value = { enable: false };
	        break;
	      case "spam_check":
	        value = { enable: false, threshold: 5, post_to_url: "" };
	        break;
	    }
	    this.mailData.mail_settings[payload.parent] = value;
	    this.emit("change");
	  },
	  onDelMailSettingsItem: function (payload) {
	    this.mailData.mail_settings[payload.parent] = null;
	    this.emit("change");
	  },

	  onUpdTrackingSettings: function (payload) {
	    this.mailData.tracking_settings[payload.parent][payload.name] = payload.value;
	    this.emit("change");
	  },
	  onAddTrackingSettingsItem: function (payload) {
	    var value = {};
	    switch (payload.parent) {
	      case "click_tracking":
	        value = { enable: false, enable_text: false };
	        break;
	      case "open_tracking":
	        value = { enable: false, substitution_tag: "" };
	        break;
	      case "subscription_tracking":
	        value = { enable: false, text: "", html: "", substitution_tag: "" };
	        break;
	      case "ganalytics":
	        value = { enable: false };
	        break;
	    }
	    this.mailData.tracking_settings[payload.parent] = value;
	    this.emit("change");
	  },
	  onDelTrackingSettingsItem: function (payload) {
	    this.mailData.tracking_settings[payload.parent] = null;
	    this.emit("change");
	  },

	  onGetSendInitSuccess: function (payload) {
	    this.mailData.from = { email: payload.result.from, name: "" };
	    this.mailData.personalizations.push({
	      to: [{ email: payload.result.to, name: "" }],
	      cc: [],
	      bcc: [],
	      headers: [],
	      substitutions: [],
	      custom_args: []
	    });
	    this.emit("change");
	  },

	  onGetSendInitFail: function (payload) {},

	  onGetReceiveInitSuccess: function (payload) {
	    this.receiveAddress = payload.result.receive_address;
	    this.emit("change");
	  },

	  onGetReceiveInitFail: function (payload) {},

	  onSendMail: function (payload) {
	    this.status = '送信中...';
	    this.request = payload.param;
	    this.responseCode = '';
	    this.responseBody = '';
	    this.emit("change");
	  },

	  onSendMailSuccess: function (payload) {
	    this.status = '送信完了';
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
	    this.showEvent = payload.buttonId;
	    this.emit("change");
	  },

	  onAddEvents: function (payload) {
	    var events = JSON.parse(payload.events);
	    this.events = _.union(this.events, events);
	    this.events = _.sortBy(this.events, function (event) {
	      return -event.timestamp;
	    });
	    this.emit("change");
	  },

	  onAddReceiveMail: function (payload) {
	    var receiveMail = JSON.parse(payload.receiveMail);
	    receiveMail.id = _.uniqueId('receive_mail');
	    this.receiveMails = [receiveMail].concat(this.receiveMails);
	    this.emit("change");
	  }
	});

	module.exports = DemoboxStore;

/***/ },
/* 31 */
/***/ function(module, exports) {

	var constants = {
	  UPD_ACTIVE_PAGE: "UPD_ACTIVE_PAGE",

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
	  ADD_ATTACHMENT: "ADD_ATTACHMENT",
	  DEL_ATTACHMENT: "DEL_ATTACHMENT",
	  UPD_ATTACHMENT: "UPD_ATTACHMENT",
	  ADD_TEMPLATE_ID: "ADD_TEMPLATE_ID",
	  UPD_TEMPLATE_ID: "UPD_TEMPLATE_ID",
	  DEL_TEMPLATE_ID: "DEL_TEMPLATE_ID",
	  ADD_SECTIONS: "ADD_SECTIONS",
	  DEL_SECTIONS: "DEL_SECTIONS",
	  UPD_SECTIONS: "UPD_SECTIONS",
	  ADD_HEADERS: "ADD_HEADERS",
	  DEL_HEADERS: "DEL_HEADERS",
	  UPD_HEADERS: "UPD_HEADERS",
	  ADD_CATEGORIES: "ADD_CATEGORIES",
	  DEL_CATEGORIES: "DEL_CATEGORIES",
	  UPD_CATEGORIES: "UPD_CATEGORIES",
	  ADD_CUSTOM_ARGS: "ADD_CUSTOM_ARGS",
	  DEL_CUSTOM_ARGS: "DEL_CUSTOM_ARGS",
	  UPD_CUSTOM_ARGS: "UPD_CUSTOM_ARGS",
	  ADD_SEND_AT: "ADD_SEND_AT",
	  DEL_SEND_AT: "DEL_SEND_AT",
	  UPD_SEND_AT: "UPD_SEND_AT",
	  ADD_BATCH_ID: "ADD_BATCH_ID",
	  DEL_BATCH_ID: "DEL_BATCH_ID",
	  UPD_BATCH_ID: "UPD_BATCH_ID",
	  ADD_ASM: "ADD_ASM",
	  DEL_ASM: "DEL_ASM",
	  UPD_GROUP_ID: "UPD_GROUP_ID",
	  ADD_GROUPS_TO_DISPLAY: "ADD_GROUPS_TO_DISPLAY",
	  DEL_GROUPS_TO_DISPLAY: "DEL_GROUPS_TO_DISPLAY",
	  UPD_GROUPS_TO_DISPLAY: "UPD_GROUPS_TO_DISPLAY",
	  ADD_IP_POOL_NAME: "ADD_IP_POOL_NAME",
	  DEL_IP_POOL_NAME: "DEL_IP_POOL_NAME",
	  UPD_IP_POOL_NAME: "UPD_IP_POOL_NAME",
	  UPD_MAIL_SETTINGS: "UPD_MAIL_SETTINGS",
	  ADD_MAIL_SETTINGS_ITEM: "ADD_MAIL_SETTINGS_ITEM",
	  DEL_MAIL_SETTINGS_ITEM: "DEL_MAIL_SETTINGS_ITEM",
	  UPD_TRACKING_SETTINGS: "UPD_TRACKING_SETTINGS",
	  ADD_TRACKING_SETTINGS_ITEM: "ADD_TRACKING_SETTINGS_ITEM",
	  DEL_TRACKING_SETTINGS_ITEM: "DEL_TRACKING_SETTINGS_ITEM",

	  GET_SEND_INIT_SUCCESS: "GET_SEND_INIT_SUCCESS",
	  GET_SEND_INIT_FAIL: "GET_SEND_INIT_FAIL",
	  GET_RECEIVE_INIT_SUCCESS: "GET_RECEIVE_INIT_SUCCESS",
	  GET_RECEIVE_INIT_FAIL: "GET_RECEIVE_INIT_FAIL",

	  SEND_MAIL: "SEND_MAIL",
	  SEND_MAIL_SUCCESS: "SEND_MAIL_SUCCESS",
	  SEND_MAIL_FAIL: "SEND_MAIL_FAIL",
	  TOGGLE_SHOW_EVENT: "TOGGLE_SHOW_EVENT",
	  ADD_EVENTS: "ADD_EVENTS",
	  ADD_RECEIVE_MAIL: "ADD_RECEIVE_MAIL"
	};

	module.exports = constants;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(31);
	var DemoboxClient = __webpack_require__(33);

	var actions = {
	  updActivePage: function (activePage) {
	    this.dispatch(constants.UPD_ACTIVE_PAGE, { activePage: activePage });
	  },

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

	  addAttachment: function () {
	    this.dispatch(constants.ADD_ATTACHMENT);
	  },
	  delAttachment: function (index) {
	    this.dispatch(constants.DEL_ATTACHMENT, { index: index });
	  },
	  updAttachment: function (index, key, value) {
	    this.dispatch(constants.UPD_ATTACHMENT, { index: index, key: key, value: value });
	  },

	  addTemplateId: function () {
	    this.dispatch(constants.ADD_TEMPLATE_ID);
	  },
	  delTemplateId: function () {
	    this.dispatch(constants.DEL_TEMPLATE_ID);
	  },
	  updTemplateId: function (value) {
	    this.dispatch(constants.UPD_TEMPLATE_ID, { value: value });
	  },

	  addSections: function () {
	    this.dispatch(constants.ADD_SECTIONS);
	  },
	  delSections: function (index) {
	    this.dispatch(constants.DEL_SECTIONS, { index: index });
	  },
	  updSections: function (index, key, value) {
	    this.dispatch(constants.UPD_SECTIONS, { index: index, key: key, value: value });
	  },

	  addHeaders: function () {
	    this.dispatch(constants.ADD_HEADERS);
	  },
	  delHeaders: function (index) {
	    this.dispatch(constants.DEL_HEADERS, { index: index });
	  },
	  updHeaders: function (index, key, value) {
	    this.dispatch(constants.UPD_HEADERS, { index: index, key: key, value: value });
	  },

	  addCategories: function () {
	    this.dispatch(constants.ADD_CATEGORIES);
	  },
	  delCategories: function (index) {
	    this.dispatch(constants.DEL_CATEGORIES, { index: index });
	  },
	  updCategories: function (index, value) {
	    this.dispatch(constants.UPD_CATEGORIES, { index: index, value: value });
	  },

	  addCustomArgs: function () {
	    this.dispatch(constants.ADD_CUSTOM_ARGS);
	  },
	  delCustomArgs: function (index) {
	    this.dispatch(constants.DEL_CUSTOM_ARGS, { index: index });
	  },
	  updCustomArgs: function (index, key, value) {
	    this.dispatch(constants.UPD_CUSTOM_ARGS, { index: index, key: key, value: value });
	  },

	  addSendAt: function () {
	    this.dispatch(constants.ADD_SEND_AT);
	  },
	  delSendAt: function () {
	    this.dispatch(constants.DEL_SEND_AT);
	  },
	  updSendAt: function (value) {
	    this.dispatch(constants.UPD_SEND_AT, { value: value });
	  },

	  addBatchId: function () {
	    this.dispatch(constants.ADD_BATCH_ID);
	  },
	  delBatchId: function () {
	    this.dispatch(constants.DEL_BATCH_ID);
	  },
	  updBatchId: function (value) {
	    this.dispatch(constants.UPD_BATCH_ID, { value: value });
	  },

	  addAsm: function () {
	    this.dispatch(constants.ADD_ASM);
	  },
	  delAsm: function () {
	    this.dispatch(constants.DEL_ASM);
	  },

	  updGroupId: function (value) {
	    this.dispatch(constants.UPD_GROUP_ID, { value: value });
	  },

	  addGroupsToDisplay: function () {
	    this.dispatch(constants.ADD_GROUPS_TO_DISPLAY);
	  },
	  delGroupsToDisplay: function (index) {
	    this.dispatch(constants.DEL_GROUPS_TO_DISPLAY, { index: index });
	  },
	  updGroupsToDisplay: function (index, value) {
	    this.dispatch(constants.UPD_GROUPS_TO_DISPLAY, { index: index, value: value });
	  },

	  addIpPoolName: function () {
	    this.dispatch(constants.ADD_IP_POOL_NAME);
	  },
	  delIpPoolName: function () {
	    this.dispatch(constants.DEL_IP_POOL_NAME);
	  },
	  updIpPoolName: function (value) {
	    this.dispatch(constants.UPD_IP_POOL_NAME, { value: value });
	  },

	  addMailSettingsItem: function (parent) {
	    this.dispatch(constants.ADD_MAIL_SETTINGS_ITEM, { parent: parent });
	  },
	  delMailSettingsItem: function (parent) {
	    this.dispatch(constants.DEL_MAIL_SETTINGS_ITEM, { parent: parent });
	  },
	  updMailSettings: function (parent, name, value) {
	    this.dispatch(constants.UPD_MAIL_SETTINGS, { parent: parent, name: name, value: value });
	  },

	  addTrackingSettingsItem: function (parent) {
	    this.dispatch(constants.ADD_TRACKING_SETTINGS_ITEM, { parent: parent });
	  },
	  delTrackingSettingsItem: function (parent) {
	    this.dispatch(constants.DEL_TRACKING_SETTINGS_ITEM, { parent: parent });
	  },
	  updTrackingSettings: function (parent, name, value) {
	    this.dispatch(constants.UPD_TRACKING_SETTINGS, { parent: parent, name: name, value: value });
	  },

	  getSendInit: function () {
	    DemoboxClient.getFromServer('/send_init', function (result) {
	      this.dispatch(constants.GET_SEND_INIT_SUCCESS, { result: result });
	    }.bind(this), function (xhr, status, err) {
	      this.dispatch(constants.GET_SEND_INIT_FAIL, {
	        responseCode: xhr.status,
	        responseBody: err.message
	      });
	    }.bind(this));
	  },

	  getReceiveInit: function () {
	    DemoboxClient.getFromServer('/receive_init', function (result) {
	      this.dispatch(constants.GET_RECEIVE_INIT_SUCCESS, { result: result });
	    }.bind(this), function (xhr, status, err) {
	      this.dispatch(constants.GET_RECEIVE_INIT_FAIL, {
	        responseCode: xhr.status,
	        responseBody: err.message
	      });
	    }.bind(this));
	  },

	  sendMail: function (mailData) {
	    var param = DemoboxClient.makeParam(mailData);
	    this.dispatch(constants.SEND_MAIL, { param: param });
	    DemoboxClient.sendMail(param, function (result) {
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
	  },

	  addReceiveMail: function (receiveMail) {
	    this.dispatch(constants.ADD_RECEIVE_MAIL, { receiveMail: receiveMail });
	  }
	};

	module.exports = actions;

/***/ },
/* 33 */
/***/ function(module, exports) {

	var DemoboxClient = {
	  sendMail: function (mailData, success, failure) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState == 4) {
	        if (xhr.status == 200) {
	          success(JSON.parse(xhr.responseText));
	        } else {
	          failure(xhr, xhr.status, xhr.responseText);
	        }
	      }
	    }.bind(this);
	    xhr.open('POST', '/send');
	    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	    xhr.send(mailData);
	  },

	  makeParam: function (mailData) {
	    var mailData2 = $.extend(true, {}, mailData);
	    for (var i = 0; i < mailData.personalizations.length; i++) {
	      if (mailData.personalizations[i] !== undefined) {
	        mailData2.personalizations[i].headers = this.array2hash(mailData.personalizations[i].headers);
	        mailData2.personalizations[i].substitutions = this.array2hash(mailData.personalizations[i].substitutions);
	        mailData2.personalizations[i].custom_args = this.array2hash(mailData.personalizations[i].custom_args);
	      }
	    }
	    mailData2.sections = this.array2hash(mailData.sections);
	    mailData2.headers = this.array2hash(mailData.headers);
	    mailData2.custom_args = this.array2hash(mailData.custom_args);

	    // remove empty element in array
	    var mailData3 = this.deepCompact(mailData2);

	    // remove empty value in object
	    this.removeEmpty(mailData3);

	    var requestParam = JSON.stringify(mailData3);
	    return requestParam;
	  },

	  array2hash: function (array) {
	    var hash = {};
	    for (var j = 0; j < array.length; j++) {
	      if (!_.isEmpty(array[j])) {
	        hash[array[j].key] = array[j].value;
	      }
	    }
	    return hash;
	  },

	  removeEmpty: function (element) {
	    // Array
	    if (_.isArray(element)) {
	      // Loop with element and recursive call removeEmpty()
	      _.each(element, function (e) {
	        this.removeEmpty(e);
	      }.bind(this));
	    }
	    // Object
	    if (_.isObject(element)) {
	      // Loop with object property
	      _.each(_.keys(element), function (key) {
	        if (element[key] === undefined || element[key] === null || _.isObject(element[key]) && _.isEmpty(element[key]) || element[key] === "") {
	          // delete property if the property value is null,[],{},""
	          delete element[key];
	        } else if (_.isObject(element[key]) && _.reject(_.values(element[key]), function (value) {
	          return value === null;
	        }).length === 0) {
	          // delete property if the values of object are all null
	          delete element[key];
	        } else {
	          this.removeEmpty(element[key]);
	        }
	      }.bind(this));
	    }
	  },

	  deepCompact: function (mailData) {
	    var mailData3 = $.extend(true, {}, mailData);
	    mailData3.personalizations = _.compact(mailData.personalizations);
	    for (var i = 0; i < mailData3.personalizations.length; i++) {
	      if (mailData.personalizations[i] !== undefined) {
	        mailData3.personalizations[i].to = _.compact(mailData.personalizations[i].to);
	        mailData3.personalizations[i].cc = _.compact(mailData.personalizations[i].cc);
	        mailData3.personalizations[i].bcc = _.compact(mailData.personalizations[i].bcc);
	      }
	    }
	    mailData3.content = _.compact(mailData.content);
	    mailData3.attachments = _.compact(mailData.attachments);
	    mailData3.categories = _.compact(mailData.categories);
	    if (mailData.asm !== null) {
	      mailData3.asm.groups_to_display = _.compact(mailData.asm.groups_to_display);
	    }
	    return mailData3;
	  },

	  getFromServer: function (url, success, failure) {
	    var xhr = new XMLHttpRequest();
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState == 4) {
	        if (xhr.status == 200) {
	          success(JSON.parse(xhr.responseText));
	        } else {
	          failure(xhr, xhr.status, xhr.responseText);
	        }
	      }
	    }.bind(this);
	    xhr.open('GET', url);
	    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	    xhr.send(null);
	  }
	};

	module.exports = DemoboxClient;

/***/ }
/******/ ]);