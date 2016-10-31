var React = require('react');
var Clock = require('Clock');

var Timer = React.createClass({
  getInitialState: function() {
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  componentDidUpdate: function(prevProps, prevState) {
    if(this.state.countdownStatus !== prevState.countdownStatus){
      switch(this.state.countdownStatus) {
        case 'started':
        this.startTimer();
        break;
        case 'stopped':
        this.setState({count : 0});
        case 'paused':
        clearInterval(this.timer)
        this.timer = undefined;
        break;
      }
    }
  },
  componentWillUnmount: function() {
    clearInterval(this.timer)
    this.timer = undefined;
  },
  onStatusChange: function(newStatus){
    return () =>{
      this.setState({
        countdownStatus: newStatus
      })
    }
  },
  startTimer: function() {
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount
      });
    }, 1000);
  },
  render: function() {
    var {count, countdownStatus} = this.state;

    var controls = () => {
      if(countdownStatus === 'stopped'){
        return <button className='button primary' onClick={this.onStatusChange('started')}>Start</button>
      }else if(countdownStatus === 'started'){
        return <button className='button primary' onClick={this.onStatusChange('paused')}>Pause</button>
      }else{
        return <button className='button primary' onClick={this.onStatusChange('started')}>Resume</button>
      }
    };

    return (
      <div>
        <h1 className='page-title'>Timer app</h1>
        <Clock totalSeconds={count}/>
        <div className='controls'>
          {controls()}
          <button className="button alert hollow" onClick={this.onStatusChange('stopped')}> Cancel </button>
        </div>
      </div>
    )
  }
});

module.exports = Timer;
