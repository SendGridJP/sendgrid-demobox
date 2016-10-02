var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FooterForm = React.createClass({
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
    this.getFlux().actions.updFooterEnable(e.target.value == 'true');
  },

  handleUpdText: function(e) {
    e.preventDefault();
    this.getFlux().actions.updFooterText(e.target.value);
  },

  handleUpdHtml: function(e) {
    e.preventDefault();
    this.getFlux().actions.updFooterHtml(e.target.value);
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
            name="text"
            className="form-control"
            placeholder="text"
            defaultValue={this.props.data.text}
            onChange={this.handleUpdText} />
          <input type="text"
            name="html"
            className="form-control"
            placeholder="html"
            defaultValue={this.props.data.html}
            onChange={this.handleUpdHtml} />
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
        <label className="control-label">footer</label>
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
module.exports = FooterForm;
