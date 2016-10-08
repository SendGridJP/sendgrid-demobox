var EventItemTable = React.createClass({
  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <tr>
        <td><div><small>{this.props.event.timestamp}</small></div></td>
        <td><div><small>{this.props.event.event}</small></div></td>
        <td><div><small>{this.props.event.email}</small></div></td>
        <td><div><small>{this.props.event["smtp-id"]}</small></div></td>
        <td><div><small>{this.props.event.response}</small></div></td>
        <td><div><small>{this.props.event.sg_event_id}</small></div></td>
        <td><div><small>{this.props.event.sg_message_id}</small></div></td>
        <td><div><small>{this.props.event.useragent}</small></div></td>
        <td><div><small>{this.props.event.ip}</small></div></td>
        <td><div><small>{this.props.event.attempt}</small></div></td>
        <td><div><small>{this.props.event.category}</small></div></td>
        <td><div><small>{this.props.event.url}</small></div></td>
        <td><div><small>{this.props.event.status}</small></div></td>
        <td><div><small>{this.props.event.reason}</small></div></td>
        <td><div><small>{this.props.event.type}</small></div></td>
        <td><div><small>{this.props.event.send_at}</small></div></td>
      </tr>
    );
  }
});
module.exports = EventItemTable;
