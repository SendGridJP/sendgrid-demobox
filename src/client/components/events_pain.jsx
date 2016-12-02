var ShowButton = require('./show_button.jsx');
var EventItemTable = require('./event_item_table.jsx');
var EventItemJson = require('./event_item_json.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var EventsPain = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],

  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    return {
      showEvent: store.showEvent,
      events: store.events
    }
  },

  getTable: function(showEvent, events) {
    var table = '';
    if (showEvent == "table") {
      table = (
        <table className="table table-striped table-bordered table-condensed">
          <thead>
            <tr>
              <th><small>timestamp</small></th>
              <th><small>event</small></th>
              <th><small>email</small></th>
              <th><small>smtp-id</small></th>
              <th><small>response</small></th>
              <th><small>sg_event_id</small></th>
              <th><small>sg_message_id</small></th>
              <th><small>useragent</small></th>
              <th><small>ip</small></th>
              <th><small>attempt</small></th>
              <th><small>category</small></th>
              <th><small>url</small></th>
              <th><small>status</small></th>
              <th><small>reason</small></th>
              <th><small>type</small></th>
              <th><small>send_at</small></th>
            </tr>
          </thead>
          <FlipMove
            enterAnimation="accordianVertical" leaveAnimation="accordianVertical"
            typeName="tbody">
            {events.map(function(event) {
              var key = event["sg_event_id"];
              return (
                <EventItemTable key={key} event={event} />
              );
            }, this)}
          </FlipMove>
        </table>
      );
    }
    if (showEvent == "json") {
      table = (
        <table className="table table-striped table-bordered table-condensed">
          <thead>
            <tr><th><small>JSON</small></th></tr>
          </thead>
          <FlipMove
            enterAnimation="accordianVertical" leaveAnimation="accordianVertical"
            typeName="tbody">
            {events.map(function(event, index) {
              var key = event["sg_event_id"];
              return (
                <EventItemJson key={key} event={event} />
              );
            }, this)}
          </FlipMove>
        </table>
      );
    }
    return table;
  },

  render: function() {
    return (
      <div>
        <div className="btn-toolbar">
          <div className="btn-group" data-toggle="buttons-radio">
            <ShowButton buttonId="table" text="Table" />
            <ShowButton buttonId="json" text="JSON" />
          </div>
        </div>
        {this.getTable(this.state.showEvent, this.state.events)}
      </div>
    );
  }
});

module.exports = EventsPain;
