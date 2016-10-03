var TrackingSettingsItem = require('./tracking_settings_item.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TrackingSettingsForm = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      tracking_settings: store.mailData.tracking_settings
    }
  },

  render: function() {
    return (
      <div>
        <label className="control-label">
          tracking_settings
        </label>
        <div className="wrapper">
          <div className="fixed">
          </div>
          <div className="flex">
            <TrackingSettingsItem
              data={this.state.tracking_settings}
              parent="click_tracking" />

            <TrackingSettingsItem
              data={this.state.tracking_settings}
              parent="open_tracking" />

            <TrackingSettingsItem
              data={this.state.tracking_settings}
              parent="subscription_tracking" />

            <TrackingSettingsItem
              data={this.state.tracking_settings}
              parent="ganalytics" />
          </div>
        </div>
      </div>
    );
  }
});
module.exports = TrackingSettingsForm;
