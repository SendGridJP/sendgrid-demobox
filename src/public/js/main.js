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
	var flux = __webpack_require__(23);

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
	var ReceivePage = __webpack_require__(22);

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
	var EventsPain = __webpack_require__(18);

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
	var AttachmentForm = __webpack_require__(16);
	var KeyValueForm = __webpack_require__(13);
	var AsmForm = __webpack_require__(28);
	var MailSettingsForm = __webpack_require__(29);
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
	  handleDelAttachment: function () {
	    this.getFlux().actions.delAttachment();
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
	        React.createElement(MailSettingsForm, null)
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
	          { href: "javascript:void(0)", onClick: this.handleAddPersonalization },
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
	var KeyValueForm = __webpack_require__(13);
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
	      nameKey: "key",
	      nameValue: "value",
	      placeholderKey: "Key",
	      placeholderValue: "Value"
	    };
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
	    if (Array.isArray(this.props.value)) {
	      items = this.props.value.map(function (data, index) {
	        return React.createElement(SimpleTextItem, {
	          index: index,
	          value: data,
	          placeholder: this.props.placeholder,
	          handleDel: this.props.handleDel,
	          handleUpd: this.props.handleUpd });
	      }.bind(this));
	      add = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd },
	        React.createElement("span", { className: "glyphicon glyphicon-plus" })
	      );
	    } else {
	      if (this.props.value != null) {
	        items = React.createElement(SimpleTextItem, {
	          value: this.props.value,
	          placeholder: "Value",
	          handleDel: this.props.handleDel,
	          handleUpd: this.props.handleUpd });
	      }
	      if (this.props.value == null && this.props.max == 1) {
	        add = React.createElement(
	          "a",
	          { href: "javascript:void(0)", onClick: this.props.handleAdd },
	          React.createElement("span", { className: "glyphicon glyphicon-plus" })
	        );
	      }
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
	      placeholder: "Value"
	    };
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

	  getInitialState: function () {
	    return {};
	  },

	  render: function () {
	    var add;
	    if (this.props.data.length < 2) {
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

	var AttachmentItem = __webpack_require__(17);

	var AttachmentForm = React.createClass({
	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired,
	    handleUpd: React.PropTypes.func.isRequired
	  },

	  getInitialState: function () {
	    return {};
	  },

	  render: function () {
	    var add;
	    if (this.props.data.length < 2) {
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
	        "attachments"
	      ),
	      React.createElement(
	        "div",
	        null,
	        this.props.data.map(function (data, index) {
	          return React.createElement(AttachmentItem, {
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

	  getInitialState: function () {
	    return {};
	  },

	  handleDel: function () {
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

	var ShowButton = __webpack_require__(19);
	var EventItemTable = __webpack_require__(20);
	var EventItemJson = __webpack_require__(21);
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var DemoboxStore = __webpack_require__(24);
	var DemoboxActions = __webpack_require__(26);

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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(25);

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

	    this.bindActions(constants.ADD_PERSONALIZATION, this.onAddPersonalization, constants.DEL_PERSONALIZATION, this.onDelPersonalization, constants.ADD_TO_INPERSONAL, this.onAddToInpersonal, constants.DEL_TO_INPERSONAL, this.onDelToInpersonal, constants.UPD_TO_INPERSONAL, this.onUpdToInpersonal, constants.ADD_CC_INPERSONAL, this.onAddCcInpersonal, constants.DEL_CC_INPERSONAL, this.onDelCcInpersonal, constants.UPD_CC_INPERSONAL, this.onUpdCcInpersonal, constants.ADD_BCC_INPERSONAL, this.onAddBccInpersonal, constants.DEL_BCC_INPERSONAL, this.onDelBccInpersonal, constants.UPD_BCC_INPERSONAL, this.onUpdBccInpersonal, constants.ADD_SUBJECT_INPERSONAL, this.onAddSubjectInpersonal, constants.DEL_SUBJECT_INPERSONAL, this.onDelSubjectInpersonal, constants.UPD_SUBJECT_INPERSONAL, this.onUpdSubjectInpersonal, constants.ADD_HEADER_INPERSONAL, this.onAddHeaderInpersonal, constants.DEL_HEADER_INPERSONAL, this.onDelHeaderInpersonal, constants.UPD_HEADER_INPERSONAL, this.onUpdHeaderInpersonal, constants.ADD_SUBSTITUTION_INPERSONAL, this.onAddSubstitutionInpersonal, constants.DEL_SUBSTITUTION_INPERSONAL, this.onDelSubstitutionInpersonal, constants.UPD_SUBSTITUTION_INPERSONAL, this.onUpdSubstitutionInpersonal, constants.ADD_CUSTOMARG_INPERSONAL, this.onAddCustomargInpersonal, constants.DEL_CUSTOMARG_INPERSONAL, this.onDelCustomargInpersonal, constants.UPD_CUSTOMARG_INPERSONAL, this.onUpdCustomargInpersonal, constants.ADD_SEND_AT_INPERSONAL, this.onAddSendAtInpersonal, constants.DEL_SEND_AT_INPERSONAL, this.onDelSendAtInpersonal, constants.UPD_SEND_AT_INPERSONAL, this.onUpdSendAtInpersonal, constants.ADD_REPLYTO, this.onAddReplyto, constants.DEL_REPLYTO, this.onDelReplyto, constants.UPD_REPLYTO, this.onUpdReplyto, constants.UPD_FROM, this.onUpdFrom, constants.ADD_SUBJECT, this.onAddSubject, constants.DEL_SUBJECT, this.onDelSubject, constants.UPD_SUBJECT, this.onUpdSubject, constants.ADD_CONTENT, this.onAddContent, constants.DEL_CONTENT, this.onDelContent, constants.UPD_CONTENT, this.onUpdContent, constants.ADD_ATTACHMENT, this.onAddAttachment, constants.DEL_ATTACHMENT, this.onDelAttachment, constants.UPD_ATTACHMENT, this.onUpdAttachment, constants.ADD_TEMPLATE_ID, this.onAddTemplateId, constants.DEL_TEMPLATE_ID, this.onDelTemplateId, constants.UPD_TEMPLATE_ID, this.onUpdTemplateId, constants.ADD_SECTIONS, this.onAddSections, constants.DEL_SECTIONS, this.onDelSections, constants.UPD_SECTIONS, this.onUpdSections, constants.ADD_HEADERS, this.onAddHeaders, constants.DEL_HEADERS, this.onDelHeaders, constants.UPD_HEADERS, this.onUpdHeaders, constants.ADD_CATEGORIES, this.onAddCategories, constants.DEL_CATEGORIES, this.onDelCategories, constants.UPD_CATEGORIES, this.onUpdCategories, constants.ADD_CUSTOM_ARGS, this.onAddCustomArgs, constants.DEL_CUSTOM_ARGS, this.onDelCustomArgs, constants.UPD_CUSTOM_ARGS, this.onUpdCustomArgs, constants.ADD_SEND_AT, this.onAddSendAt, constants.DEL_SEND_AT, this.onDelSendAt, constants.UPD_SEND_AT, this.onUpdSendAt, constants.ADD_BATCH_ID, this.onAddBatchId, constants.DEL_BATCH_ID, this.onDelBatchId, constants.UPD_BATCH_ID, this.onUpdBatchId, constants.ADD_ASM, this.onAddAsm, constants.DEL_ASM, this.onDelAsm, constants.UPD_GROUP_ID, this.onUpdGroupId, constants.ADD_GROUPS_TO_DISPLAY, this.onAddGroupsToDisplay, constants.DEL_GROUPS_TO_DISPLAY, this.onDelGroupsToDisplay, constants.UPD_GROUPS_TO_DISPLAY, this.onUpdGroupsToDisplay, constants.ADD_IP_POOL_NAME, this.onAddIpPoolName, constants.DEL_IP_POOL_NAME, this.onDelIpPoolName, constants.UPD_IP_POOL_NAME, this.onUpdIpPoolName, constants.ADD_BCC, this.onAddBcc, constants.DEL_BCC, this.onDelBcc, constants.UPD_BCC_ENABLE, this.onUpdBccEnable, constants.UPD_BCC_EMAIL, this.onUpdBccEmail, constants.ADD_BYPASS_LIST_MANAGEMENT, this.onAddBypassListManagement, constants.DEL_BYPASS_LIST_MANAGEMENT, this.onDelBypassListManagement, constants.UPD_BYPASS_LIST_MANAGEMENT_ENABLE, this.onUpdBypassListManagementEnable, constants.ADD_FOOTER, this.onAddFooter, constants.DEL_FOOTER, this.onDelFooter, constants.UPD_FOOTER_ENABLE, this.onUpdFooterEnable, constants.UPD_FOOTER_TEXT, this.onUpdFooterText, constants.UPD_FOOTER_HTML, this.onUpdFooterHtml, constants.SEND_MAIL, this.onSendMail, constants.SEND_MAIL_SUCCESS, this.onSendMailSuccess, constants.SEND_MAIL_FAIL, this.onSendMailFail, constants.TOGGLE_SHOW_EVENT, this.onToggleShowEvent, constants.ADD_EVENTS, this.onAddEvents);
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
	    this.mailData.attachments.splice(payload.index, 1);
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
	    this.mailData.sections.splice(payload.index, 1);
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
	    this.mailData.headers.splice(payload.index, 1);
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
	    this.mailData.categories.splice(payload.index, 1);
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
	    this.mailData.custom_args.splice(payload.index, 1);
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
	    this.mailData.asm.groups_to_display.splice(payload.index, 1);
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

	  onAddBcc: function () {
	    this.mailData.mail_settings.bcc = { enable: false, email: "" };
	    this.emit("change");
	  },
	  onDelBcc: function () {
	    this.mailData.mail_settings.bcc = null;
	    this.emit("change");
	  },
	  onUpdBccEnable: function (payload) {
	    this.mailData.mail_settings.bcc.enable = payload.value;
	    this.emit("change");
	  },
	  onUpdBccEmail: function (payload) {
	    this.mailData.mail_settings.bcc.email = payload.value;
	    this.emit("change");
	  },

	  onAddBypassListManagement: function () {
	    this.mailData.mail_settings.bypass_list_management = { enable: false };
	    this.emit("change");
	  },
	  onDelBypassListManagement: function () {
	    this.mailData.mail_settings.bypass_list_management = null;
	    this.emit("change");
	  },
	  onUpdBypassListManagementEnable: function (payload) {
	    this.mailData.mail_settings.bypass_list_management.enable = payload.value;
	    this.emit("change");
	  },

	  onAddFooter: function () {
	    this.mailData.mail_settings.footer = { enable: false, text: "", html: "" };
	    this.emit("change");
	  },
	  onDelFooter: function () {
	    this.mailData.mail_settings.footer = null;
	    this.emit("change");
	  },
	  onUpdFooterEnable: function (payload) {
	    this.mailData.mail_settings.footer.enable = payload.value;
	    this.emit("change");
	  },
	  onUpdFooterText: function (payload) {
	    this.mailData.mail_settings.footer.text = payload.value;
	    this.emit("change");
	  },
	  onUpdFooterHtml: function (payload) {
	    this.mailData.mail_settings.footer.html = payload.value;
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
/* 25 */
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
	  ADD_BCC: "ADD_BCC",
	  DEL_BCC: "DEL_BCC",
	  UPD_BCC_ENABLE: "UPD_BCC_ENABLE",
	  UPD_BCC_EMAIL: "UPD_BCC_EMAIL",
	  ADD_BYPASS_LIST_MANAGEMENT: "ADD_BYPASS_LIST_MANAGEMENT",
	  DEL_BYPASS_LIST_MANAGEMENT: "DEL_BYPASS_LIST_MANAGEMENT",
	  UPD_BYPASS_LIST_MANAGEMENT_ENABLE: "UPD_BYPASS_LIST_MANAGEMENT_ENABLE",
	  ADD_FOOTER: "ADD_FOOTER",
	  DEL_FOOTER: "DEL_FOOTER",
	  UPD_FOOTER_ENABLE: "UPD_FOOTER_ENABLE",
	  UPD_FOOTER_TEXT: "UPD_FOOTER_TEXT",
	  UPD_FOOTER_HTML: "UPD_FOOTER_HTML",

	  SEND_MAIL: "SEND_MAIL",
	  SEND_MAIL_SUCCESS: "SEND_MAIL_SUCCESS",
	  SEND_MAIL_FAIL: "SEND_MAIL_FAIL",
	  TOGGLE_SHOW_EVENT: "TOGGLE_SHOW_EVENT",
	  ADD_EVENTS: "ADD_EVENTS"
	};

	module.exports = constants;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var constants = __webpack_require__(25);
	var DemoboxClient = __webpack_require__(27);

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

	  addBcc: function () {
	    this.dispatch(constants.ADD_BCC);
	  },
	  delBcc: function () {
	    this.dispatch(constants.DEL_BCC);
	  },
	  updBccEnable: function (value) {
	    this.dispatch(constants.UPD_BCC_ENABLE, { value: value });
	  },
	  updBccEmail: function (value) {
	    this.dispatch(constants.UPD_BCC_EMAIL, { value: value });
	  },

	  addBypassListManagement: function () {
	    this.dispatch(constants.ADD_BYPASS_LIST_MANAGEMENT);
	  },
	  delBypassListManagement: function () {
	    this.dispatch(constants.DEL_BYPASS_LIST_MANAGEMENT);
	  },
	  updBypassListManagementEnable: function (value) {
	    this.dispatch(constants.UPD_BYPASS_LIST_MANAGEMENT_ENABLE, { value: value });
	  },

	  addFooter: function () {
	    this.dispatch(constants.ADD_FOOTER);
	  },
	  delFooter: function () {
	    this.dispatch(constants.DEL_FOOTER);
	  },
	  updFooterEnable: function (value) {
	    this.dispatch(constants.UPD_FOOTER_ENABLE, { value: value });
	  },
	  updFooterText: function (value) {
	    this.dispatch(constants.UPD_FOOTER_TEXT, { value: value });
	  },
	  updFooterHtml: function (value) {
	    this.dispatch(constants.UPD_FOOTER_HTML, { value: value });
	  },

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
/* 27 */
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
	    }
	    mailData2.sections = this.array2hash(mailData.sections);
	    mailData2.headers = this.array2hash(mailData.headers);
	    mailData2.custom_args = this.array2hash(mailData.custom_args);

	    console.log(JSON.stringify(mailData));
	    this.removeEmpty(mailData2);

	    var requestParam = JSON.stringify(mailData2);
	    console.log(requestParam);
	    return requestParam;
	  },

	  array2hash: function (array) {
	    var hash = {};
	    for (var j = 0; j < array.length; j++) {
	      hash[array[j].key] = array[j].value;
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
	        // delete property if the property value is null,[],{}
	        if (element[key] === null || _.isObject(element[key]) && _.isEmpty(element[key])) {
	          delete element[key];
	        } else {
	          this.removeEmpty(element[key]);
	        }
	      }.bind(this));
	    }
	  }
	};

	module.exports = DemoboxClient;

/***/ },
/* 28 */
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

	  getInitialState: function () {
	    return {};
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
	    console.log(this.props.data);
	    if (this.props.data === null) {
	      add = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd },
	        React.createElement("span", { className: "glyphicon glyphicon-plus" })
	      );
	    } else {
	      items = this.props.data.groups_to_display.map(function (data, index) {
	        return React.createElement(SimpleTextItem, {
	          index: index,
	          value: data,
	          placeholder: "groups_to_display",
	          handleDel: this.handleDelGroupsToDisplay,
	          handleUpd: this.handleUpdGroupsToDisplay });
	      }.bind(this));
	      form = React.createElement(
	        "div",
	        { className: "wrapper" },
	        React.createElement(
	          "div",
	          { className: "fixed" },
	          React.createElement(
	            "a",
	            { href: "javascript:void(0)", onClick: this.props.handleDel,
	              className: "removeIcon" },
	            React.createElement("span", { className: "glyphicon glyphicon-remove" })
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "flex" },
	          React.createElement(
	            "div",
	            { className: "wrapper" },
	            React.createElement("input", { type: "text",
	              name: "group_id",
	              className: "form-control",
	              placeholder: "group_id",
	              defaultValue: this.props.data.group_id,
	              onChange: this.handleUpdGroupId })
	          ),
	          React.createElement(
	            "div",
	            null,
	            items
	          ),
	          React.createElement(
	            "a",
	            { href: "javascript:void(0)", onClick: this.handleAddGroupsToDisplay },
	            React.createElement("span", { className: "glyphicon glyphicon-plus" })
	          )
	        )
	      );
	    }
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        "asm"
	      ),
	      React.createElement(
	        "div",
	        null,
	        form
	      ),
	      add
	    );
	  }
	});
	module.exports = AsmForm;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var BccForm = __webpack_require__(30);
	var BypassListManagementForm = __webpack_require__(31);
	var FooterForm = __webpack_require__(32);

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

	  handleAddBcc: function () {
	    this.getFlux().actions.addBcc();
	  },
	  handleDelBcc: function () {
	    this.getFlux().actions.delBcc();
	  },

	  handleAddBypassListManagement: function () {
	    this.getFlux().actions.addBypassListManagement();
	  },
	  handleDelBypassListManagement: function () {
	    this.getFlux().actions.delBypassListManagement();
	  },

	  handleAddFooter: function () {
	    this.getFlux().actions.addFooter();
	  },
	  handleDelFooter: function () {
	    this.getFlux().actions.delFooter();
	  },

	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'label',
	        { className: 'control-label' },
	        'mail_settings'
	      ),
	      React.createElement(
	        'div',
	        { className: 'wrapper' },
	        React.createElement('div', { className: 'fixed' }),
	        React.createElement(
	          'div',
	          { className: 'flex' },
	          React.createElement(BccForm, {
	            data: this.state.mail_settings.bcc,
	            handleAdd: this.handleAddBcc,
	            handleDel: this.handleDelBcc }),
	          React.createElement(BypassListManagementForm, {
	            data: this.state.mail_settings.bypass_list_management,
	            handleAdd: this.handleAddBypassListManagement,
	            handleDel: this.handleDelBypassListManagement }),
	          React.createElement(FooterForm, {
	            data: this.state.mail_settings.footer,
	            handleAdd: this.handleAddFooter,
	            handleDel: this.handleDelFooter })
	        )
	      )
	    );
	  }
	});
	module.exports = MailSettingsForm;

