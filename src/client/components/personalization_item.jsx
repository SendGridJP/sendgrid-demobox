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
        personalization: store.mailData.personalizations[this.props.index],
        // to: store.mailData.personalizations[this.props.index].to,
        // cc: store.mailData.personalizations[this.props.index].cc,
        // bcc: store.mailData.personalizations[this.props.index].bcc,
        // headers: store.mailData.personalizations[this.props.index].headers,
        // substitutions: store.mailData.personalizations[this.props.index].substitutions,
        // custom_args: store.mailData.personalizations[this.props.index].custom_args
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
  handleDelToInpersonal: function(index) {
    this.getFlux().actions.delToInpersonal(this.props.index, index);
  },
  handleUpdToInpersonal: function(index, key, value) {
    this.getFlux().actions.updToInpersonal(this.props.index, index, key, value);
  },

  handleAddCcInpersonal: function() {
    this.getFlux().actions.addCcInpersonal(this.props.index);
  },
  handleDelCcInpersonal: function(index) {
    this.getFlux().actions.delCcInpersonal(this.props.index, index);
  },
  handleUpdCcInpersonal: function(index, key, value) {
    this.getFlux().actions.updCcInpersonal(this.props.index, index, key, value);
  },

  handleAddBccInpersonal: function() {
    this.getFlux().actions.addBccInpersonal(this.props.index);
  },
  handleDelBccInpersonal: function(index) {
    this.getFlux().actions.delBccInpersonal(this.props.index, index);
  },
  handleUpdBccInpersonal: function(index, key, value) {
    this.getFlux().actions.updBccInpersonal(this.props.index, index, key, value);
  },

  handleAddSubjectInpersonal: function() {
    this.getFlux().actions.addSubjectInpersonal(this.props.index);
  },
  handleDelSubjectInpersonal: function() {
    this.getFlux().actions.delSubjectInpersonal(this.props.index);
  },
  handleUpdSubjectInpersonal: function(parentIndex, value) {
    this.getFlux().actions.updSubjectInpersonal(parentIndex, value);
  },

  handleAddHeaderInpersonal: function() {
    this.getFlux().actions.addHeaderInpersonal(this.props.index);
  },
  handleDelHeaderInpersonal: function(index) {
    this.getFlux().actions.delHeaderInpersonal(this.props.index, index);
  },
  handleUpdHeaderInpersonal: function(index, key, value) {
    this.getFlux().actions.updHeaderInpersonal(this.props.index, index, key, value);
  },

  handleAddSubstitutionInpersonal: function() {
    this.getFlux().actions.addSubstitutionInpersonal(this.props.index);
  },
  handleDelSubstitutionInpersonal: function(index) {
    this.getFlux().actions.delSubstitutionInpersonal(this.props.index, index);
  },
  handleUpdSubstitutionInpersonal: function(index, key, value) {
    this.getFlux().actions.updSubstitutionInpersonal(this.props.index, index, key, value);
  },

  handleAddCustomargInpersonal: function() {
    this.getFlux().actions.addCustomargInpersonal(this.props.index);
  },
  handleDelCustomargInpersonal: function(index) {
    this.getFlux().actions.delCustomargInpersonal(this.props.index, index);
  },
  handleUpdCustomargInpersonal: function(index, key, value) {
    this.getFlux().actions.updCustomargInpersonal(this.props.index, index, key, value);
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
            title="to"
            required={true}
            data={this.state.personalization.to}
            handleAdd={this.handleAddToInpersonal}
            handleDel={this.handleDelToInpersonal}
            handleUpd={this.handleUpdToInpersonal} />

          <EmailForm
            title="cc"
            required={false}
            data={this.state.personalization.cc}
            handleAdd={this.handleAddCcInpersonal}
            handleDel={this.handleDelCcInpersonal}
            handleUpd={this.handleUpdCcInpersonal} />

          <EmailForm
            title="bcc"
            required={false}
            data={this.state.personalization.bcc}
            handleAdd={this.handleAddBccInpersonal}
            handleDel={this.handleDelBccInpersonal}
            handleUpd={this.handleUpdBccInpersonal} />

          <SimpleTextForm
            title="subject"
            required={false}
            placeholder="subject"
            index={this.props.index}
            value={this.state.personalization.subject}
            handleAdd={this.handleAddSubjectInpersonal}
            handleUpd={this.handleUpdSubjectInpersonal}
            handleDel={this.handleDelSubjectInpersonal}
            max={1} />

          <KeyValueForm
            title="headers"
            required={false}
            data={this.state.personalization.headers}
            handleAdd={this.handleAddHeaderInpersonal}
            handleDel={this.handleDelHeaderInpersonal}
            handleUpd={this.handleUpdHeaderInpersonal}
            placeholderKey="header-key"
            placeholderValue="header-value" />

          <KeyValueForm
            title="substitutions"
            required={false}
            data={this.state.personalization.substitutions}
            handleAdd={this.handleAddSubstitutionInpersonal}
            handleDel={this.handleDelSubstitutionInpersonal}
            handleUpd={this.handleUpdSubstitutionInpersonal}
            placeholderKey="substitution-key"
            placeholderValue="substitution-value" />

          <KeyValueForm
            title="custom_args"
            required={false}
            data={this.state.personalization.custom_args}
            handleAdd={this.handleAddCustomargInpersonal}
            handleDel={this.handleDelCustomargInpersonal}
            handleUpd={this.handleUpdCustomargInpersonal}
            placeholderKey="custom-args-key"
            placeholderValue="custom-args-value" />

          <SimpleTextForm
            title="send_at"
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
