var ShowButton = require('./show_button.jsx');
var EventItemTable = require('./event_item_table.jsx');
var EventItemJson = require('./event_item_json.jsx');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;



var EventsPain = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DemoboxStore")],


  getStateFromFlux: function() {
    var store = this.getFlux().store("DemoboxStore");
    console.log("EventsPain.getStateFromFlux() store.showEvent: " + store.showEvent);
    console.log("EventsPain.getStateFromFlux() store.events: " + JSON.stringify(store.events));
    return {
      showEvent: store.showEvent,
      events: store.events
    }
  },

  // handleAddEvent: function(value) {
  //   console.log("EventsPain#handleAddEvent");
  //   this.getFlux().actions.addEvent(value);
  // },
  //
  // handleToggleShowEvent: function(value) {
  //   console.log("EventsPain#handleToggleShowEvent");
  //   this.getFlux().actions.toggleShowEvent(value);
  // },

  getTable: function(showEvent, events) {
    var table = '';
    console.log('getTable(): ' + JSON.stringify(events));
    if (showEvent == "table") {
      table = <ReactCSSTransitionGroup
        transitionName="example" transitionAppear={true}
        transitionAppearTimeout={500} transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <table className="table table-striped table-bordered table-condensed" id="event-table" key="event-table">
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
          <tbody>
            {events.map(function(event) {
              return (
                <EventItemTable event={event} />
              );
            }, this)}
          </tbody>
        </table>
      </ReactCSSTransitionGroup>;
    }

    if (showEvent == "json") {
      table = <ReactCSSTransitionGroup
        transitionName="example" transitionAppear={true}
        transitionAppearTimeout={500} transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        <table className="table table-striped table-bordered table-condensed" id="event-json" key="event-json">
          <thead>
            <tr><th><small>JSON</small></th></tr>
          </thead>
          <tbody>
            {events.map(function(event) {
              return (
                <EventItemJson event={event} />
              );
            }, this)}
          </tbody>
        </table>
      </ReactCSSTransitionGroup>;
    }
    return table;
  },

  handleShowButton: function(buttonId) {
    console.log("handleShowButton: " + buttonId);
    this.getFlux().actions.toggleShowEvent(buttonId);
  },

  render: function() {

    return (
      <div>
        <div className="btn-toolbar">
          <div className="btn-group" data-toggle="buttons-radio">
            <ShowButton
              buttonId="table"
              text="Table"
              active={this.state.showEvent}
              onClick={this.handleShowButton} />
            <ShowButton
              buttonId="json"
              text="JSON"
              active={this.state.showEvent}
              onClick={this.handleShowButton} />
          </div>
        </div>
        {this.getTable(this.state.showEvent, this.state.events)}
      </div>
    );
  }
});

////
// var stores = {
//   DemoboxStore: new DemoboxStore()
// };
// var actions = DemoboxActions;
// var flux = new Fluxxor.Flux(stores, actions);

// var io = new RocketIO().connect(); // WebSocketとCometの適当な方が使われる
// io.on("event", function(value){
//   console.log("EventsPain event: " + value);
//   EventsPain.handleAddEvent(value);
//   // var event = JSON.parse(value);
//   // $("#event-table").prepend(getRow(event));
//   // $("#event-table td div").slideDown(500);
//   // $("#event-json").prepend("<tr><td><small><div style='display:none'>"+value+"</div></small></td></tr>");
//   // $("#event-json td div").slideDown(500);
// });
//
// io.on("toggle", function(value){
//   console.log("EventsPain toggle: " + value);
//   EventsPain.handleToggleShowEvent(value);
// });
////

module.exports = EventsPain;
