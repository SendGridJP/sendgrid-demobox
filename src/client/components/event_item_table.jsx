var EventItemTable = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <tr>
        <td><small>{this.props.event.timestamp}</small></td>
        <td><small>{this.props.event.event}</small></td>
        <td><small>{this.props.event.email}</small></td>
        <td><small>{this.props.event["smtp-id"]}</small></td>
        <td><small>{this.props.event.response}</small></td>
        <td><small>{this.props.event.sg_event_id}</small></td>
        <td><small>{this.props.event.sg_message_id}</small></td>
        <td><small>{this.props.event.useragent}</small></td>
        <td><small>{this.props.event.ip}</small></td>
        <td><small>{this.props.event.attempt}</small></td>
        <td><small>{this.props.event.category}</small></td>
        <td><small>{this.props.event.url}</small></td>
        <td><small>{this.props.event.status}</small></td>
        <td><small>{this.props.event.reason}</small></td>
        <td><small>{this.props.event.type}</small></td>
        <td><small>{this.props.event.send_at}</small></td>
      </tr>
    );
  }
});
module.exports = EventItemTable;