/***/ },
/* 30 */
/***/ function(module, exports) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var BccForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired
	  },

	  getStateFromFlux: function () {
	    return {};
	  },

	  handleUpdEnable: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updBccEnable(e.target.value == 'true');
	  },

	  handleUpdEmail: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updBccEmail(e.target.value);
	  },

	  render: function () {
	    var add;
	    var del;
	    if (this.props.data === null) {
	      add = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd },
	        React.createElement("span", { className: "glyphicon glyphicon-plus" })
	      );
	    } else {
	      var form = React.createElement(
	        "div",
	        { className: "flex" },
	        React.createElement(
	          "select",
	          { className: "form-control",
	            value: this.props.data.enable,
	            onChange: this.handleUpdEnable },
	          React.createElement(
	            "option",
	            { value: "false" },
	            "false"
	          ),
	          React.createElement(
	            "option",
	            { value: "true" },
	            "true"
	          )
	        ),
	        React.createElement("input", { type: "text",
	          name: "email",
	          className: "form-control",
	          placeholder: "email",
	          defaultValue: this.props.data.email,
	          onChange: this.handleUpdEmail })
	      );
	      del = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleDel,
	          className: "removeIcon" },
	        React.createElement("span", { className: "glyphicon glyphicon-remove" })
	      );
	    }
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        "bcc"
	      ),
	      React.createElement(
	        "div",
	        { className: "wrapper" },
	        React.createElement(
	          "div",
	          { className: "fixed" },
	          del
	        ),
	        form
	      ),
	      add
	    );
	  }
	});
	module.exports = BccForm;

