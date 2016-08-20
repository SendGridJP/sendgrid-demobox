var Root = React.createClass({
  _onSelectPage: function(pageId) {
    this.setState({activePage: pageId});
  },
  getInitialState: function() {
    return {activePage: 'send'};
  },
  render: function() {
    return (
      <div className="Root">
        <Header
          activePage={this.state.activePage}
          onSelectPage={this._onSelectPage} />
        <Article activePage={this.state.activePage} />
      </div>
    );
  }
});

var Header = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string.isRequired,
    onSelectPage: React.PropTypes.func.isRequired
  },
  _onSelectPage: function(pageId) {
    this.props.onSelectPage(pageId);
  },
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <button
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".target">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="">DemoBox</a>
        </div>

        <div className="collapse navbar-collapse target">
          <LeftMenu
            activePage={this.props.activePage}
            onSelectPage={this._onSelectPage} />
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="https://sendgrid.com/account/overview" target="_blank">
                sendgrid.com
              </a>
            </li>
            <li>
              <a href="https://sendgrid.com/statistics" target="_blank">
                Statistics
              </a>
            </li>
            <li>
              <a href="https://sendgrid.com/templates" target="_blank">
                Templates
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});

var LeftMenu = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string.isRequired,
    onSelectPage: React.PropTypes.func.isRequired
  },
  _onSelectPage: function(pageId) {
    this.props.onSelectPage(pageId);
  },
  render: function() {
    return(
      <ul className="nav navbar-nav">
        <LeftMenuItem
          pageId="send"
          activePage={this.props.activePage}
          href=""
          text="メールを送る"
          onSelectPage={this._onSelectPage} />
        <LeftMenuItem
          pageId="receive"
          activePage={this.props.activePage}
          href=""
          text="メールを受ける"
          onSelectPage={this._onSelectPage} />
      </ul>
    );
  }
});

var LeftMenuItem = React.createClass({
  propTypes: {
    pageId: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    activePage: React.PropTypes.string.isRequired,
    onSelectPage: React.PropTypes.func.isRequired
  },
  _onSelectPage: function() {
    this.props.onSelectPage(this.props.pageId);
  },
  getActive: function(pageId, activePage) {
    if (pageId === activePage) return 'active';
    else return '';
  },
  render: function() {
    return(
      <li
        id={this.props.pageId}
        className={this.getActive(this.props.pageId, this.props.activePage)}>
        <a href="#" className="subtree-name"
          onClick={this._onSelectPage}>{this.props.text}</a>
      </li>
    );
  }
});

var Article = React.createClass({
  propTypes: {
    activePage: React.PropTypes.string.isRequired
  },
  render: function() {
    if (this.props.activePage === 'send') {
      return (
        <SendPage />
      );
    } else if (this.props.activePage === 'receive') {
      return (
        <ReceivePage />
      );
    }
  }
});

var SendPage = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3">
            <SendForm />
          </div>

          <div className="col-md-9">

            <div className="btn-toolbar">
              <div className="btn-group" data-toggle="buttons-radio">
                <button className="btn btn-default" id="show-table">Table</button>
                <button className="btn btn-default active" id="show-json">JSON</button>
              </div>
            </div>

            <table className="table table-striped table-bordered table-condensed" id="event-table">
              <thead>
                <tr>
                  <th><small>timestamp</small></th>
                  <th><small>event</small></th>
                  <th><small>email</small></th>
                  <th><small>smtp-id</small></th>
                  <th><small>response</small></th>
                  <th><small>sg_event_id</small></th>
                  <th><small>sg_message_id</small></th>
                  <th><small>useragent</small></th>
                  <th><small>ip</small></th>
                  <th><small>attempt</small></th>
                  <th><small>category</small></th>
                  <th><small>url</small></th>
                  <th><small>status</small></th>
                  <th><small>reason</small></th>
                  <th><small>type</small></th>
                  <th><small>send_at</small></th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>

            <table className="table table-striped table-bordered table-condensed" id="event-json">
              <thead>
                <tr><th><small>JSON</small></th></tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
});

