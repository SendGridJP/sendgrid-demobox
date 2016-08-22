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
    getInitialState: function() {
      return {
        status: '',
        request: '',
        responseCode: '',
        responseBody: ''
      };
    },
    _onSelectSend: function() {
      var form = $('#param');
      var param = {};
      $(form.serializeArray()).each(function(i, v) {
        param[v.name] = v.value;
      });
      console.log(param);
      this.setState({
        status: '送信中...', request: '', responseCode: '', responseBody: ''
      });
      $.ajax({
        url: '/send',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(param),
        success: function(data) {
          this.setState({
            status: '送信完了',
            request: data.request,
            responseCode: data.responseCode,
            responseBody: data.responseBody,
          });
        }.bind(this),
        error: function(xhr, status, err) {
          this.setState({result: err.toString()});
          console.error('/send', status, err.toString());
        }.bind(this)
      });
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
            onClick={this._onSelectSend}>
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

var PersonalizationList = React.createClass({
  render: function() {
    return (
      <div className="form-group">
        <div className="col-md-12">
          <label className="control-label">
            <span className="text-danger">*</span>Personalizations
          </label>

          <EmailForm
            title="To"
            required={true}
            index={0}
            paramName="personalizations[0].to[0]"
            placeholderEmail="recipient@example.com"
            valueEmail="recipient@example.com"
            placeholderName="To Name"
            valueName="To Name" />

          <EmailForm
            title="Cc"
            required={false}
            index={0}
            paramName="personalizations[0].cc[0]"
            placeholderEmail="cc@example.com"
            valueEmail="cc@example.com"
            placeholderName="Cc Name"
            valueName="Cc Name" />

          <EmailForm
            title="Bcc"
            required={false}
            index={0}
            paramName="personalizations[0].bcc[0]"
            placeholderEmail="bcc@example.com"
            valueEmail="bcc@example.com"
            placeholderName="Bcc Name"
            valueName="Bcc Name" />

          <SimpleTextForm
            title="Subject"
            required={true}
            index={0}
            paramName="personalizations[0].subject"
            placeholder="Subject"
            value="これは件名です" />

          <KeyValueForm
            title="Headers"
            required={false}
            index={0}
            paramName="personalizations[0].headers[0]"
            placeholderKey="header-key"
            valueKey="header-key"
            placeholderValue="header-value"
            valueValue="header-value" />

          <KeyValueForm
            title="Substitutions"
            required={false}
            index={0}
            paramName="personalizations[0].substitutions[0]"
            placeholderKey="substitution-key"
            valueKey="substitution-key"
            placeholderValue="substitution-value"
            valueValue="substitution-value" />

          <KeyValueForm
            title="Custom_args"
            required={false}
            index={0}
            paramName="personalizations[0].custom_args[0]"
            placeholderKey="custom-args-key"
            valueKey="custom-args-key"
            placeholderValue="custom-args-value"
            valueValue="custom-args-value" />

          <SimpleTextForm
            title="Send_at"
            required={false}
            index={0}
            paramName="personalizations[0].send_at"
            placeholder="12345678"
            value="12345678" />
        </div>
      </div>
    );
  }
});

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
  getInitialState: function() {
    return {
      disabled: true
    };
  },
  _onChangeUse: function(e) {
    this.setState({disabled: !e.target.checked});
  },
  _getDisabled: function() {
    if (this.props.required) {
      return false;
    } else {
      return this.state.disabled;
    }
  },
  render: function() {
    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    } else {
      rq = <input type="checkbox" onChange={this._onChangeUse} />;
    }
    return (
      <div className="col-md-12">
        <label className="control-label">{rq}{this.props.title}</label>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              name={this.props.paramName + '.email'}
              className="form-control"
              placeholder={this.props.placeholderEmail}
              defaultValue={this.props.valueEmail}
              disabled={this._getDisabled()} />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name={this.props.paramName + '.name'}
              className="form-control"
              placeholder={this.props.placeholderName}
              defaultValue={this.props.valueName}
              disabled={this._getDisabled()} />
          </div>
        </div>
      </div>
    );
  }
});

var KeyValueForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    paramName: React.PropTypes.string.isRequired,
    placeholderKey: React.PropTypes.string.isRequired,
    valueKey: React.PropTypes.string.isRequired,
    placeholderValue: React.PropTypes.string.isRequired,
    valueValue: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      disabled: true
    };
  },
  _onChangeUse: function(e) {
    this.setState({disabled: !e.target.checked});
  },
  _getDisabled: function() {
    if (this.props.required) {
      return false;
    } else {
      return this.state.disabled;
    }
  },
  render: function() {
    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    } else {
      rq = <input type="checkbox" onChange={this._onChangeUse} />;
    }
    return (
      <div className="col-md-12">
        <label className="control-label">{rq}{this.props.title}</label>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              name={this.props.paramName + '.key'}
              className="form-control"
              placeholder={this.props.placeholderKey}
              defaultValue={this.props.valueKey}
              disabled={this._getDisabled()} />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name={this.props.paramName + '.value'}
              className="form-control"
              placeholder={this.props.placeholderValue}
              defaultValue={this.props.valueValue}
              disabled={this._getDisabled()} />
          </div>
        </div>
      </div>
    );
  }
});

var SimpleTextForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    paramName: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      disabled: true
    };
  },
  _onChangeUse: function(e) {
    this.setState({disabled: !e.target.checked});
  },
  _getDisabled: function() {
    if (this.props.required) {
      return false;
    } else {
      return this.state.disabled;
    }
  },
  render: function() {
    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    } else {
      rq = <input type="checkbox" onChange={this._onChangeUse} />;
    }
    return (
      <div className="col-md-12">
        <label className="control-label">{rq}{this.props.title}</label>
        <input
          type="text"
          name={this.props.paramName}
          className="form-control"
          placeholder={this.props.placeholder}
          defaultValue={this.props.value}
          disabled={this._getDisabled()} />
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