/***/ },
/* 31 */
/***/ function(module, exports) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var BypassListManagementForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired
	  },

	  getStateFromFlux: function () {
	    return {};
	  },

	  handleUpdEnable: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updBypassListManagementEnable(e.target.value == 'true');
	  },

	  render: function () {
	    var add;
	    var del;
	    if (this.props.data === null) {
	      add = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd },
	        React.createElement("span", { className: "glyphicon glyphicon-plus" })
	      );
	    } else {
	      var form = React.createElement(
	        "div",
	        { className: "flex" },
	        React.createElement(
	          "select",
	          { className: "form-control",
	            value: this.props.data.enable,
	            onChange: this.handleUpdEnable },
	          React.createElement(
	            "option",
	            { value: "false" },
	            "false"
	          ),
	          React.createElement(
	            "option",
	            { value: "true" },
	            "true"
	          )
	        )
	      );
	      del = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleDel,
	          className: "removeIcon" },
	        React.createElement("span", { className: "glyphicon glyphicon-remove" })
	      );
	    }
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        "bypass_list_management"
	      ),
	      React.createElement(
	        "div",
	        { className: "wrapper" },
	        React.createElement(
	          "div",
	          { className: "fixed" },
	          del
	        ),
	        form
	      ),
	      add
	    );
	  }
	});
	module.exports = BypassListManagementForm;

