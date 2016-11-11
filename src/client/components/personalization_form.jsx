var PersonalizationItem = require('./personalization_item.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var PersonalizationForm = React.createClass({
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
          <span className="text-danger">*</span>personalizations
        </label>

        <FlipMove enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
          {this.state.personalizations.map(function(personalization, index) {
            return (
              <PersonalizationItem index={index} />
            );
          })}
        </FlipMove>

        <div>
          <a href="javascript:void(0)" onClick={this.handleAddPersonalization}>
            <span className="glyphicon glyphicon-plus"></span>
          </a>
        </div>
      </div>
    );
  }
});
module.exports = PersonalizationForm;
