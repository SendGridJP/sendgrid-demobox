var EventItemJson = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <tr>
        <td><small>{JSON.stringify(this.props.event)}</small></td>
      </tr>
    );
  }
});
module.exports = EventItemJson;
