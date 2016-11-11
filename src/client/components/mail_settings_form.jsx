var MailSettingsItem = require('./mail_settings_item.jsx');
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
            <MailSettingsItem
              data={this.state.mail_settings}
              parent="bcc" />

            <MailSettingsItem
              data={this.state.mail_settings}
              parent="bypass_list_management" />

            <MailSettingsItem
              data={this.state.mail_settings}
              parent="footer" />

            <MailSettingsItem
              data={this.state.mail_settings}
              parent="sandbox_mode" />

            <MailSettingsItem
              data={this.state.mail_settings}
              parent="spam_check" />
          </div>
        </div>
      </div>
    );
  }
});
module.exports = MailSettingsForm;
