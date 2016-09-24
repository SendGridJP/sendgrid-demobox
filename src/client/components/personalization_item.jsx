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
    var store = this.getFlux().store("DemoboxStore");
    var state = {};
    if (store.mailData.personalizations[this.props.index] != null) {
      state = {
        to: store.mailData.personalizations[this.props.index].to,
        cc: store.mailData.personalizations[this.props.index].cc,
        bcc: store.mailData.personalizations[this.props.index].bcc,
        headers: store.mailData.personalizations[this.props.index].headers,
        substitutions: store.mailData.personalizations[this.props.index].substitutions,
        custom_args: store.mailData.personalizations[this.props.index].custom_args
      };
    }
    return state;
  },

  handleDelPersonalization: function() {
    this.getFlux().actions.delPersonalization(this.props.index);
  },

  handleAddToInpersonal: function() {
    this.getFlux().actions.addToInpersonal(this.props.index);
  },
  handleDelToInpersonal: function(parentIndex, index) {
    this.getFlux().actions.delToInpersonal(parentIndex, index);
  },
  handleAddCcInpersonal: function() {
    this.getFlux().actions.addCcInpersonal(this.props.index);
  },
  handleDelCcInpersonal: function(parentIndex, index) {
    this.getFlux().actions.delCcInpersonal(parentIndex, index);
  },
  handleAddBccInpersonal: function() {
    this.getFlux().actions.addBccInpersonal(this.props.index);
  },
  handleDelBccInpersonal: function(parentIndex, index) {
    this.getFlux().actions.delBccInpersonal(parentIndex, index);
  },

  handleAddHeaderInpersonal: function() {
    this.getFlux().actions.addHeaderInpersonal(this.props.index);
  },

  handleDelHeaderInpersonal: function(parentIndex, index) {
    this.getFlux().actions.delHeaderInpersonal(parentIndex, index);
  },

  handleAddSubstitutionInpersonal: function() {
    this.getFlux().actions.addSubstitutionInpersonal(this.props.index);
  },

  handleDelSubstitutionInpersonal: function(parentIndex, index) {
    this.getFlux().actions.delSubstitutionInpersonal(parentIndex, index);
  },

  handleAddCustomargInpersonal: function() {
    this.getFlux().actions.addCustomargInpersonal(this.props.index);
  },

  handleDelCustomargInpersonal: function(parentIndex, index) {
    this.getFlux().actions.delCustomargInpersonal(parentIndex, index);
  },

  render: function() {
    return (
      <div className="wrapper">
        <div className="fixed">
          <a href="javascript:void(0)" onClick={this.handleDelPersonalization}
            className="removeIcon">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
        </div>
        <div className="flex">
          <EmailForm
            title="To"
            required={true}
            index={this.props.index}
            datas={this.state.to}
            handleAdd={this.handleAddToInpersonal}
            handleDel={this.handleDelToInpersonal}
            placeholderEmail="recipient@example.com"
            valueEmail="recipient@example.com"
            placeholderName="To Name"
            valueName="To Name" />

          <EmailForm
            title="Cc"
            required={false}
            index={this.props.index}
            datas={this.state.cc}
            handleAdd={this.handleAddCcInpersonal}
            handleDel={this.handleDelCcInpersonal}
            placeholderEmail="cc@example.com"
            valueEmail="cc@example.com"
            placeholderName="Cc Name"
            valueName="Cc Name" />

          <EmailForm
            title="Bcc"
            required={false}
            index={this.props.index}
            datas={this.state.bcc}
            handleAdd={this.handleAddBccInpersonal}
            handleDel={this.handleDelBccInpersonal}
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
            index={this.props.index}
            datas={this.state.headers}
            handleAdd={this.handleAddHeaderInpersonal}
            handleDel={this.handleDelHeaderInpersonal}
            placeholderKey="header-key"
            valueKey="header-key"
            placeholderValue="header-value"
            valueValue="header-value" />

          <KeyValueForm
            title="Substitutions"
            required={false}
            index={this.props.index}
            datas={this.state.substitutions}
            handleAdd={this.handleAddSubstitutionInpersonal}
            handleDel={this.handleDelSubstitutionInpersonal}
            placeholderKey="substitution-key"
            valueKey="substitution-key"
            placeholderValue="substitution-value"
            valueValue="substitution-value" />

          <KeyValueForm
            title="Custom_args"
            required={false}
            index={this.props.index}
            datas={this.state.custom_args}
            handleAdd={this.handleAddCustomargInpersonal}
            handleDel={this.handleDelCustomargInpersonal}
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
module.exports = PersonalizationItem;