/***/ },
/* 32 */
/***/ function(module, exports) {

	var FluxMixin = Fluxxor.FluxMixin(React);
	var StoreWatchMixin = Fluxxor.StoreWatchMixin;

	var FooterForm = React.createClass({
	  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

	  propTypes: {
	    data: React.PropTypes.array.isRequired,
	    handleAdd: React.PropTypes.func.isRequired,
	    handleDel: React.PropTypes.func.isRequired
	  },

	  getStateFromFlux: function () {
	    return {};
	  },

	  handleUpdEnable: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updFooterEnable(e.target.value == 'true');
	  },

	  handleUpdText: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updFooterText(e.target.value);
	  },

	  handleUpdHtml: function (e) {
	    e.preventDefault();
	    this.getFlux().actions.updFooterHtml(e.target.value);
	  },

	  render: function () {
	    var add;
	    var del;
	    if (this.props.data === null) {
	      add = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleAdd },
	        React.createElement("span", { className: "glyphicon glyphicon-plus" })
	      );
	    } else {
	      var form = React.createElement(
	        "div",
	        { className: "flex" },
	        React.createElement(
	          "select",
	          { className: "form-control",
	            value: this.props.data.enable,
	            onChange: this.handleUpdEnable },
	          React.createElement(
	            "option",
	            { value: "false" },
	            "false"
	          ),
	          React.createElement(
	            "option",
	            { value: "true" },
	            "true"
	          )
	        ),
	        React.createElement("input", { type: "text",
	          name: "text",
	          className: "form-control",
	          placeholder: "text",
	          defaultValue: this.props.data.text,
	          onChange: this.handleUpdText }),
	        React.createElement("input", { type: "text",
	          name: "html",
	          className: "form-control",
	          placeholder: "html",
	          defaultValue: this.props.data.html,
	          onChange: this.handleUpdHtml })
	      );
	      del = React.createElement(
	        "a",
	        { href: "javascript:void(0)", onClick: this.props.handleDel,
	          className: "removeIcon" },
	        React.createElement("span", { className: "glyphicon glyphicon-remove" })
	      );
	    }
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "label",
	        { className: "control-label" },
	        "footer"
	      ),
	      React.createElement(
	        "div",
	        { className: "wrapper" },
	        React.createElement(
	          "div",
	          { className: "fixed" },
	          del
	        ),
	        form
	      ),
	      add
	    );
	  }
	});
	module.exports = FooterForm;

/***/ }
/******/ ]);