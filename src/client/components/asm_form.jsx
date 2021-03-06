var SimpleTextItem = require('./simple_text_item.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var AsmForm = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  propTypes: {
    data: React.PropTypes.array.isRequired,
    handleAdd: React.PropTypes.func.isRequired,
    handleDel: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      key: _.uniqueId('asm')
    }
  },

  getStateFromFlux: function() {
    return {};
  },

  handleUpdGroupId: function(e) {
    e.preventDefault();
    this.getFlux().actions.updGroupId(e.target.value);
  },

  handleAddGroupsToDisplay: function() {
    this.getFlux().actions.addGroupsToDisplay();
  },
  handleDelGroupsToDisplay: function(index) {
    this.getFlux().actions.delGroupsToDisplay(index);
  },
  handleUpdGroupsToDisplay: function(index, value) {
    this.getFlux().actions.updGroupsToDisplay(index, value);
  },

  render: function() {
    var add;
    var form;
    var items;
    if (this.props.data === null) {
      add = (
        <a href="javascript:void(0)" onClick={this.props.handleAdd}>
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      );
    } else {
      items = this.props.data.groups_to_display.map(function(data, index) {
        return (
          <SimpleTextItem
            index={index}
            value={data}
            placeholder="groups_to_display"
            handleDel={this.handleDelGroupsToDisplay}
            handleUpd={this.handleUpdGroupsToDisplay} />
        )
      }.bind(this));
      form = (
        <div className="wrapper">
          <div className="fixed">
            <a href="javascript:void(0)" onClick={this.props.handleDel}
              className="removeIcon">
              <span className="glyphicon glyphicon-remove"></span>
            </a>
          </div>
          <div className="flex">
            <div className="wrapper">
              <input type="text"
                name="group_id"
                className="form-control"
                placeholder="group_id"
                defaultValue={this.props.data.group_id}
                onChange={this.handleUpdGroupId} />
            </div>
            <FlipMove enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
              {items}
            </FlipMove>
            <a href="javascript:void(0)" onClick={this.handleAddGroupsToDisplay}>
              <span className="glyphicon glyphicon-plus"></span>
            </a>
          </div>
        </div>
      );
    }
    return (
      <div>
        <label className="control-label">asm</label>
        <FlipMove enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
          {form}
        </FlipMove>
        {add}
      </div>
    );
  }
});
module.exports = AsmForm;
