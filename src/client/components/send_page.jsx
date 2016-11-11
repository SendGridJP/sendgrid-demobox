var SendForm = require('./send_form.jsx');
var EventsPain = require('./events_pain.jsx');

var SendPage = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SendForm />
          </div>
          <div className="col-md-9">
            <EventsPain />
          </div>
        </div>
      </div>
    );
  }
});
module.exports = SendPage;
