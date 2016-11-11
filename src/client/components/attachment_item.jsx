var AttachmentItem = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    index: React.PropTypes.number.isRequired,
    handleDel: React.PropTypes.func.isRequired,
    handleUpd: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      key: _.uniqueId('attachment_item')
    }
  },

  handleDel: function() {
    this.props.handleDel(this.props.index);
  },

  handleUpd: function(e) {
    e.preventDefault();
    this.props.handleUpd(this.props.index, e.target.name, e.target.value);
  },

  render: function() {
    var className="wrapper " + ((this.props.index % 2 == 0) ? "even" : "odd");
    return (
      <div className={className} key={this.props.key}>
        <div className="fixed">
          <a href="javascript:void(0)" onClick={this.handleDel}
            className="removeIcon">
            <span className="glyphicon glyphicon-remove"></span>
          </a>
        </div>
        <div className="flex">
          <input
            type="text"
            name="content"
            className="form-control"
            placeholder="Base64 encoded content"
            defaultValue={this.props.data.content}
            onChange={this.handleUpd} />
          <input
            type="text"
            name="type"
            className="form-control"
            placeholder="The mime type"
            defaultValue={this.props.data.type}
            onChange={this.handleUpd} />
          <input
            type="text"
            name="filename"
            className="form-control"
            placeholder="Filename"
            defaultValue={this.props.data.filename}
            onChange={this.handleUpd} />
          <input
            type="text"
            name="disposition"
            className="form-control"
            placeholder="Disposition"
            defaultValue={this.props.data.disposition}
            onChange={this.handleUpd} />
          <input
            type="text"
            name="content_id"
            className="form-control"
            placeholder="Content ID"
            defaultValue={this.props.data['content_id']}
            onChange={this.handleUpd} />
        </div>
      </div>
    );
  }
});
module.exports = AttachmentItem;
