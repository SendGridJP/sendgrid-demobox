var PersonalizationList = require('./personalization_list.jsx');
var EmailForm = require('./email_form.jsx');
var SimpleTextForm = require('./simple_text_form.jsx');
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
        responseBody: store.responseBody
      }
    },

    handleSendMail: function(e) {
      e.preventDefault();
      var form = $('#param');
      var param = {};
      $(form.serializeArray()).each(function(i, v) {
        param[v.name] = v.value;
      });
      // console.log(param);
      this.getFlux().actions.sendMail(param);
    },

    render: function() {
      return (
        <div>

          <form id="param" className="form-horizontal">

            <PersonalizationList />

            <div className="form-group">
              <EmailForm
                title="From"
                required={true}
                index={0}
                paramName="from"
                placeholderEmail="from@example.com"
                valueEmail="from@example.com"
                placeholderName="From Name"
                valueName="From Name" />
            </div>

            <div className="form-group">
              <EmailForm
                title="Reply-to"
                required={false}
                index={0}
                paramName="reply-to"
                placeholderEmail="reply-to@example.com"
                valueEmail="reply-to@example.com"
                placeholderName="Reply-to Name"
                valueName="Reply-to Name" />
            </div>

            <div className="form-group">
              <SimpleTextForm
                title="Subject"
                required={true}
                index={0}
                paramName="subject"
                placeholder="-name-さんへ　テストメール"
                value="-name-さんへ　テストメール" />
            </div>

            <div className="form-group">
              <div className="col-md-12">
                <label className="control-label">
                  <span className="text-danger">*</span>Contents
                </label>
              </div>

              <div className="col-md-12" id="content0">
                <label>text/plain</label>
                <input type="hidden" name="content[0].type" defaultValue="text/plain" />
                <textarea name="content[0].value" className="form-control"
                  placeholder="-name-さんへ　TEXT本文" defaultValue="-name-さんへ　TEXT本文 SendGrid https://sendgrid.com">
                </textarea>
              </div>

              <div className="col-md-12" id="content1">
                <label>text/html</label>
                <input type="hidden" name="content[1].type" defaultValue="text/html" />
                <textarea name="content[1].value" className="form-control"
                  placeholder="&lt;p&gt;-name-さんへ　HTML本文&lt;/p&gt;"
                  defaultValue="&lt;p&gt;-name-さんへ　HTML本文&lt;/p&gt;
                  &lt;a href='https://sendgrid.com'&gt;センドグリッド&lt;/a&gt;">
                </textarea>
              </div>
            </div>

            <div className="panel-group" id="accordion">
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
