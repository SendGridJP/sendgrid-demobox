var SimpleTextItem = require('./simple_text_item.jsx');

var SimpleTextForm = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    required: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    handleAdd: React.PropTypes.func.isRequired,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired,
    max: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      disabled: true
    };
  },

  handleDel: function(e) {
    e.preventDefault();
    this.props.handleDel();
  },

  handleUpd: function(e) {
    e.preventDefault();
    this.props.handleUpd(this.props.index, e.target.value);
  },

  render: function() {
    var del;
    if (typeof(this.props.handleDel) == "function") {
      del = (
        <a href="javascript:void(0)" onClick={this.handleDel}
          className="removeIcon">
          <span className="glyphicon glyphicon-remove"></span>
        </a>
      );
    }

    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    }
    var add;
    var items;
    if (Array.isArray(this.props.value)) {
      items = this.props.value.map(function(data, index) {
        return (
          <SimpleTextItem
            index={index}
            value={data}
            placeholder={this.props.placeholder}
            handleDel={this.props.handleDel}
            handleUpd={this.props.handleUpd} />
        )
      }.bind(this));
      add = (
        <a href="javascript:void(0)" onClick={this.props.handleAdd}
          className="pull-right">
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      )
    } else {
      if (this.props.value != null) {
        items = <SimpleTextItem
          value={this.props.value}
          placeholder="Value"
          handleDel={this.props.handleDel}
          handleUpd={this.props.handleUpd} />
      }
      if (this.props.value == null && this.props.max == 1) {
        add = (
          <a href="javascript:void(0)" onClick={this.props.handleAdd}
            className="pull-right">
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
module.exports = SimpleTextForm;
