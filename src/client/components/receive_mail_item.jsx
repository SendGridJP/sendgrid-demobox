var ReceiveMailItem = React.createClass({
  propTypes: {
    mail: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <tr>
        <td><small>{this.props.mail.to}</small></td>
        <td><small>{this.props.mail.from}</small></td>
        <td><small>{this.props.mail.subject}</small></td>
        <td><small>{this.props.mail.text}</small></td>
        <td><small>{this.props.mail.html}</small></td>
        <td><small>{this.props.mail.charsets}</small></td>
        <td><small>{this.props.mail.attachments}</small></td>
        <td><small>{this.props.mail.envelope}</small></td>
        <td><small>{this.props.mail.sender_ip}</small></td>
        <td><small>{this.props.mail.dkim}</small></td>
        <td><small>{this.props.mail.SPF}</small></td>
        <td><small>{this.props.mail.headers}</small></td>
      </tr>
    );
  }
});
module.exports = ReceiveMailItem;
