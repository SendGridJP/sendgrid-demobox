var PersonalizationItem = require('./personalization_item.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PersonalizationList = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      personalizations: store.mailData.personalizations
    }
  },

  handleAddPersonalization: function() {
    this.getFlux().actions.addPersonalization();
  },

  render: function() {
    return (
      <div>
        <label className="control-label">
          <span className="text-danger">*</span>Personalizations
        </label>

        {this.state.personalizations.map(function(personalization, index) {
          return (
            <PersonalizationItem index={index} />
          );
        })}

        <div>
          <a href="javascript:void(0)" onClick={this.handleAddPersonalization}>
            <span className="glyphicon glyphicon-plus"></span>
          </a>
        </div>
      </div>
    );
  }
});
module.exports = PersonalizationList;
