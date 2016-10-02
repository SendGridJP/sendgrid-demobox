var KeyValueItem = require('./key_value_item.jsx');

var EmailForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    data: React.PropTypes.array.isRequired,
    handleAdd: React.PropTypes.func,
    handleDel: React.PropTypes.func,
    handleUpd: React.PropTypes.func,
    max: React.PropTypes.number
  },

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    }
    var add;
    var items;
    if (Array.isArray(this.props.data)) {
      items = this.props.data.map(function(data, index) {
        return (
          <KeyValueItem
            index={index}
            valueKey={data.email}
            valueValue={data.name}
            nameKey="email"
            nameValue="name"
            placeholderKey="Email"
            placeholderValue="Name"
            handleDel={this.props.handleDel}
            handleUpd={this.props.handleUpd} />
        );
      }.bind(this));
      add = (
        <a href="javascript:void(0)" onClick={this.props.handleAdd}>
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      )
    } else {
      if (this.props.data != null) {
        items = <KeyValueItem
          valueKey={this.props.data.email}
          valueValue={this.props.data.name}
          nameKey="email"
          nameValue="name"
          placeholderKey="Email"
          placeholderValue="Name"
          handleDel={this.props.handleDel}
          handleUpd={this.props.handleUpd} />
      }
      if (this.props.data == null && this.props.max == 1) {
        add = (
          <a href="javascript:void(0)" onClick={this.props.handleAdd}>
            <span className="glyphicon glyphicon-plus"></span>
          </a>
        )
      }
    }
    return (
      <div>
        <label className="control-label">{rq}{this.props.title}</label>
        <div>
          {items}
        </div>
        {add}
      </div>
    );
  }
});
module.exports = EmailForm;
