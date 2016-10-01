var PersonalizationList = require('./personalization_list.jsx');
var EmailForm = require('./email_form.jsx');
var SimpleTextForm = require('./simple_text_form.jsx');
var ContentForm = require('./content_form.jsx');
var AttachmentForm = require('./attachment_form.jsx');
var KeyValueForm = require('./key_value_form.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var SendForm = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

    getInitialState: function() {
      return {};
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

    handleSendMail: function(e) {
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

    render: function() {
      return (
        <div>

          <form id="param" className="form-horizontal">

            <PersonalizationList />

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

            <div id="accordion">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion"
                      href="#collapseOne">
                      <i className="glyphicon glyphicon-chevron-right"></i>
                      オプション
                    </a>
                  </h4>
                </div>
              </div>
              <div id="collapseOne" className="panel-collapse collapse">
                <div className="panel-body">

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Substitution
                      </label>
                      <input type="checkbox" id="usesub" name="usesub" defaultValue="true" />
                    </div>
                    <div className="col-md-12">
                      <input type="text" id="subkey" name="subkey" className="form-control"
                        placeholder="-name-" defaultValue="-name-" disabled="true" />
                    </div>
                    <div className="col-md-12">
                      <input type="text" id="subval" name="subval" className="form-control"
                        placeholder="田中, 鈴木" defaultValue="田中, 鈴木" disabled="true" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Bcc
                      </label>
                      <input type="checkbox" id="usebcc" name="usebcc" defaultValue="true" />
                    </div>
                    <div className="col-md-12">
                      <input type="text" id="bcc" name="bcc" className="form-control"
                        placeholder="bcc@address.com" defaultValue="<%= @bcc %>" disabled="true" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Category
                      </label>
                      <input type="checkbox" id="usecategory" name="usecategory"
                        defaultValue="true" />
                    </div>
                    <div className="col-md-12">
                      <input type="text" id="category" name="category" className="form-control"
                        placeholder="sendgrid-demo" defaultValue="sendgrid-demo" disabled="true" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Unique Args
                      </label>
                      <input type="checkbox" id="useuniqueargs" name="useuniqueargs"
                        defaultValue="true" />
                    </div>
                    <div className="col-md-12">
                      <input type="text" id="uniquekey" name="uniquekey" className="form-control"
                        placeholder="emailtoken" defaultValue="emailtoken" disabled="true" />
                      <input type="text" id="uniqueval" name="uniqueval" className="form-control"
                        placeholder="20140901123456" defaultValue="20140901123456" disabled="true" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Click Tracking
                      </label>
                      <input type="checkbox" id="useclick" name="useclick" defaultValue="true" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Open Tracking
                      </label>
                      <input type="checkbox" id="useopen" name="useopen" defaultValue="true" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Subscription Tracking
                      </label>
                      <input type="checkbox" id="usesubscription" name="usesubscription"
                        defaultValue="true" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Template
                      </label>
                      <input type="checkbox" id="usetemplate" name="usetemplate"
                        defaultValue="true" />
                    </div>
                    <div className="col-md-12">
                      <select className="form-control" id="template" name="template" disabled="true">
                        <option>sendgrid_demo_template_1</option>
                        <option>sendgrid_demo_template_2</option>
                        <option>sendgrid_demo_template_3</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Footer
                      </label>
                      <input type="checkbox" id="usefooter" name="usefooter"
                        defaultValue="true" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-12">
                      <label>
                        Send at timezone
                      </label>
                      <input type="checkbox" id="usesendat" name="usesendat"
                        defaultValue="true" />
                    </div>
                    <div className="col-md-12">
                      <div className="input-group clockpicker" id="clockpicker">
                        <input type="text" name="sendat" className="form-control sendat" defaultValue="<%= @now_time %>" disabled="true" />
                        <span className="input-group-addon">
                          <span className="glyphicon glyphicon-time"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
