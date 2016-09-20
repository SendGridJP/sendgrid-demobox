var EmailForm = require('./email_form.jsx');
var SimpleTextForm = require('./simple_text_form.jsx');
var KeyValueForm = require('./key_value_form.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PersonalizationItem = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  propTypes: {
    index: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {};
  },

  getStateFromFlux: function() {

  },

  handleDelPersonalization: function() {
    this.getFlux().actions.delPersonalization(this.props.index);
  },

  handleAddHeaders: function() {

  },

  render: function() {
    return (
      <div className="">
        <a href="javascript:void(0)" onClick={this.handleDelPersonalization}
          className="removeIcon">
          <span className="glyphicon glyphicon-remove"></span>
        </a>

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
        <div className="col-md-12">
          <a href="javascript:void(0)" onClick={this.handleAddHeaders} className="pull-right">
            <span className="glyphicon glyphicon-plus"></span>
          </a>
        </div>

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
    );
  }
});
module.exports = PersonalizationItem;