var SendForm = React.createClass({
  _onSelectSend: function() {
    var form = $('#param');
    var param = {};
    $(form.serializeArray()).each(function(i, v) {
      param[v.name] = v.value;
    });
    console.log(param);
    $.post(
      "/send",
      JSON.stringify(param),
      function(data) {
        console.log('送信完了');
        // $("#send").removeClass("btn-default");
        // $("#send").addClass("btn-primary");
        // $("#send").text("送信");
        // $("#result").html(data);
      }
    );
  },
  render: function() {
    return (
      <div>

        <form id="param" className="form-horizontal">

          <PersonalizationList />

          <div className="form-group">
            <div className="col-md-12">
              <label className="control-label">
                <span className="text-danger">*</span>From
              </label>
              <EmailForm
                index={0}
                paramName="from"
                placeholderEmail="from@example.com"
                valueEmail="from@example.com"
                placeholderName="From Name"
                valueName="From Name" />
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-12">
              <label className="control-label">
                Reply-to
              </label>
              <EmailForm
                index={0}
                paramName="reply-to"
                placeholderEmail="reply-to@example.com"
                valueEmail="reply-to@example.com"
                placeholderName="Reply-to Name"
                valueName="Reply-to Name" />
            </div>
          </div>

          <div className="form-group">
            <div className="col-md-12">
              <label className="control-label">
                <span className="text-danger">*</span>Subject
              </label>
            </div>
            <div className="col-md-12">
              <input type="text" name="subject" className="form-control"
                placeholder="-name-さんへ　テストメール"
                defaultValue="-name-さんへ　テストメール" />
            </div>
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
          onClick={this._onSelectSend}>
          送信
        </button>

        <div id="result"></div>
      </div>
    );
  }
});

var PersonalizationList = React.createClass({
  render: function() {
    return (
      <div className="form-group">
        <div className="col-md-12">
          <label className="control-label">
            <span className="text-danger">*</span>Personalizations
          </label>

          <div className="col-md-12">
            <label className="control-label">
              <span className="text-danger">*</span>To
            </label>
            <EmailForm
              index={0}
              paramName="personalizations[0].to[0]"
              placeholderEmail="recipient@example.com"
              valueEmail="recipient@example.com"
              placeholderName="To Name"
              valueName="To Name" />
          </div>

          <div className="col-md-12">
            <label className="control-label">Cc</label>
            <EmailForm
              index={0}
              paramName="personalizations[0].cc[0]"
              placeholderEmail="cc@example.com"
              valueEmail="cc@example.com"
              placeholderName="Cc Name"
              valueName="Cc Name" />
          </div>

          <div className="col-md-12">
            <label className="control-label">Bcc</label>
            <EmailForm
              index={0}
              paramName="personalizations[0].bcc[0]"
              placeholderEmail="bcc@example.com"
              valueEmail="bcc@example.com"
              placeholderName="Bcc Name"
              valueName="Bcc Name" />
          </div>

          <div className="col-md-12">
            <label className="control-label">
              <span className="text-danger">*</span>Subject
            </label>
            <div>
              <input type="text" name="personalizations[0].subject"
                className="form-control"
                placeholder="Subject"
                defaultValue="これは件名です" />
            </div>
          </div>

          <div className="col-md-12">
            <label className="control-label">Headers</label>
            <div className="row">
              <div className="col-md-6">
                <input type="text" name="personalizations[0].headers[0].key"
                  className="form-control"
                  placeholder="header-key" />
              </div>
              <div className="col-md-6">
                <input type="text" name="personalizations[0].headers[0].value"
                  className="form-control"
                  placeholder="header-value" />
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <label className="control-label">Substitutions</label>
            <div className="row">
              <div className="col-md-6">
                <input type="text"
                  name="personalizations[0].substitutions[0].tag"
                  className="form-control" placeholder="substitution-tag" />
              </div>
              <div className="col-md-6">
                <input type="text"
                  name="personalizations[0].substitutions[0].value"
                  className="form-control" placeholder="substitution-value" />
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <label className="control-label">Custom_args</label>
            <div className="row">
              <div className="col-md-6">
                <input type="text"
                  name="personalizations[0].custom_args[0].key"
                  className="form-control" placeholder="custom-args-key" />
              </div>
              <div className="col-md-6">
                <input type="text"
                  name="personalizations[0].custom_args[0].value"
                  className="form-control" placeholder="custom-args-value" />
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <label className="control-label">Send_at</label>
            <div>
              <input type="text" name="personalizations[0].send_at"
                className="form-control" placeholder="12345678" />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var EmailForm = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    paramName: React.PropTypes.string.isRequired,
    placeholderEmail: React.PropTypes.string.isRequired,
    valueEmail: React.PropTypes.string.isRequired,
    placeholderName: React.PropTypes.string.isRequired,
    valueName: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              name={this.props.paramName + '.email'}
              className="form-control"
              placeholder={this.props.placeholderEmail}
              defaultValue={this.props.valueEmail} />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name={this.props.paramName + '.name'}
              className="form-control"
              placeholder={this.props.placeholderName}
              defaultValue={this.props.valueName} />
          </div>
        </div>
      </div>
    );
  }
});

var ReceivePage = React.createClass({
  render: function() {
    return (
      <div>Active page is Receive page</div>
    );
  }
});

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
