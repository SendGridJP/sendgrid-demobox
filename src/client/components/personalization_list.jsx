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
      <div className="form-group">
        <div className="col-md-12">
          <label className="control-label">
            <span className="text-danger">*</span>Personalizations
          </label>

          {this.state.personalizations.map(function(personalization, index) {
            return (
              <PersonalizationItem index={index} />
            );
          })};

          <div className="col-md-12">
            <a href="javascript:void(0)" onClick={this.handleAddPersonalization}
              className="pull-right">
              <span className="glyphicon glyphicon-plus"></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = PersonalizationList;
