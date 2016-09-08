var ShowButton = React.createClass({
  propTypes: {
    buttonId: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    active: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  handleSelect: function() {
    this.props.onClick(this.props.buttonId);
  },
  getActive: function(buttonId, active) {
    if (buttonId === active) return 'btn btn-default active';
    else return 'btn btn-default';
  },
  render: function() {
    return(
      <button
        className={this.getActive(this.props.buttonId, this.props.active)}
        id={this.props.buttonId}
        onClick={this.handleSelect}>{this.props.text}</button>
    );
  }
});
module.exports = ShowButton;
