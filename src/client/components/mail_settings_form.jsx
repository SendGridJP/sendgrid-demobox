var BccForm = require('./bcc_form.jsx');
var BypassListManagementForm = require('./bypass_list_management_form.jsx');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MailSettingsForm = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      mail_settings: store.mailData.mail_settings
    }
  },

  handleAddBcc: function() {
    this.getFlux().actions.addBcc();
  },
  handleDelBcc: function() {
    this.getFlux().actions.delBcc();
  },

  handleAddBypassListManagement: function() {
    this.getFlux().actions.addBypassListManagement();
  },
  handleDelBypassListManagement: function() {
    this.getFlux().actions.delBypassListManagement();
  },

  render: function() {
    return (
      <div>
        <label className="control-label">
          mail_settings
        </label>
        <div className="wrapper">
          <div className="fixed">
          </div>
          <div className="flex">
            <BccForm
              data={this.state.mail_settings.bcc}
              handleAdd={this.handleAddBcc}
              handleDel={this.handleDelBcc} />

            <BypassListManagementForm
              data={this.state.mail_settings.bypass_list_management}
              handleAdd={this.handleAddBypassListManagement}
              handleDel={this.handleDelBypassListManagement} />

          </div>
        </div>
      </div>
    );
  }
});
module.exports = MailSettingsForm;
