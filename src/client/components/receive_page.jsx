var ReceiveMailItem = require('./receive_mail_item.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ReceivePage = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  componentDidMount: function() {
    this.getFlux().actions.getReceiveInit();
  },

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      receiveAddress: store.receiveAddress,
      receiveMails: store.receiveMails,
    };
  },

  getMailTo: function(receiveAddress) {
    return "mailto:" + receiveAddress + "?subject=メール受信テスト&amp;body=メール受信テストの本文"
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="row">
            <div className="alert alert-warning">
              Mailto: <a href={this.getMailTo(this.state.receiveAddress)}>{this.state.receiveAddress}</a>
            </div>
          </div>
          <table id="receive-table"
            className="table table-striped table-bordered table-condensed">
            <thead>
              <tr>
                <th><small>to</small></th>
                <th><small>from</small></th>
                <th><small>subject</small></th>
                <th><small>text</small></th>
                <th><small>html</small></th>
                <th><small>charsets</small></th>
                <th><small>attachments</small></th>
                <th><small>envelope</small></th>
                <th><small>sender_ip</small></th>
                <th><small>dkim</small></th>
                <th><small>SPF</small></th>
                <th><small>headers</small></th>
              </tr>
            </thead>
            <FlipMove
              enterAnimation="accordianVertical" leaveAnimation="accordianVertical"
              typeName="tbody">
              {this.state.receiveMails.map(function(mail) {
                var key = mail.id;
                return (
                  <ReceiveMailItem key={key} mail={mail} />
                );
              }, this)}
            </FlipMove>
          </table>
        </div>
      </div>
    );
  }
});
module.exports = ReceivePage;
