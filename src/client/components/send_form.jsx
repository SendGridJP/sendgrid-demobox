var PersonalizationForm = require('./personalization_form.jsx');
var EmailForm = require('./email_form.jsx');
var SimpleTextForm = require('./simple_text_form.jsx');
var ContentForm = require('./content_form.jsx');
var AttachmentForm = require('./attachment_form.jsx');
var KeyValueForm = require('./key_value_form.jsx');
var AsmForm = require('./asm_form.jsx');
var MailSettingsForm = require('./mail_settings_form.jsx');
var TrackingSettingsForm = require('./tracking_settings_form.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SendForm = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

    componentDidMount: function() {
      this.getFlux().actions.getSendInit();
    },

    getStateFromFlux: function() {
      var store = this.getFlux().store("DemoboxStore");
      return {
        status: store.status,
        request: store.request,
        responseCode: store.responseCode,
        responseBody: store.responseBody,
        mailData: store.mailData,
      }
    },

    handleUpdFrom: function(id, key, value) {
      this.getFlux().actions.updFrom(key, value);
    },

    handleAddReplyto: function() {
      this.getFlux().actions.addReplyto();
    },
    handleDelReplyto: function() {
      this.getFlux().actions.delReplyto();
    },
    handleUpdReplyto: function(id, key, value) {
      this.getFlux().actions.updReplyto(key, value);
    },

    handleAddSubject: function() {
      this.getFlux().actions.addSubject();
    },
    handleDelSubject: function() {
      this.getFlux().actions.delSubject();
    },
    handleUpdSubject: function(parentIndex, value) {
      this.getFlux().actions.updSubject(value);
    },

    handleAddContent: function() {
      this.getFlux().actions.addContent();
    },
    handleDelContent: function(type) {
      this.getFlux().actions.delContent(type);
    },
    handleUpdContent: function(type, value) {
      this.getFlux().actions.updContent(type, value);
    },

    handleAddAttachment: function() {
      this.getFlux().actions.addAttachment();
    },
    handleDelAttachment: function() {
      this.getFlux().actions.delAttachment();
    },
    handleUpdAttachment: function(index, key, value) {
      this.getFlux().actions.updAttachment(index, key, value);
    },

    handleAddTemplateId: function() {
      this.getFlux().actions.addTemplateId();
    },
    handleDelTemplateId: function() {
      this.getFlux().actions.delTemplateId();
    },
    handleUpdTemplateId: function(parentIndex, value) {
      this.getFlux().actions.updTemplateId(value);
    },

    handleAddSections: function() {
      this.getFlux().actions.addSections();
    },
    handleDelSections: function(index) {
      this.getFlux().actions.delSections(index);
    },
    handleUpdSections: function(index, key, value) {
      this.getFlux().actions.updSections(index, key, value);
    },

    handleAddHeaders: function() {
      this.getFlux().actions.addHeaders();
    },
    handleDelHeaders: function(index) {
      this.getFlux().actions.delHeaders(index);
    },
    handleUpdHeaders: function(index, key, value) {
      this.getFlux().actions.updHeaders(index, key, value);
    },

    handleAddCategories: function() {
      this.getFlux().actions.addCategories();
    },
    handleDelCategories: function(index) {
      this.getFlux().actions.delCategories(index);
    },
    handleUpdCategories: function(index, value) {
      this.getFlux().actions.updCategories(index, value);
    },

    handleAddCustomArgs: function() {
      this.getFlux().actions.addCustomArgs();
    },
    handleDelCustomArgs: function(index) {
      this.getFlux().actions.delCustomArgs(index);
    },
    handleUpdCustomArgs: function(index, key, value) {
      this.getFlux().actions.updCustomArgs(index, key, value);
    },

    handleAddSendAt: function() {
      this.getFlux().actions.addSendAt();
    },
    handleDelSendAt: function() {
      this.getFlux().actions.delSendAt();
    },
    handleUpdSendAt: function(parentIndex, value) {
      this.getFlux().actions.updSendAt(value);
    },

    handleAddBatchId: function() {
      this.getFlux().actions.addBatchId();
    },
    handleDelBatchId: function() {
      this.getFlux().actions.delBatchId();
    },
    handleUpdBatchId: function(parentIndex, value) {
      this.getFlux().actions.updBatchId(value);
    },

    handleAddAsm: function() {
      this.getFlux().actions.addAsm();
    },
    handleDelAsm: function() {
      this.getFlux().actions.delAsm();
    },

    handleAddIpPoolName: function() {
      this.getFlux().actions.addIpPoolName();
    },
    handleDelIpPoolName: function() {
      this.getFlux().actions.delIpPoolName();
    },
    handleUpdIpPoolName: function(parentIndex, value) {
      this.getFlux().actions.updIpPoolName(value);
    },

    handleSendMail: function(e) {
      e.preventDefault();
      this.getFlux().actions.sendMail(this.state.mailData);
    },

    render: function() {
      return (
        <div>

          <form id="param" className="form-horizontal">

            <PersonalizationForm />

            <EmailForm
              title="from"
              required={true}
              data={this.state.mailData.from}
              handleUpd={this.handleUpdFrom}
              max={1} />

            <EmailForm
              title="reply-to"
              required={false}
              data={this.state.mailData["reply-to"]}
              handleAdd={this.handleAddReplyto}
              handleDel={this.handleDelReplyto}
              handleUpd={this.handleUpdReplyto}
              max={1} />

            <SimpleTextForm
              title="subject"
              required={false}
              placeholder="subject"
              value={this.state.mailData.subject}
              handleAdd={this.handleAddSubject}
              handleDel={this.handleDelSubject}
              handleUpd={this.handleUpdSubject}
              max={1} />

            <ContentForm
              data={this.state.mailData.content}
              handleAdd={this.handleAddContent}
              handleDel={this.handleDelContent}
              handleUpd={this.handleUpdContent} />

            <AttachmentForm
              data={this.state.mailData.attachments}
              handleAdd={this.handleAddAttachment}
              handleDel={this.handleDelAttachment}
              handleUpd={this.handleUpdAttachment}
              />

            <SimpleTextForm
              title="template_id"
              required={false}
              placeholder="Template ID"
              value={this.state.mailData.template_id}
              handleAdd={this.handleAddTemplateId}
              handleDel={this.handleDelTemplateId}
              handleUpd={this.handleUpdTemplateId}
              max={1} />

            <KeyValueForm
              title="sections"
              required={false}
              data={this.state.mailData.sections}
              handleAdd={this.handleAddSections}
              handleDel={this.handleDelSections}
              handleUpd={this.handleUpdSections} />

            <KeyValueForm
              title="headers"
              required={false}
              data={this.state.mailData.headers}
              handleAdd={this.handleAddHeaders}
              handleDel={this.handleDelHeaders}
              handleUpd={this.handleUpdHeaders} />

            <SimpleTextForm
              title="categories"
              required={false}
              placeholder="categories"
              value={this.state.mailData.categories}
              handleAdd={this.handleAddCategories}
              handleDel={this.handleDelCategories}
              handleUpd={this.handleUpdCategories}
              max={255} />

            <KeyValueForm
              title="custom_args"
              required={false}
              data={this.state.mailData.custom_args}
              handleAdd={this.handleAddCustomArgs}
              handleDel={this.handleDelCustomArgs}
              handleUpd={this.handleUpdCustomArgs} />

            <SimpleTextForm
              title="send_at"
              required={false}
              placeholder="UNIXTIME"
              value={this.state.mailData.send_at}
              handleAdd={this.handleAddSendAt}
              handleDel={this.handleDelSendAt}
              handleUpd={this.handleUpdSendAt}
              max={1} />

            <SimpleTextForm
              title="batch_id"
              required={false}
              placeholder="Batch ID"
              value={this.state.mailData.batch_id}
              handleAdd={this.handleAddBatchId}
              handleDel={this.handleDelBatchId}
              handleUpd={this.handleUpdBatchId}
              max={1} />

            <AsmForm
              data={this.state.mailData.asm}
              handleAdd={this.handleAddAsm}
              handleDel={this.handleDelAsm} />

            <SimpleTextForm
              title="ip_pool_name"
              required={false}
              placeholder="IP pool name"
              value={this.state.mailData.ip_pool_name}
              handleAdd={this.handleAddIpPoolName}
              handleDel={this.handleDelIpPoolName}
              handleUpd={this.handleUpdIpPoolName}
              max={1} />

            <MailSettingsForm />

            <TrackingSettingsForm />
          </form>

          <button
            id="send"
            className="btn btn-primary center-block"
            onClick={this.handleSendMail}>
            送信
          </button>
          <div>{this.state.status}</div>
          <div>{this.state.request}</div>
          <div>{this.state.responseCode}</div>
          <div>{this.state.responseBody}</div>
        </div>
      );
    }
});
module.exports = SendForm;
