var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var BccForm = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  propTypes: {
    data: React.PropTypes.array.isRequired,
    handleAdd: React.PropTypes.func.isRequired,
    handleDel: React.PropTypes.func.isRequired,
  },

  getStateFromFlux: function() {
    return {
    }
  },

  handleUpdEnable: function(e) {
    e.preventDefault();
    this.getFlux().actions.updBccEnable(e.target.value == 'true');
  },

  handleUpdEmail: function(e) {
    e.preventDefault();
    this.getFlux().actions.updBccEmail(e.target.value);
  },

  render: function() {
    var add;
    var del;
    if (this.props.data === null) {
      add = (
        <a href="javascript:void(0)" onClick={this.props.handleAdd}>
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      );
    } else {
      var form = (
        <div className="flex">
          <select className="form-control"
            value={this.props.data.enable}
            onChange={this.handleUpdEnable}>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
          <input type="text"
            name="email"
            className="form-control"
            placeholder="email"
            defaultValue={this.props.data.email}
            onChange={this.handleUpdEmail} />
        </div>
      );
      del = (
        <a href="javascript:void(0)" onClick={this.props.handleDel}
          className="removeIcon">
          <span className="glyphicon glyphicon-remove"></span>
        </a>
      );
    }
    return (
      <div>
        <label className="control-label">bcc</label>
        <div className="wrapper">
          <div className="fixed">
            {del}
          </div>
          {form}
        </div>
        {add}
      </div>
    );
  }
});
module.exports = BccForm;
