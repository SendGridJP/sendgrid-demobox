var ContentItem = require('./content_item.jsx');

var ContentForm = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    handleAdd: React.PropTypes.func,
    handleDel: React.PropTypes.func,
    handleUpd: React.PropTypes.func,
  },

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    var add;
    if (this.props.data.length < 2) {
      add = (
        <a href="javascript:void(0)" onClick={this.props.handleAdd}>
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      );
    }

    return (
      <div>
        <label className="control-label">
          <span className="text-danger">*</span>content
        </label>
        <div>
          {this.props.data.map(function(data, index) {
            return(
              <ContentItem
                index={index}
                data={data}
                handleDel={this.props.handleDel}
                handleUpd={this.props.handleUpd} />
            );
          }.bind(this))}
        </div>
        {add}
      </div>
    );
  }
});
module.exports = ContentForm;
