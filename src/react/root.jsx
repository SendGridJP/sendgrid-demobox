var Header = require('./header.jsx');
var Article = require('./article.jsx');

var Root = React.createClass({
  _onSelectPage: function(pageId) {
    this.setState({activePage: pageId});
  },
  getInitialState: function() {
    return {activePage: 'send'};
  },
  render: function() {
    return (
      <div className="Root">
        <Header
          activePage={this.state.activePage}
          onSelectPage={this._onSelectPage} />
        <Article activePage={this.state.activePage} />
      </div>
    );
  }
});

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
