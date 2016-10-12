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

  handleDel: function(e) {
    e.preventDefault();
    this.props.handleDel();
  },

  handleUpd: function(e) {
    e.preventDefault();
    this.props.handleUpd(this.props.index, e.target.value);
  },

  getRq: function() {
    var rq = '';
    if (this.props.required) {
      rq = <span className="text-danger">*</span>;
    }
    return rq;
  },

  getAdd: function() {
    return (
      <a href="javascript:void(0)" onClick={this.props.handleAdd}>
        <span className="glyphicon glyphicon-plus"></span>
      </a>
    );
  },

  render: function() {
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
      add = this.getAdd();
    } else {
      if (this.props.value != null) {
        items = <SimpleTextItem
          index={0}
          value={this.props.value}
          placeholder="Value"
          handleDel={this.props.handleDel}
          handleUpd={this.props.handleUpd} />
      }
      if (this.props.value == null && this.props.max == 1) {
        add = this.getAdd();
      }
    }
    return (
      <div>
        <label className="control-label">{this.getRq}{this.props.title}</label>
        <FlipMove enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
          {items}
        </FlipMove>
        {add}
      </div>
    );
  }
});
module.exports = SimpleTextForm;
