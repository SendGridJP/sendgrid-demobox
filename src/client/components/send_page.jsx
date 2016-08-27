var SendForm = require('./send_form.jsx');

var SendPage = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3">
            <SendForm />
          </div>

          <div className="col-md-9">

            <div className="btn-toolbar">
              <div className="btn-group" data-toggle="buttons-radio">
                <button className="btn btn-default" id="show-table">Table</button>
                <button className="btn btn-default active" id="show-json">JSON</button>
              </div>
            </div>

            <table className="table table-striped table-bordered table-condensed" id="event-table">
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
              </tbody>
            </table>

            <table className="table table-striped table-bordered table-condensed" id="event-json">
              <thead>
                <tr><th><small>JSON</small></th></tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
});
module.exports = SendPage;
