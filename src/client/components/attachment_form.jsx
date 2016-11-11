var AttachmentItem = require('./attachment_item.jsx');

var AttachmentForm = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    handleAdd: React.PropTypes.func.isRequired,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired,
  },

  render: function() {
    return (
      <div>
        <label className="control-label">attachments</label>
        <FlipMove enterAnimation="accordianVertical" leaveAnimation="accordianVertical">
          {this.props.data.map(function(data, index) {
            return(
              <AttachmentItem
                index={index}
                data={data}
                handleDel={this.props.handleDel}
                handleUpd={this.props.handleUpd} />
            );
          }.bind(this))}
        </FlipMove>
        <a href="javascript:void(0)" onClick={this.props.handleAdd}>
          <span className="glyphicon glyphicon-plus"></span>
        </a>
      </div>
    );
  }
});
module.exports = AttachmentForm;
