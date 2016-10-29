var React = require('react');
var Clock = require('Clock');

var Countdown = React.createClass({
  render: function() {
    return <Clock totalSeconds={123}/>;
  }
});

module.exports = Countdown;
