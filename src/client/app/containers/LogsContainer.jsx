import Logs from '../components/Logs.jsx';
import { connect } from 'redux';

var mapStateToProps = (state, ownProps) => {
  return {
    commands: state.userCommand[ownProps.level]
  }
}

export default connect(mapStateToProps)(Logs);